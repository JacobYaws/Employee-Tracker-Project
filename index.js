const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

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
    if (answers.home === 'View All Employees') {
      const query = `SELECT * FROM employee`
      connection.query(query, (err, res) => {
        if (err) throw err;
        console.log('All Employees');
        console.table(res);
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
