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
).promise();


// const departmentSelector = async () => {
//   const departmentQuery = `SELECT id AS value, name FROM department;`;
//         let response = [];
//         const departments = await connection.query(departmentQuery, (err, res) => {
//           if (err) throw err;
//         // console.log(typeof queryResponse);
//         // console.log(queryResponse);
//         // const something = connection.query(`SELECT id,name FROM department`);
//         // console.log(something)
//         console.log(response);
//         console.log(res);
//         // const json = JSON.stringify(departments[0]);
//         // console.log(json);
//         return departments[0];
//         })
// };
const departmentChoice = async () => {
  const departmentQuery = `SELECT id AS value, name FROM department;`;
  const departments = await connection.query(departmentQuery);
  return departments[0];
};

function mainPrompt() {
  return inquirer
  .prompt([
    {
      type: 'list',
      name: 'home',
      message: 'What would you like to do?',
      choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Exit'],
    },
    {
      type: 'list',
      name: 'name',
      message: 'What is the name of the department?',
      // choices: async () => {
      //   const query = `SELECT id AS value, name FROM department`;
      //   let response = [];
      //   let queryResponse = await connection.query(query, (err, res) => {
      //     if (err) throw err;
      //     // console.log('All Employees');
      //     // console.table(res);
      //     console.log(res);
      //     response = res;
      //   })
      //   console.log(typeof queryResponse);
      //   console.log(queryResponse);
      //   // const something = connection.query(`SELECT id,name FROM department`);
      //   // console.log(something)
      //   console.log("Response: ", response)
      //   return response
      // },
      
      when: (answers) => {
        return answers.home === 'Add Department'
      }
    },
    {
      type: 'input',
      name: 'first_name',
      message: 'What is the employee\'\s first name?',
      when: (answers) => {
        return answers.home === 'Add Employee'
      }
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'What is the employee\'\s last name?',
      when: (answers) => {
        return answers.home === 'Add Employee'
      }
    },
    {
      type: 'list',
      name: 'role_id',
      message: 'What is the employee\'\s title?',
      choices: ['Remote Sales', 'Marketing Strategist', 'Principal Software Engineer', 'Janitor'],
      when: (answers) => {
        return answers.home === 'Add Employee'
      }
    },
    {
      type: 'list',
      name: 'department_select',
      message: 'What is the employee\'\s department?',
      choices: [async () => {
        const departmentQuery = `SELECT id AS value, name FROM department;`;
        const departments = await connection.query(departmentQuery);
        return departments[0];
  }],
      
      when: (answers) => {
        return answers.home === 'Add Employee'
  },
    },

    // const answer = await inquirer.prompt([
    //     {
    //         name: "first",
    //         type: "input",
    //         message: "Enter the employee ID you want to remove:  "
    //     }
    // ]);

    // connection.query('DELETE FROM employee WHERE ?',
    //     {
    //         id: answer.first
    //     },
    //     function (err) {
    //         if (err) throw err;
    //     }
    // )
    // console.log('Employee has been removed on the system!');
    // prompt();



    {
      type: 'list',
      name: 'manager_id',
      message: 'Who is the employee\'\s manager?',
      choices: ['Gary Jones', 'Samantha Beckett', 'John Smith', 'Rachel McCarter'],
      when: (answers) => {
        return answers.home === 'Add Employee'
      }
    },
    {
      type: 'input',
      name: 'title',
      message: 'What is the employee\'\s role?',
      when: (answers) => {
        return answers.home === 'Add Role' || answers.home === 'Update Employee Role'
      }
    },
    {
      type: 'input',
      name: 'salary',
      message: 'What is the employee\'\s salary?',
      when: (answers) => {
        return answers.home === 'Add Role' || answers.home === 'Update Employee Role'
      }
    },
    // {
    //   type: 'input',
    //   name: 'updated_department_id',
    //   message: 'What is the employee\'\s department ID?',
    //   when: (answers) => {
    //     return answers.home === 'Add Role' || answers.home === 'Update Employee Role'
    //   }
    // },
  ])
  .then((answers) => {
    // const connection = mysql.createConnection(
    //   {
    //     host: 'localhost',
    //     user: 'root',
    //     password: 'Foundation123-!',
    //     database: 'company_db'
    //   },
    //   console.log(`Connected to the company_db database.`)
    // );
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
        console.log(res);
        mainPrompt();
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
    if (answers.home === 'View All Departments') {
      const query = `SELECT * FROM department`
      connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('All Departments');
        console.table(res);
        mainPrompt();
      })
    }
    if (answers.home === 'Add Employee') {
      // const manager_id = answers.manager_id
      const query = `INSERT INTO employee (first_name, last_name, title, manager_id) VALUES ('${answers.first_name}','${answers.last_name}','${answers.title}','${answers.manager_id}')`
      // if (manager_id == '') {
      //   this.manager_id == 1
      //  };
      connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('Add new employee');
        console.table(res);
        mainPrompt();
      })
    }
    if (answers.home === 'Add Role') {
      const query = `INSERT INTO role (title, salary) VALUES ('${answers.title}','${answers.salary}')`
      connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('Add Employee role');
        console.table(res);
        mainPrompt();
      })
    }
    // if (answers.home === 'View All Departments') {
    //   connection.query(`SHOW TABLES`);
    //   console.log(connection.query(`SHOW TABLES`));
    //   // connection.query(`SHOW * FROM employee (first_name, last_name, role_id, manager_id) VALUES ('${answers.first_name}','${answers.last_name}','${answers.role_id}','${answers.manager_id}')`);
    //   console.log('All Departments');
    //   // mainPrompt();
    // }
    // if (answers.manager_id) {
    //   connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answers.first_name}','${answers.last_name}','${answers.role_id}','${answers.manager_id}')`);
    //   console.log('Employee added!');
    //   mainPrompt();
    // }
    // if (answers.department_id) {
    //   connection.query(`INSERT INTO role (title, salary) VALUES ('${answers.title}','${answers.salary}')`);
    //   console.log('Employee role added!');
    //   mainPrompt();
    // }
    
    
    
    // if (answers.updated_salary) {
    //   connection.query(`UPDATE role SET title='${answers.updated_title}',salary='${answers.updated_salary}'`);
    //   console.log('Employee role added!');
    //   mainPrompt();
    // }



    if (answers.home === 'Exit') {
      connection.end();
      // connection.destroy();
    }
  });
}
mainPrompt();


