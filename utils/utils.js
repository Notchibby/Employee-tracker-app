// lists the options for the menu
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

// helper function that views all employee
const viewAllEmployee = () => {return `SELECT 

employee.id As id,
employee.first_name AS first_name,
employee.last_name AS last_name,
role.title AS title,
department.name AS department,
role.salary AS salary,
CONCAT(manager.first_name, ' ', manager.last_name) As manager

FROM employee
LEFT JOIN employee manager ON manager.id = employee.manager_id
INNER JOIN role on role.id = employee.role_id
INNER JOIN department ON department.id = role.department_id
ORDER BY employee.id
`
}

// function that views all departments
const viewDepartment = () => {return`
SELECT *
FROM department`}


// function that views all roles
const viewRoles = () => {return `
SELECT 
role.id, role.title, department.name as department , role.salary
FROM role
LEFT JOIN department ON role.department_id = department.id;
`}







module.exports = {options, viewAllEmployee, viewRoles, viewDepartment}