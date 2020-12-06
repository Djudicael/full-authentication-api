import pool from '../config/db.js'

export const createCustomer = async (customer) => {

    const { username,
        email,
        firstname,
        lastname,
        password,
        registeredDate
    } = customer;

    const { rows }=  await pool.query('INSERT INTO customers (username, email, firstname, lastname, password, created_on) VALUES ($1, $2, $3, $4, $5, $6) RETURNING user_id',
        [username, email, firstname, lastname, password, registeredDate]);
        return rows[0];

}

export const getCustomers = async () => {
    return await pool.query('SELECT * FROM customers ORDER BY user_id ASC');
}

export const getCusrtomerByEmail = async (email) => {
    const { rows } = await pool.query('SELECT * FROM customers WHERE email = $1', [email]);
    return rows[0];
}

export const getCusrtomerById = async (id) => {

    const { rows } = await pool.query('SELECT * FROM customers WHERE user_id = $1', [id]);
    return rows[0];
}


export const updateCustomer = async (id, customer) => {
    const { name, email } = customer;
    await pool.query('UPDATE customers SET name = $1, email = $2 WHERE user_id = $3', [name, email, id]);
}

export const deleteCustomer = async (id) => {
    await pool.query('DELETE FROM customers WHERE user_id = $1', [id]);
}