// 'use strict';

// const mysql = require('mysql2');
// const inquirer = require('inquirer');
// require('console.table');



// const promptMessages = {
//     viewAllEmployees: "View All Employees",
//     viewByDepartment: "View All Employees By Department",
//     viewByManager: "View All Employees By Manager",
//     addEmployee: "Add An Employee",
//     removeEmployee: "Remove An Employee",
//     updateRole: "Update Employee Role",
//     updateEmployeeManager: "Update Employee Manager",
//     viewAllRoles: "View All Roles",
//     exit: "Exit"
// };

// const connection = mysql.createConnection({
//     host: 'localhost',

//     // Your port; if not 3306
//     port: 3306,

//     // Your username
//     user: 'root',

//     // Your password
//     password: 'Foundation123-!',
//     database: 'company_db'
// });

// connection.connect(err => {
//     if (err) throw err;
//     prompt();
// });

// function prompt() {
//     inquirer
//         .prompt({
//             name: 'action',
//             type: 'list',
//             message: 'What would you like to do?',
//             choices: [
//                 promptMessages.viewAllEmployees,
//                 promptMessages.viewByDepartment,
//                 promptMessages.viewByManager,
//                 promptMessages.viewAllRoles,
//                 promptMessages.addEmployee,
//                 promptMessages.removeEmployee,
//                 promptMessages.updateRole,
//                 promptMessages.exit
//             ]
//         })
//         .then(answer => {
//             console.log('answer', answer);
//             switch (answer.action) {
//                 case promptMessages.viewAllEmployees:
//                     viewAllEmployees();
//                     break;

//                 case promptMessages.viewByDepartment:
//                     viewByDepartment();
//                     break;

//                 case promptMessages.viewByManager:
//                     viewByManager();
//                     break;

//                 case promptMessages.addEmployee:
//                     addEmployee();
//                     break;

//                 case promptMessages.removeEmployee:
//                     remove('delete');
//                     break;

//                 case promptMessages.updateRole:
//                     remove('role');
//                     break;

//                 case promptMessages.viewAllRoles:
//                     viewAllRoles();
//                     break;

//                 case promptMessages.exit:
//                     connection.end();
//                     break;
//             }
//         });
// }

// function viewAllEmployees() {
//     const query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager
//     FROM employee
//     LEFT JOIN employee manager on manager.id = employee.manager_id
//     INNER JOIN role ON (role.id = employee.role_id)
//     INNER JOIN department ON (department.id = role.department_id)
//     ORDER BY employee.id;`;
//     connection.query(query, (err, res) => {
//         if (err) throw err;
//         console.log('\n');
//         console.log('VIEW ALL EMPLOYEES');
//         console.log('\n');
//         console.table(res);
//         prompt();
//     });
// }

// function viewByDepartment() {
//     const query = `SELECT department.name AS department, role.title, employee.id, employee.first_name, employee.last_name
//     FROM employee
//     LEFT JOIN role ON (role.id = employee.role_id)
//     LEFT JOIN department ON (department.id = role.department_id)
//     ORDER BY department.name;`;
//     connection.query(query, (err, res) => {
//         if (err) throw err;
//         console.log('\n');
//         console.log('VIEW EMPLOYEE BY DEPARTMENT');
//         console.log('\n');
//         console.table(res);
//         prompt();
//     });
// }


// function viewByManager() {
//     const query = `SELECT CONCAT(manager.first_name, ' ', manager.last_name) AS manager, department.name AS department, employee.id, employee.first_name, employee.last_name, role.title
//     FROM employee
//     LEFT JOIN employee manager on manager.id = employee.manager_id
//     INNER JOIN role ON (role.id = employee.role_id && employee.manager_id != 'NULL')
//     INNER JOIN department ON (department.id = role.department_id)
//     ORDER BY manager;`;
//     connection.query(query, (err, res) => {
//         if (err) throw err;
//         console.log('\n');
//         console.log('VIEW EMPLOYEE BY MANAGER');
//         console.log('\n');
//         console.table(res);
//         prompt();
//     });
// }

