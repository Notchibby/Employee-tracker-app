require('dotenv').config();
const sqlconnect = require('./config/connection');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const queries = require('./utils/utils')


const db = mysql.createConnection(
    sqlconnect, 
    console.log(`Connected to the library_db database.`)
    );

// db.query( queries.viewAllEmployee(), (err, result) =>
// err ? console.error(err) : console.table(result)
// );

db.query( queries.viewAllEmployee(), (err, result) =>
err ? console.error(err) : console.table(result)
);
  
  
