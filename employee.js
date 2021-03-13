const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: 'root',

    // Be sure to update with your own MySQL password!
    password: 'root',
    database: 'workforce_db',
});

connection.connect((err) => {
    if (err) throw err;
    firstAction();
});

const firstAction = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'rawlist',
            message: 'What would you like to do?',
            choices: [
                'Add a new Department',
                'Add a new Role',
                'Add a new Employee',
                'View all Departments',
                'View all Roles',
                'View all Employees',
                'Update an Employees Role',
            ],
        })
        .then((res) => {
            if (res.action === 'Add a new Department') {
                addDepartment();
            } else if (res.action === 'Add a new Role') {
                addRole();
            } else if (res.action === 'Add a new Employee') {
                addEmployee();
            } else if (res.action === 'View all Departments') {
                viewDepartments();
            } else if (res.action === 'View all Roles') {
                viewRoles();
            } else if (res.action === 'View all Employees') {
                viewEmployees();
            } else {
                updateEmployee();
            }
        });
};

// Functions for adding and viewing "Departments" below
function addDepartment() {
    inquirer
        .prompt([
            {
                name: 'newDepartment',
                type: 'input',
                message: 'What Department do you want to add?',
            },
        ])
        .then(res => {
            connection.query("INSERT INTO department SET ?",
                {
                    name: res.newDepartment,
                },
                function (err, res) {
                    if (err) throw err;
                    viewDepartments();
                })
        })
};

function viewDepartments() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw err;
        console.table(res);
        firstAction();
    })
}

// Functions for adding and viewing "Roles" below
function addRole() {
    inquirer
        .prompt([
            {
                name: 'title',
                type: 'input',
                message: 'What is the title of this role?',
            },
            {
                name: 'salary',
                type: 'input',
                message: 'What is the salary of this role?',
            },
            {
                name: 'departmentID',
                type: 'input',
                message: 'What is the Department ID of this role?',
            },
        ])
        .then(res => {
            connection.query("INSERT INTO roles SET ?",
                {
                    title: res.title,
                    salary: res.salary,
                    department_id: res.departmentID,
                },
                function (err, res) {
                    if (err) throw err;
                    viewRoles();
                })
        })
};

function viewRoles() {
    connection.query("SELECT * FROM roles", function (err, res) {
        if (err) throw err;
        console.table(res);
        firstAction();
    })
}

// Functions for adding, viewing, and updating "Employees" below
function addEmployee() {
    inquirer
        .prompt([
            {
                name: 'firstName',
                type: 'input',
                message: 'What is the Employees first name?',
            },
            {
                name: 'lastName',
                type: 'input',
                message: 'What is the Employees last name?',
            },
            {
                name: 'newRoleID',
                type: 'input',
                message: 'What is their Role ID?',
            },
            {
                name: 'managerID',
                type: 'input',
                message: 'What is their Managers ID?',
            },
        ])
        .then(res => {
            connection.query("INSERT INTO employee SET ?",
                {
                    first_name: res.firstName,
                    last_Name: res.lastName,
                    role_id: res.newRoleID,
                    manager_id: res.managerID,
                },
                function (err, res) {
                    if (err) throw err;
                    viewEmployees();
                })
        })
};

function updateEmployee() {
    inquirer
        .prompt([
            {
                name: 'selectPerson',
                type: 'input',
                message: 'Who do you want to update?',
            },
            {
                name: 'updateRole',
                type: 'input',
                message: 'What is their new role ID?',
            }
        ])
        .then(res => {
            connection.query("UPDATE employe, SET ?, WHERE ?",
                {   
                    role_id: res.updateRole,
                    first_name: res.selectPerson,
                },
                function (err, res) {
                    if (err) throw err;
                    viewEmployees();
                })
        }); 
        
};

function viewEmployees() {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw err;
        console.table(res);
        firstAction();
    })
}