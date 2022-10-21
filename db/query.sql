SELECT 

employee.id As id
roles.title AS title,
roles.salary AS salary,
department.name AS department,
employee.first_name AS first_name
employee.last_name AS last_name
employee.manager_id As manager_id


FROM roles
JOIN department ON roles.department = department.id;

SELECT *
FROM employee
JOIN roles ON employee.roles = employee.id