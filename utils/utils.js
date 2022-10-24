const options = [
 'View All Employees',
 'Add Employees',
 'Update Employee Role',
 'View All Roles',
 'Add Role',
 'View All Departments',
 'Add Department',
 'Quit'
];


const viewAllEmployee = () => {return `SELECT 

employee.id As id,
employee.first_name AS first_name,
employee.last_name AS last_name,
role.title AS title,
department.name AS department,
role.salary AS salary,
CONCAT(manager.first_name, ' ', manager.last_name) As manager

FROM employee
LEFT JOIN department ON employee.department = department.id
LEFT JOIN role ON employee.role = role.id
LEFT JOIN employee manager ON manager.id = employee.manager_id
`
}

const viewDepartment = () => {return`
SELECT *
FROM department`}

const viewManagers = () => {return `
SELECT 
CONCAT(manager.first_name, ' ', manager.last_name) As manager
FROM employee
INNER JOIN employee manager ON manager.id = employee.manager_id
`
}

const viewRoles = () => {return `
SELECT 
role.id, role.title, department.name as department , role.salary
FROM role
LEFT JOIN department ON role.department = department.id;
`}

const addEmployee = ({...employee}) => {return `INSERT INTO employee (first_name, last_name, role, manager_id )
VALUES (${employee});`}





module.exports = {options, viewManagers, viewAllEmployee, addEmployee, viewRoles, viewDepartment}