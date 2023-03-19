// These are all of the npm packages required to run the application correctly.
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

// This constant creates the connection to the mysql database.
const connection = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'Foundation123-!',
    database: 'company_db',
  },
  console.log(`Connected to the company_db database.`)
);

// These are the properties for mainPromptChoices that will be used to create the main menu of the application.
const mainPromptChoices = {
    viewAllEmployees: "View All Employees",
    addEmployee: "Add Employee",
    updateRole: "Update Employee Role",
    addRole: "Add Role",
    viewAllRoles: "View All Roles",
    viewAllDepartments: "View All Departments",
    addDepartment: "Add Department",
    exit: "Exit"
};


// This function creates the inquirer prompt for the user to use. Once the user runs <node index.js>, they will be brought to the main menu of the application.
function mainPrompt() {
    inquirer
        .prompt({
            type: 'list',
            name: 'home',
            message: 'What would you like to do?',
            choices: [
                mainPromptChoices.viewAllDepartments,
                mainPromptChoices.viewAllRoles,
                mainPromptChoices.viewAllEmployees,
                mainPromptChoices.addDepartment,
                mainPromptChoices.addRole,
                mainPromptChoices.addEmployee,
                mainPromptChoices.updateRole,
                mainPromptChoices.exit
            ]
        })
        // Once an answer is selected, it will be used in this .then() function to direct the user to the correct menus needed to fulfill their use of the application.
        .then((answers) => {
        if (answers.name) {
          console.log('Department added!');
          mainPrompt();
        }
        // If View All Employees is selected, it will grab the employee id, first name, last name (from an alias value to make joining to the same table easier), job title, department name, and managers created by selecting first and last names.
        if (answers.home === 'View All Employees') {
          const query =`SELECT  e.id AS employeeId, e.first_name, e.last_name, role.title, department.name AS department_name, role.salary, CONCAT(e1.first_name, ' ', e1.last_name) AS Manager FROM employee e LEFT JOIN employee e1 ON e1.id = e.manager_id JOIN role ON role.id = e.role_id JOIN department ON department.id = role.department_id;`
          connection.query(query, (err, res) => {
            if (err) throw err;
            console.log('All Employees');
            console.table(res);
            mainPrompt();
          })
        }
        
        // If Add Employee is selected, it will select the job title, role id, the employees manager id, first and last name, and employee id.
        if (answers.home === 'Add Employee') {
          console.log('Add employee');
          connection.query(`SELECT role.title, role.id AS role_id, employee.manager_id, employee.first_name, employee.last_name, employee.id AS employeeId FROM role inner join employee on employee.role_id = role.id;`, async (err, res) => {
            // These variables are used to get the required data needed for later on in the prompts.
            let rolesInit =  res.map(res => {
              return { value: res.role_id,
              name: res.title
            }}); 
            let roles = [...new Set(rolesInit.map(a => a.value))].map( id => {
              return rolesInit.find(a => a.value === id)
            });
              let employees = res.map(res => {
                return { value: res.employeeId,
                name: res.first_name + ' ' + res.last_name
              }});
              employees.push({value: null,
              name: 'None'
            })
              if (err) throw err;
              // This variable creates another inquirer prompt to allow the user to enter all of the necessary information they need to create the employee.
              const addEmployee = await inquirer.prompt([
                {
                  type: 'input',
                  name: 'first_name',
                  message: 'What is the employee\'s\ first name?',
                },
                {
                  type: 'input',
                  name: 'last_name',
                  message: 'What is the employee\'s\ last name?',
                },
                {
                  type: 'list',
                  name: 'roleId',
                  message: 'What is the employee\'\s role?',
                  choices: roles
              },
              {
                  type: 'list',
                  name: 'manager_id',
                  message: 'Who is the employee\'\s manager?',
                  choices: employees
            }
            ])
            // Once all of the questions are answered, it will take the data and insert them into the employee id by their respective values.
             connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${addEmployee.first_name}', '${addEmployee.last_name}', '${addEmployee.roleId}', ${addEmployee.manager_id});`, async (err, res) => {
              if (err) throw err;
              console.log('Employee Added');
              mainPrompt();
             })
          })
        }
        // If Update Employee Role is selected, it will grab all of the necessary columns needed to update the selected employee's role.
          if (answers.home === 'Update Employee Role') {
            console.log('Update employee role');
            connection.query('SELECT employee.id AS employeeId, employee.first_name, employee.last_name, title, role.id AS roleId FROM role inner join employee on employee.role_id = role.id;', async (err, res) => {
              let roles = [];
              if (err) throw err;
              // This variable creates another inquirer prompt to allow the user to enter all of the necessary information they need to update the employee's information.
              const updateRole = await inquirer.prompt([
                {
                  type: 'list',
                  name: 'employee',
                  message: 'What is the name of the employee?',
                  choices: () => res.map(res => {
                    return { value: res.employeeId,
                    name: res.first_name + ' ' + res.last_name
                  }})
                },
                {
                  type: 'list',
                  name: 'roleId',
                  message: 'What role does this employee have?',
                  choices: () => res.map(res => {
                    return { value: res.roleId,
                    name: res.title
                  }})
              }
             ])
             // Once all of the questions are answered, the employee table will be updated with the employee's new role.
             connection.query(`UPDATE employee SET role_id=${updateRole.roleId} WHERE id=${updateRole.employee}`, async (err, res) => {
              if (err) throw err;
              console.log('Role updated');
              mainPrompt();
             })
          })
        }
        // If View All Roles is selected, the user will be shown all employees as well as their job titles, job ids, department names, and salaries
        if (answers.home === 'View All Roles') {
          const query = (`SELECT role.title, role.id, department.name AS 'department', role.salary FROM role JOIN department ON role.department_id = department.id;`); 
          connection.query(query, (err, res) => {
            if (err) throw err;
            console.log('All Roles');
            // Console table is used to create a table view in the console for an easier user experience.
            console.table(res);
            mainPrompt();
          })
        }
        // If Add Role is selected, the department names and ids will be selected so data can be added after the questions are answered.
        if (answers.home === 'Add Role') {
          connection.query('SELECT name, id AS value FROM department;', async (err, res) => {
            if (err) throw err;
            const role = await inquirer.prompt([
              {
                type: 'input',
                name: 'title',
                message: 'What is the name of the new role?',
              },
              {
                type: 'input',
                name: 'salary',
                message: 'What is the salary for the role?',
              },
              {
                type: 'list',
                name: 'department',
                message: 'What department does this role belong to?',
                choices: () => res
            }
           ])
           // Once the questions are answered, the data will be added into 'role' table by their respective values.
           connection.query(`INSERT INTO role (title, salary, department_id) VALUES ('${role.title}', '${role.salary}', '${role.department}')`, async (err, res) => {
            if (err) throw err;
            console.log('Role updated');
            mainPrompt();
           })
          })
        }
        // If View All Departments is selected, the user will be shown all of the departments in ascending order by department id.
        if (answers.home === 'View All Departments') {
            const query = `SELECT * FROM department ORDER BY id`
            connection.query(query, async (err, res) => { 
                if (err) throw err;
                console.table(res);
                mainPrompt();
          })

        }
        // If Add Department is selected, the user will be asked to enter the new department name through another inquirer prompt.
        if (answers.home === 'Add Department') {
             inquirer.prompt([
                {
                    type: 'input',
                    name: 'addDepartment',
                    message: 'What is the department name?'
                },
             ])
             // Once the question has been answered, the data will be added into the department table.
             .then((answers) => {
                const query = `INSERT IGNORE INTO department (name) VALUES ('${answers.addDepartment}');`;
                connection.query(query);
                mainPrompt();
             });  
            }
            
        // If Exit is selected, the application will close and the user will have to start the application again to continue using it.
        if (answers.home === 'Exit') {
            connection.end();
            return
        }
    });
  }
    mainPrompt();


    