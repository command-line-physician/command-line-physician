const request = require('superagent');
require('dotenv').config();

const BASE_URL = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=${process.env.GOOGLE_KEY}&inputtype=textquery&fields=formatted_address,name,geometry&`;

function getStores(input) {
  let apiBody = null;
  return request
    .get(`${BASE_URL}input=${input}%20Portland%20Oregon`)
    .then(apiData => {
      apiBody = apiData.body.candidates;
      return apiBody;
    });
  
}

module.exports = getStores;
