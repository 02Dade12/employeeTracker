DROP DATABASE IF EXISTS workforceDB;
CREATE database workforceDB;
USE workforceDB;


CREATE TABLE department (
  id INTEGER NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id),
  name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
  id INTEGER NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id),
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INTEGER(5) NOT NULL
);

CREATE TABLE employee (
  id INTEGER NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id),
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER(5) NOT NUll,
  manager_id INTEGER(5)
);
