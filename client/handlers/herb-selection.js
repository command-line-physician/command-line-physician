const request = require('superagent');
const { getToken } = require('../commons/state');
const BASE_URL = 'http://localhost:7890/api/v1';
const chalk = require('chalk');

module.exports = herbId => {
  return request
    .get(`${BASE_URL}/herbs/${herbId}`)
    .set('Authorization', `Bearer ${getToken()}`)
    .then(res => {
      print(res.body, 'name', 'red');
      print(res.body, 'latin_name', 'magenta');
      print(res.body, 'category', 'blue');
      print(res.body, 'description', 'yellow');
      print(res.body, 'medicinal_uses', 'green');
    });
};

function print(body, field, color) {
  console.log(chalk.underline.bold[color](`${field}:`), chalk[color](body[field]), '\n');
}

