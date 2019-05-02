const request = require('superagent');

const BASE_URL = 'https://unwasted.herokuapp.com/api/v1/listings/keyword?searchTerm=';

function getUnwasted(input) {
  let apiBody = null;
  return request
    .get(`${BASE_URL}${input}`)
    .then(apiData => {

      apiBody = apiData.body;
      return apiBody;
    });
}

module.exports = getUnwasted;
