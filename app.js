const inquirer = require('inquirer');


// const fs = require('fs');
// const generatePage = require('./src/page-template.js')

// const pageHTML = generatePage(name, github);

// fs.writeFile('index.html', generatePage(name, github), err => {
//     if (err) throw err;
//     console.log('portfolio complete. Check index.html');   
//     }
// );
const promptUser = () => {

    return inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: 'what is your name?'
            },
            {
                type: 'input',
                name: 'github',
                message: 'enter your github username:',

            },
            {
                type: 'input',
                name: 'about',
                message: 'provide some information about yourself:'
            }
        ]);
    };



const promptProject = portfolioData => {
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }
    console.log(`
    ==================================
            add a new project
    ==================================
    `);

    return inquirer.prompt ([
        {
            type: 'input',
            name: 'name',
            message: 'what is the name of the project:'
        },

        {
            type: 'input',
            name: 'description',
            message: 'describe the project'
        },

        {
            type: 'checkbox',
            name: 'languages',
            message: 'what language/s did you build this in:',
            choices: ['javascript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'node.js']
        },

        {
            type: 'input',
            name: 'link',
            message: ' REQUIRED: enter the link to your github repository:'
        },

        {
            type: 'confirm', 
            name: 'feature',
            message: 'do you want to feature this project?',
            default: false,
        },

        {
            type: 'confirm',
            name:'confirmAddProject',
            message: 'do you want to add another project?',
            default: false,
        },
    ])
    .then(projectData => {
        portfolioData.projects.push(projectData);
        if(projectData.confirmAddProject) {
            return promptProject(portfolioData);
        } else {
            return portfolioData;
        }

    });
};

promptUser()
  .then(promptProject)
  .then(portfolioData => {
    console.log(portfolioData);
    // will be uncommented in lesson 4
    // const pageHTML = generatePage(portfolioData);
    // fs.writeFile('./index.html', pageHTML, err => {
    //   if (err) throw new Error(err);
    //   console.log('Page created! Check out index.html in this directory to see it!');
    // });
  });
