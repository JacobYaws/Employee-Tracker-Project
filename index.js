const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const connection = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'Foundation123-!',
    database: 'company_db'
  },
  console.log(`Connected to the company_db database.`)
);

// const departmentChoices = async () => {
//     const departmentQuery = `SELECT id AS value, name FROM department;`;
//     const departments = await connection.query(departmentQuery);
//     return departments[0];
// };

// 'use strict';

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



function mainPrompt() {
    inquirer
        .prompt({
            type: 'list',
            name: 'home',
            message: 'What would you like to do?',
            choices: [
                mainPromptChoices.viewAllEmployees,
                mainPromptChoices.addEmployee,
                mainPromptChoices.updateRole,
                mainPromptChoices.addRole,
                mainPromptChoices.viewAllRoles,
                mainPromptChoices.viewAllDepartments,
                mainPromptChoices.addDepartment,
                mainPromptChoices.exit
            ]
        })

        

        .then((answers) => {
        console.log(answers);
        if (answers.name) {
          console.log('Department added!');
          mainPrompt();
        }
        if (answers.home === 'View All Employees') {
          const query = `SELECT * FROM employee`
          connection.query(query, (err, res) => {
            if (err) throw err;
            console.log('All Employees');
            console.table(res);
            mainPrompt();
          })
        }
        
       
        if (answers.home === 'Add Employee') {
          console.log('Add employee');
          connection.query(`SELECT role.title, role.id AS role_id, employee.manager_id, employee.first_name, employee.last_name, employee.id AS employeeId FROM role inner join employee on employee.role_id = role.id;`, async (err, res) => {
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
             console.log(addEmployee);
             connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${addEmployee.first_name}', '${addEmployee.last_name}', '${addEmployee.roleId}', ${addEmployee.manager_id});`, async (err, res) => {
              if (err) throw err;
              console.log('Employee Added');
              mainPrompt();
             })
          })
        }
          if (answers.home === 'Update Employee Role') {
            console.log('Updating employee role');
            connection.query('SELECT employee.id AS employeeId, employee.first_name, employee.last_name, title, role.id AS roleId FROM role inner join employee on employee.role_id = role.id;', async (err, res) => {
              // console.log(res);
              let roles = [];
              // const employeeFirst = employee.first_name;
              // const employeeLast = employee.last_name;
              if (err) throw err;
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
            //  console.log(updateRole);
             connection.query(`UPDATE employee SET role_id=${updateRole.roleId} WHERE id=${updateRole.employee}`, async (err, res) => {
              if (err) throw err;
              console.log('Role updated');
              mainPrompt();
             })
          })
        }
        if (answers.home === 'View All Roles') {
          const query = `SELECT * FROM role`
          connection.query(query, (err, res) => {
            if (err) throw err;
            console.log('All Roles');
            console.table(res);
            mainPrompt();
          })
        }
        if (answers.home === 'Add Role') {
          connection.query('SELECT name, id AS value FROM department;', async (err, res) => {
            console.log(res);
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
           console.log(role);
           connection.query(`INSERT INTO role (title, salary, department_id) VALUES ('${role.title}', '${role.salary}', '${role.department}')`, async (err, res) => {
            if (err) throw err;
            console.log('Role updated');
            mainPrompt();
           })
          })
        }
        if (answers.home === 'View All Departments') {
            const query = `SELECT * FROM department`
            connection.query(query, async (err, res) => { 
                if (err) throw err;
                console.table(res);
                mainPrompt();
            })

            }
        if (answers.home === 'Add Department') {
             inquirer.prompt([
                {
                    type: 'input',
                    name: 'addDepartment',
                    message: 'What is the department name?'
                },
             ])
             .then((answers) => {
                const query = `INSERT IGNORE INTO department (name) VALUES ('${answers.addDepartment}');`;
                connection.query(query);
                mainPrompt();
             });
             
             


        //     const query = `INSERT INTO department name VALUES ('${answers.department}')`
        //     connection.query(query, async (err, res) => {
        //         if (err) throw err;
        //        const department = await inquirer.prompt([
        //            // {
        //            //     name: 'employeeDepartment',
        //            //     type: 'list',
        //            //     message: 'What department does the employee belong to?',
        //            //     choices: () => res.map(res => res.name),
        //            // }
        //            {
        //                name: 'employeeDepartment',
        //                type: 'input',
        //                message: 'Add a new department',
        //                // choices: () => res.map(res => res.name),
        //            }
        //        ]);
        //    });
            
                // mainPrompt();
            
            }
            
        
        if (answers.home === 'Exit') {
            connection.end();
            return
        }
    });
  }
    mainPrompt();


    