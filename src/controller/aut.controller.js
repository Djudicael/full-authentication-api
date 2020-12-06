import createError from 'http-errors'
import * as authService from '../service/auth.service.js';

import { registerSchema, authSchema } from '../helper/validation.schema.js';

export const register = async (req, res, next) => {
    try {
        const { username,
            email,
            firstname,
            lastname,
            password
        } = req.body;

        const result = await registerSchema.validateAsync(req.body);

        const registredCustomer = await authService.register(result);

        res.send(registredCustomer);

    } catch (err) {
        if (err.isJoi === true) {
            err.status = 422;
        }
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        const result = await authSchema.validateAsync(req.body);

        const loginResult = await authService.login(result);
        res.send(loginResult);

    } catch (err) {
        if (err.isJoi === true) {
            //err.status = 422;
            return next(createError.BadRequest("Invalid Username/Password"));
        }
        next(err);
    }
};


export const logout = async (req, res, next) => {

    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            throw createError.BadRequest();
        }
        await authService.logout(refreshToken);
        res.sendStatus(204);

    } catch (err) {
        if (err.isJoi === true) {
            //err.status = 422;
            return next(createError.BadRequest("Invalid Username/Password"));
        }
        next(err);
    }
};


export const refreshToken = async (req, res, next) => {

    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            throw createError.BadRequest();
        }
        const response = await authService.refreshToken(refreshToken);
        res.send(response);

    } catch (err) {
        if (err.isJoi === true) {
            //err.status = 422;
            return next(createError.BadRequest("Invalid Username/Password"));
        }
        next(err);
    }
};