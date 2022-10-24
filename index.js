require('dotenv').config();
const sqlconnect = require('./config/connection');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const queries = require('./utils/utils')

const db = mysql.createConnection(
    sqlconnect,
    console.log(`Connected to the library_db database.`)
);

const callQuery = (cb) => {
    return db.query(cb, (err, result) =>
        err ? console.error(err) : console.table(result))
}

const updateQuery = (cb) => { 
   
}


function menu() {
    inquirer.prompt({
        type: 'list',
        name: 'menu',
        message: 'What would you like to do ?',
        choices: queries.options
    })
        .then((answers) => {

            if (answers.menu === 'View All Employees') {
                callQuery(queries.viewAllEmployee())
                setTimeout(menu, 1000)
            }
            
            if (answers.menu === 'View All Roles') {
                callQuery(queries.viewRoles())
                setTimeout(menu, 1000)
            }

            if (answers.menu === 'View All Departments') {
                callQuery(queries.viewDepartment())
                setTimeout(menu, 1000)
            }

            if (answers.menu === 'Quit'){
                return console.log('Thank you for using the Employee Tracker app')
            }



            if (answers.menu === 'Add Employees') {
               addEmployee()
            }

        })

}


function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'Firstname',
            message: 'What is the employees first name?',

        },

        {
            type: 'input',
            name: 'Lastname',
            message: 'What is the employees last name?',

        },

        {
            type: 'input',
            name: 'Role',
            message: 'What is the employees Role?',

        },

        {
            type: 'List',
            name: 'Manager',
            message: 'Who is the employees manager?',
            choices: ['John Doe', 'Ashley Rodriguez', 'Kunal Singh', 'Sarah Lourd'],

        },


    ])

        .then((answers) => {
            console.log(`${answers.Firstname} ${answers.Lastname} has been added`)
            updateQuery(queries.addEmployee({firstname, lastname, role, manager}))
            setTimeout(menu, 1000)
        })

}




menu()
