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


// const db = new Client({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'coffee_shop',
//   password: 'admin',
//   port: 5432,
// })

// console.log(process.env.DB_USER);
// console.log(process.env.DB_HOST);
// console.log(process.env.DB_DATABASE);
// console.log(process.env.DB_PASSWORD);
// console.log(process.env.DB_PORT); 

