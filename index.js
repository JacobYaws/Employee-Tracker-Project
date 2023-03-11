const inquirer = require('inquirer');
const mysql = require('mysql2');

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
      type: 'input',
      name: 'name',
      message: 'What is the name of the department?',
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
      type: 'input',
      name: 'role_id',
      message: 'What is the employee\'\s role ID?',
      when: (answers) => {
        return answers.home === 'Add Employee'
      }
    },
    {
      type: 'input',
      name: 'manager_id',
      message: 'What is the employee\'\s manager ID?',
      when: (answers) => {
        return answers.home === 'Add Employee'
      }
    },
    {
      type: 'input',
      name: 'updated_title',
      message: 'What is the employee\'\s role?',
      when: (answers) => {
        return answers.home === 'Add Role' || answers.home === 'Update Employee Role'
      }
    },
    {
      type: 'input',
      name: 'updated_salary',
      message: 'What is the employee\'\s salary?',
      when: (answers) => {
        return answers.home === 'Add Role' || answers.home === 'Update Employee Role'
      }
    },
    {
      type: 'updated_input',
      name: 'updated_department_id',
      message: 'What is the employee\'\s department ID?',
      when: (answers) => {
        return answers.home === 'Add Role' || answers.home === 'Update Employee Role'
      }
    },
  ])
  .then((answers) => {
    const connection = mysql.createConnection(
      {
        host: 'localhost',
        user: 'root',
        password: 'Foundation123-!',
        database: 'company_db'
      },
      console.log(`Connected to the company_db database.`)
    );
    console.log(answers);
    if (answers.name) {
      console.log('Department added!');
      mainPrompt();
    }
    if (answers.manager_id) {
      connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answers.first_name}','${answers.last_name}','${answers.role_id}','${answers.manager_id}')`);
      console.log('Employee added!');
      mainPrompt();
    }
    if (answers.department_id) {
      connection.query(`INSERT INTO role (title, salary, department_id) VALUES ('${answers.title}','${answers.salary}','${answers.department_id}')`);
      console.log('Employee role added!');
      mainPrompt();
    }
    if (answers.updated_department_id) {
      connection.query(`UPDATE role SET title='${answers.updated_title}',salary='${answers.updated_salary}',department_id='${answers.updated_department_id}'`);
      console.log(answers.updated_title);
      console.log('Employee role added!');
      // mainPrompt();
    }
    // viewEmployees();
  });
}
mainPrompt();
// while (true) {
//   const x = mainPrompt();
//   if (x.answers.home === 'Exit') {
//     break
//   }
// }
  // function viewEmployees(first_name, last_name, role_id, manager_id) {
  //   connection.query(`SHOW employee (first_name, last_name, role_id, manager_id) VALUES ('${first_name}','${last_name}','${role_id}','${manager_id}')`)
  // }

  // function viewRoles({title, salary, department_id}) {
  //   connection.query(`SHOW employee (title, salary, department_id) VALUES ('${title}','${salary}','${department_id}')`)
  // }

  // function viewDepartments({name}) {
  //   connection.query(`SHOW department (name) VALUES ('${name}')`)
  // }

  // function addEmployeeToDb({first_name, last_name, role_id, manager_id}) {
  //   connection.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${first_name}','${last_name}','${role_id}','${manager_id}')`)
  // }

  // function addDepartmentToDb({name}) {
  //   connection.query(`INSERT INTO department (name) VALUES ('${name}')`)
  // }

  // function addEmployeeRoleToDb({title, salary, department_id}) {
  //   connection.query(`INSERT INTO employee (title, salary, department_id) VALUES ('${title}','${salary}','${department_id}')`)
  // }

  // function updateEmployeeRoleToDb({title, salary, department_id}) {
  //   connection.query(`INSERT INTO employee (title, salary, department_id) VALUES ('${title}','${salary}','${department_id}')`)
  // }
