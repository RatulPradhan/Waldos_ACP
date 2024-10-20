import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config();

const db = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  }).promise();

export async function getUsers() {
  const [rows] = await db.query("SELECT * FROM user;");
  return rows;
}

export async function getUserByID(id){
  const [rows] = await db.query(`SELECT * FROM user WHERE user_id = ?`, [id])
  return rows
}

export async function getUser(username){
  const [rows] = await db.query(`SELECT * FROM user WHERE username = ?`, [username]);
  return rows;
}

export async function getUserByEmail(email) {
  const [rows] = await db.query(`SELECT * FROM user WHERE email = ?`, [email]);
  return rows;
}

export async function createUser(username, email, password, type) {
  const result = await db.query(
    `
    
    INSERT INTO user (username, email, password, user_type)
    VALUES (?, ?, ?, ?)
    `,
    [username, email, password, type]
  );
  const id = result.user_id;
  return getUser(id);
}
