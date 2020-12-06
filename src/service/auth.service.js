import createError from 'http-errors'
import { createCustomer, getCusrtomerByEmail, getCusrtomerById } from '../repository/customer.repository.js';
import Customer from '../domain/Customer.js';
import { encryptPassword, isValidPassword } from '../helper/password.util.js';

import { signAccessToken, signRefreshToken, verifRefreshToken } from '../helper/jwt.helper.js';
import client from '../helper/init_redis.js';


export const register = async (customerView) => {

    const { username,
        email,
        firstname,
        lastname,
        password
    } = customerView;

    const customer = new Customer({ username, email, firstname, lastname, password: await encryptPassword(password), registeredDate: new Date() });
    const doesExist = await getCusrtomerByEmail(customer.email);

    if (doesExist) {
        throw createError.Conflict();
    }

    const userSaved = await createCustomer(customer);

    const accessToken = await signAccessToken(userSaved.user_id);

    const refreshToken = await signRefreshToken(userSaved.user_id);

    return { accessToken, refreshToken };
};

export const login = async ({ email, password }) => {

    const user = await getCusrtomerByEmail(email);
    if (!user) {
        throw createError.NotFound("User not register");
    }

    const isMatch = await isValidPassword(password, user.password);

    if (!isMatch) {
        throw createError.Unauthorized("Username/Password not valid");
    }
    const accessToken = await signAccessToken(user.user_id);
    const refreshToken = await signRefreshToken(user.user_id);
    return { accessToken, refreshToken };
};


export const logout = async (refreshToken) => {
    const userId = await verifRefreshToken(refreshToken);
    client.DEL(userId, (err, value) => {

        if (err) {
            console.error(err.message);
            throw createError.InternalServerError
        }

        console.log(value)
    });
};


export const refreshToken = async (refreshToken) => {

    const userId = await verifRefreshToken(refreshToken);

    //TODO will need to check if account is actif
    const user = await getCusrtomerById(userId);

    if (!user) {
        throw createError.Unauthorized();
    }
    const accessToken = await signAccessToken(userId);
    const newRefreshToken = await signRefreshToken(userId);
    return { accessToken, newRefreshToken };
};