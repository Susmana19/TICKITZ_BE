
const { Client } = require('pg')
require("dotenv").config();


const db = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})



db.connect((err) => {
    if (err) {
    console.error('db connection error', err.stack)
    }
})

module.exports = db;


