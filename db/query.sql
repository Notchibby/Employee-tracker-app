SELECT 

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
INNER JOIN department ON (department.id = role.department_id)
ORDER BY employee.id


