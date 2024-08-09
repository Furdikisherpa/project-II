// config/dbConnection.js
const mysql = require('mysql');
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

const conn = mysql.createConnection({
  host: DB_HOST,
  user: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME
});

conn.connect((err) => {
  if (err) {
    console.error('Database connection error:', err);
    throw err;
  }
  console.log(DB_NAME + " Database Connected");
});

module.exports = conn;
