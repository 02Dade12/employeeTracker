USE workforce_db;

INSERT INTO department (name)
VALUES ("HR"), ("Legal"), ("Accounting");

INSERT INTO roles (title, salary, department_id)
VALUES ("Engineer", 100000, 123);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Enrique", "Collazo", 123, 345);