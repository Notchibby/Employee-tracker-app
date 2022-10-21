INSERT INTO department (name)
VALUES ('Engineering'),
       ('Finance'),
       ('Legal'),
       ('Sales');

INSERT INTO roles (title, department, salary)
VALUES ('Sales Lead', 4, 100000),
       ('Salesperson', 4, 80000),
       ('Lead Engineer', 1, 150000),
       ('Software Engineer', 1, 120000),
       ('Account Manager', 2, 160000),
       ('Accountant', 2, 125000),
       ('Legal Team Lead', 3, 250000),
       ('Lawyer', 3, 190000);

INSERT INTO employee (first_name, last_name, department, roles, manager_id )
VALUES ('John', 'Doe', 4, 1, NULL),
       ('Mike', 'Chan', 4, 2, 1),
       ('Ashley', 'Rodriguez', 1, 3, NULL),
       ('Kevin', 'Tupik', 1, 4, 3),
       ('Kunal', 'Singh', 2, 5, NULL),
       ('Malia', 'Brown', 2, 6, 5),
       ('Sarah', 'Lourd', 3, 7, NULL),
       ('Tom', 'Allen', 3, 8, 7);