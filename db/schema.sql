DROP DATABASE IF EXISTS library_db;
CREATE DATABASE library_db;

USE library_db;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30),
  salary DECIMAL,

  department INT,
  FOREIGN KEY (department)
  REFERENCES department(id)
  ON DELETE SET NULL
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  PRIMARY KEY (id),

  department INT,
  FOREIGN KEY (department)
  REFERENCES department(id)
  ON DELETE SET NULL,

  roles INT,
  FOREIGN KEY (roles)
  REFERENCES roles(id)
  ON DELETE SET NULL,
  

  manager_id INT
  REFERENCES employee(id)
  
);