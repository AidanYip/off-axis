const db = require('../config/db');

const getAllUsers = async () => {
  const query = ` 
    SELECT *
    FROM User
  `;
        
  const [rows] = await db.query(query);
  return rows;
};

const getUserByEmail = async (email) => {
  const query = `
    SELECT *
    FROM User
    WHERE email = ?
  `;

  const [rows] = await db.query(query, [email]);
  return rows;
};

const createUser = async (email, password, ticket_list) => {
  const query = `
    INSERT INTO User
      (email, password, ticket_list)
    VALUES 
      (?, ?, ?);
  `;

  const [rows] = await db.query(query, [email, password, ticket_list]);
  return rows;
};

const updateUser = async (email, password, ticket_list) => {
  const query = `
    UPDATE User
    SET
      password = ?, 
      ticket_list = ?
    WHERE email = ?
  ;`;

  const [rows] = await db.query(query, [password, ticket_list, email]);
  return rows;
};

const deleteUser = async (email) => {
  const query = `
    DELETE FROM User
    WHERE email = ?;
  `;

  const [result] = await db.query(query, [email]);
  return result;
};


module.exports = {
  getAllUsers,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser
}
