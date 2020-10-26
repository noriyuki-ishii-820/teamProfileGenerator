const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const team = [];

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

function createManager() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the Manager's Name",
      },
      {
        type: "input",
        name: "id",
        message: "Enter the Manager's ID number",
        validate: (input) =>
          Number.isInteger(Number(input)) && Number(input) > 0
            ? true
            : "Please enter a valid number",
      },
      {
        type: "input",
        name: "email",
        message: "Enter the Manager's email address",
        validate: (input) =>
          /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(input)
            ? true
            : "Please enter a valid email address",
      },
      {
        type: "input",
        message: "What is the manager's office number?",
        name: "officeNumber",
        validate: (input) =>
          Number.isInteger(Number(input)) && Number(input) > 0
            ? true
            : "Please enter a valid number",
      },
    ])
    .then((answers) => {
      const manager = new Manager(
        answers.name,
        answers.id,
        answers.email,
        answers.officeNumber
      );
      team.push(manager);
      console.log("Created the Manager - let's now add team members.");
      createTeam();
    });
}

function createTeam() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What is the employee's role? - or are we done?",
        choices: ["Engineer", "Intern", "I'm Done"],
        name: "employeeType",
      },
    ])
    .then(function (response) {
      switch (response.employeeType) {
        case "Engineer":
          createEngineer();
          break;
        case "Intern":
          createIntern();
          break;
        case "I'm Done":
          build();
          break;
      }
    });
}

function createEngineer() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the Engineer's Name",
      },
      {
        type: "input",
        name: "id",
        message: "Enter the Engineer's ID number",
        validate: (input) =>
          Number.isInteger(Number(input)) && Number(input) > 0
            ? true
            : "Please enter a valid number",
      },
      {
        type: "input",
        name: "email",
        message: "Enter the Engineer's email address",
        validate: (input) =>
          /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(input)
            ? true
            : "Please enter a valid email address",
      },
      {
        type: "input",
        message: "What is the Engineer's GitHub username?",
        name: "github",
      },
    ])
    .then((answers) => {
      const engineer = new Engineer(
        answers.name,
        answers.id,
        answers.email,
        answers.github
      );
      team.push(engineer);
      console.log("Created the Engineer - let's now add more team members.");
      createTeam();
    });
}

function createIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the Intern's Name",
      },
      {
        type: "input",
        name: "id",
        message: "Enter the Intern's ID number",
        validate: (input) =>
          Number.isInteger(Number(input)) && Number(input) > 0
            ? true
            : "Please enter a valid number",
      },
      {
        type: "input",
        name: "email",
        message: "Enter the Intern's email address",
        validate: (input) =>
          /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(input)
            ? true
            : "Please enter a valid email address",
      },
      {
        type: "input",
        message: "Which school is the intern from?",
        name: "school",
      },
    ])
    .then((answers) => {
      const intern = new Intern(
        answers.name,
        answers.id,
        answers.email,
        answers.school
      );
      team.push(intern);
      console.log("Created the Intern - let's now add more team members.");
      createTeam();
    });
}

function build() {
  console.log("Generated the HTML file in the output folder!");
  fs.writeFileSync(outputPath, render(team), "utf-8");
}

createManager();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
