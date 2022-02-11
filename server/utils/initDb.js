require("dotenv").config();
const mysql = require("mysql");
// const db = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);

const db = mysql.createConnection({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  port: "/tmp/mysql.sock",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DTBS,
});

module.exports = db;
