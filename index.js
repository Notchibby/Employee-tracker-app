require('dotenv').config();
const sqlconnect = require('./config/connection');
const inquirer = require('inquirer');
const mysql = require('mysql2');
const queries = require('./utils/utils')

const db = mysql.createConnection(
    sqlconnect,
    console.log(`Connected to the library_db database.`)
);

// helper function to run sql view syntaxes
const callQuery = (cb) => {
    return db.query(cb, (err, result) => {
        if (err) {
            throw err
        }
        console.table(result)
        menu()
    })

}


// calls the menu
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

            }

            if (answers.menu === 'View All Roles') {
                callQuery(queries.viewRoles())

            }

            if (answers.menu === 'View All Departments') {
                callQuery(queries.viewDepartment())
            }

            if (answers.menu === 'Add Role') {
                addRole()
            }

            if (answers.menu === 'Quit') {
                return console.log('Thank you for using the Employee Tracker app')
            }

            if (answers.menu === 'Add Employees') {
                addEmployee()
            }

            if (answers.menu === 'Add Department') {
                addDepartment()
            }

            if (answers.menu === 'Update Employee Role') {
                updateEmployeeRole()
            }

        })

}

// function to add an employee
function addEmployee() {
    db.query('SELECT * FROM role', (err, result) => {
        if (err) {
            throw err
        }
        let employeeRoleChoices = result.map((role) => {
            return ({
                name: role.title,
                value: role.id
            })
        })


        db.query('SELECT * FROM employee', (err, result) => {
            if (err) {
                throw err
            }
            let employeeManagerChoices = result.map((manager) => {

                return ({
                    name: manager.first_name + ' ' + manager.last_name,
                    value: manager.id
                })
            })
            let firstIndex = {
                name: 'None',
                value: null
            }

            employeeManagerChoices = [firstIndex, ...employeeManagerChoices]



            inquirer.prompt([
                {
                    type: 'input',
                    name: 'first_name',
                    message: 'What is the employees first name?',

                },

                {
                    type: 'input',
                    name: 'last_name',
                    message: 'What is the employees last name?',

                },

                {
                    type: 'list',
                    name: 'Role',
                    message: 'What is the employees Role?',
                    choices: employeeRoleChoices,

                },

                {
                    type: 'list',
                    name: 'Manager',
                    message: 'Who is the employees manager?',
                    choices: employeeManagerChoices,

                },


            ])


                .then((answers) => {
                    console.log(`${answers.first_name} ${answers.last_name} has been successfully added`)
                    let first_name = answers.first_name

                    let last_name = answers.last_name

                    let values = [first_name, last_name, answers.Role, answers.Manager]

                    db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id ) VALUES (?,?,?,?)`, values, (err) => {
                        if (err) {
                            throw err
                        }
                    }
                    )
                    menu()
                })

        })
    })
}


// function to add role
const addRole = () => {

    db.query('SELECT * FROM department', (err, result) => {
        if (err) {
            throw err
        }
        let departmentChoices = result.map((department) => {
            return ({
                name: department.name,
                value: department.id
            })
        })




        inquirer.prompt([

            {
                type: 'input',
                name: 'Role_name',
                message: 'What is the name of the role?',

            },

            {
                type: 'list',
                name: 'department',
                message: 'Which department does the role belong to?',
                choices: departmentChoices,

            },


            {
                type: 'input',
                name: 'Role_salary',
                message: 'What is the salary of the role?',

            },

        ])

            .then((answers) => {
                console.log(`${answers.Role_name} has been successfully added`)
                answers = [answers.Role_name, answers.department, answers.Role_salary]
                db.query('INSERT INTO role (title, department_id, salary) VALUES (?,?,?)', answers, (err) => {
                    if (err) {
                        throw err
                    }
                }
                )

                menu()

            })
    })
}


// function to add department
function addDepartment() {
    inquirer.prompt([

        {
            type: 'input',
            name: 'Department_name',
            message: 'What is the name of the Department?',

        },


    ])

        .then((answers) => {
            console.log(`${answers.Department_name} has been added to departments`)
            answers = answers.Department_name
            db.query('INSERT INTO department (name) VALUES (?)', answers, (err) => {
                if (err) {
                    throw err
                }
            }
            )

            menu()
        })

}


// function to update employee role
function updateEmployeeRole() {
    db.query('SELECT * FROM employee', (err, result) => {
        if (err) {
            throw err
        }

        let employees = result.map((employee) => {
            return ({
                name: employee.first_name + ' ' + employee.last_name,
                value: employee.id
            })
        })


        db.query('SELECT * FROM role', (err, result) => {
            if (err) {
                throw err
            }
            let employeeRoleChoices = result.map((role) => {
                return ({
                    name: role.title,
                    value: role.id
                })
            })

            inquirer.prompt([

                {
                    type: 'list',
                    name: 'update_employee',
                    message: 'Which employees role would you like to update?',
                    choices: employees,

                },

                {
                    type: 'list',
                    name: 'update_role',
                    message: 'Which role would you like to assign to the selected employee?',
                    choices: employeeRoleChoices,

                },

            ])

                .then((answers) => {
                    console.log(`employee's role has been successfully updated`)
                    answers = [answers.update_role, answers.update_employee]
                    db.query('UPDATE employee SET role_id = ? WHERE id = ?', answers, (err) => {
                        if (err) {
                            throw err
                        }
                    }
                    )
                    menu()
                })





        })
    })
}

// function that initialises the menu
menu()



