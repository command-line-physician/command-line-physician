const inquirer = require('inquirer');
const request = require('superagent');
const { getToken } = require('../commons/state');
const BASE_URL = 'http://localhost:7890/api/v1';
const selectedHerb = require('../handlers/herb-selection');

const browseHerbs = {
  type: 'list',
  name: 'browse',
  choices: [
    { name: 'browse', value: '/herbs' },
    { name: 'quit', value: 'quit' }
  ]
};

module.exports = () => inquirer.prompt([
  browseHerbs
])
  .then((choice) => {
    console.log(choice);
    if(choice.browse === '/herbs') {
      return request
        .get(`${BASE_URL}${choice.browse}`)
        .set('Authorization', `Bearer ${getToken()}`)
        .then(res => {
          return inquirer.prompt({
            type: 'list',
            name: 'herb',
            choices: res.body.map(herb => ({ name: herb.name, value: herb._id }))
          });
        })
        .then((choice) => {
          const { herb } = choice;
          // console.log(choice);
          return selectedHerb(herb);
        });
    } else process.exit(); 
  });
   
