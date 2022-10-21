SELECT 

employee.id As id,
employee.first_name AS first_name,
employee.last_name AS last_name,
roles.title AS title,
department.name AS department,
roles.salary AS salary,
employee.manager_id As manager_id

FROM employee
JOIN department ON employee.department = department.id
JOIN roles ON employee.roles = employee.id;