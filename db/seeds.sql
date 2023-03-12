INSERT INTO department (name)
VALUES ("Sales"),
       ("Marketing"),
       ("Engineering"); 

INSERT INTO role (title, salary, department_id)
VALUES ("Remote Sales", 45000, 1),
       ("Marketing Strategist", 70000, 2),
       ("Principal Software Engineer", 150000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jacob", "Yaws", 1, NULL),
       ("John", "Doe", 2, NULL),
       ("Jane", "Smith", 3, NULL);


-- INSERT INTO department 
-- VALUES ("Sales"),("Marketing"),("Engineering"); 

-- INSERT INTO role 
-- VALUES ("Remote Sales",45000,12);

-- INSERT INTO employee 
-- VALUES ("Jacob","Yaws",10,3);
