SELECT 

employee.id As id,
employee.first_name AS first_name,
employee.last_name AS last_name,
role.title AS title,
department.name AS department,
role.salary AS salary,
employee.manager_id As manager_id

FROM employee
JOIN department ON employee.department = department.id
JOIN role ON employee.role = role.id
JOIN manager_id ON employee.id = employee.manager_id;