SELECT 

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

