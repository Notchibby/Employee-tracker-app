require('dotenv').config();
const sqlconnect = require('./config/connection');
const inquirer = require('inquirer');
const mysql = require('mysql2');


const db = mysql.createConnection(
    sqlconnect, 
    console.log(`Connected to the library_db database.`)
    );

db.query('SELECT * FROM department', (err, result) =>
err ? console.error(err) : console.table(result)
);
  
