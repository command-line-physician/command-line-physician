const inquirer = require('inquirer');
const request = require('superagent');
const { setToken } = require('../commons/state');

const BASE_URL = 'http://localhost:7890/api/v1';

const signUpOrSignin = {
  type: 'list',
  name: 'authType',
  choices: [
    { name: 'signup', value: '/auth/signup' },
    { name: 'signin', value: '/auth/signin' }
  ]
};

const userEmail = {
  type: 'input',
  name: 'email'
};

const userPassword = {
  type: 'password',
  name: 'password'
};

module.exports = () => inquirer.prompt([
  signUpOrSignin,
  userEmail,
  userPassword
])
  .then(({ authType, email, password }) => {
    return request
      .post(`${BASE_URL}${authType}`)
      .send({ email, password });
  })
  .then(res => {
    setToken(res.body.token);
  });
