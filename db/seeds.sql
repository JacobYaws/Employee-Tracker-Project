INSERT INTO department (name)
VALUES ("Management"),
       ("Supervision"),
       ("Transportation"); 

INSERT INTO role (title, salary, department_id)
VALUES ("Facilities Manager", 110000, 1),
       ("Warehouse Supervisor", 80000, 2),
       ("Yard Hostler", 60000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jacob", "Yaws", 1, NULL),
       ("John", "Doe", 2, 1),
       ("Jane", "Smith", 3, 2);

