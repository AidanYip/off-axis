const db = require('../config/db');

const register = async (first_name, last_name, provider, email, password, role) => {
    const query = `
        INSERT INTO User
        (first_name, last_name, provider, email, password, role)
        VALUES 
        (?, ?, ?, ?, ?, ?)
    ;`;

    const [result] = await db.query(query, [first_name, last_name, provider, email, password, role]);
    if (result.affectedRows === 0) throw new Error('Database failed to register user');

    const user_id = result.insertId;
    return { user_id, first_name, last_name, role, provider, email };
}

const checkEmail = async (email) => {
    const query = `
        SELECT *
        FROM User
        WHERE email = ?
    ;`;

    const [rows] = await db.query(query, [email]);
    return rows.length > 0;
}

const updateToken = async (user_id, jwt_token) => {
    const query = `
        UPDATE User
        SET jwt_token = ?
        WHERE user_id = ?
    ;`;

    const [result] = await db.query(query, [jwt_token, user_id]);
    if (result.affectedRows === 0) throw new Error('Database failed to update token');

    return true;
}

const login = async (email) => {
    const query = `
        SELECT
            password,
            jwt_token
        FROM User
        WHERE email = ?
    ;`;

    const [result] = await db.query(query, [email]);
    if (result.length === 0) throw new Error('Email does not exist');
    return result[0];
}

const getUserById = async (user_id) => {
    const query = `
        SELECT
            user_id,
            first_name,
            last_name,
            role,
            provider,
            email
        FROM User
        WHERE user_id = ?
    ;`;

    const [result] = await db.query(query, [user_id]);
    if (result.length === 0) return null;
    return result[0];
}

module.exports = {
    register,
    checkEmail,
    updateToken,
    login,
    getUserById
};