// function viewAllRoles() {
//     const query = `SELECT role.title, employee.id, employee.first_name, employee.last_name, department.name AS department
//     FROM employee
//     LEFT JOIN role ON (role.id = employee.role_id)
//     LEFT JOIN department ON (department.id = role.department_id)
//     ORDER BY role.title;`;
//     connection.query(query, (err, res) => {
//         if (err) throw err;
//         console.log('\n');
//         console.log('VIEW EMPLOYEE BY ROLE');
//         console.log('\n');
//         console.table(res);
//         prompt();
//     });

// }

// async function addEmployee() {
//     const addname = await inquirer.prompt(askName());
//     connection.query('SELECT role.id, role.title FROM role ORDER BY role.id;', async (err, res) => {
//         if (err) throw err;
//         const { role } = await inquirer.prompt([
//             {
//                 name: 'role',
//                 type: 'list',
//                 choices: () => res.map(res => res.title),
//                 message: 'What is the employee role?: '
//             }
//         ]);
//         let roleId;
//         for (const row of res) {
//             if (row.title === role) {
//                 roleId = row.id;
//                 continue;
//             }
//         }
//         connection.query('SELECT * FROM employee', async (err, res) => {
//             if (err) throw err;
//             let choices = res.map(res => `${res.first_name} ${res.last_name}`);
//             choices.push('none');
//             let { manager } = await inquirer.prompt([
//                 {
//                     name: 'manager',
//                     type: 'list',
//                     choices: choices,
//                     message: 'Choose the employee Manager: '
//                 }
//             ]);
//             let managerId;
//             let managerName;
//             if (manager === 'none') {
//                 managerId = null;
//             } else {
//                 for (const data of res) {
//                     data.fullName = `${data.first_name} ${data.last_name}`;
//                     if (data.fullName === manager) {
//                         managerId = data.id;
//                         managerName = data.fullName;
//                         console.log(managerId);
//                         console.log(managerName);
//                         continue;
//                     }
//                 }
//             }
//             console.log('Employee has been added. Please view all employee to verify...');
//             connection.query(
//                 'INSERT INTO employee SET ?',
//                 {
//                     first_name: addname.first,
//                     last_name: addname.last,
//                     role_id: roleId,
//                     manager_id: parseInt(managerId)
//                 },
//                 (err, res) => {
//                     if (err) throw err;
//                     prompt();

//                 }
//             );
//         });
//     });

// }
// function remove(input) {
//     const promptQ = {
//         yes: "yes",
//         no: "no I don't (view all employees on the main option)"
//     };
//     inquirer.prompt([
//         {
//             name: "action",
//             type: "list",
//             message: "In order to proceed an employee, an ID must be entered. View all employees to get" +
//                 " the employee ID. Do you know the employee ID?",
//             choices: [promptQ.yes, promptQ.no]
//         }
//     ]).then(answer => {
//         if (input === 'delete' && answer.action === "yes") removeEmployee();
//         else if (input === 'role' && answer.action === "yes") updateRole();
//         else viewAllEmployees();



//     });
// };

// async function removeEmployee() {

//     const answer = await inquirer.prompt([
//         {
//             name: "first",
//             type: "input",
//             message: "Enter the employee ID you want to remove:  "
//         }
//     ]);

//     connection.query('DELETE FROM employee WHERE ?',
//         {
//             id: answer.first
//         },
//         function (err) {
//             if (err) throw err;
//         }
//     )
//     console.log('Employee has been removed on the system!');
//     prompt();

// };

// function askId() {
//     return ([
//         {
//             name: "name",
//             type: "input",
//             message: "What is the employe ID?:  "
//         }
//     ]);
// }


// async function updateRole() {
//     const employeeId = await inquirer.prompt(askId());

//     connection.query('SELECT role.id, role.title FROM role ORDER BY role.id;', async (err, res) => {
//         if (err) throw err;
//         const { role } = await inquirer.prompt([
//             {
//                 name: 'role',
//                 type: 'list',
//                 choices: () => res.map(res => res.title),
//                 message: 'What is the new employee role?: '
//             }
//         ]);
//         let roleId;
//         for (const row of res) {
//             if (row.title === role) {
//                 roleId = row.id;
//                 continue;
//             }
//         }
//         connection.query(`UPDATE employee 
//         SET role_id = ${roleId}
//         WHERE employee.id = ${employeeId.name}`, async (err, res) => {
//             if (err) throw err;
//             console.log('Role has been updated..')
//             prompt();
//         });
//     });
// }

// function askName() {
//     return ([
//         {
//             name: "first",
//             type: "input",
//             message: "Enter the first name: "
//         },
//         {
//             name: "last",
//             type: "input",
//             message: "Enter the last name: "
//         }
//     ]);
// }