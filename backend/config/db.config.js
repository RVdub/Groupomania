const mysql = require('mysql2');
const dotenv = require("dotenv").config();
if (dotenv.error) { throw dotenv.error };

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DB
});

connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to MySQL");
});

module.exports = connection;

