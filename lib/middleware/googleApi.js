const request = require('superagent');

const BASE_URL = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=AIzaSyC2g3Sky9iTB0VggOwFdWpzh_TtuJeGMuc&inputtype=textquery&fields=formatted_address,name,geometry&';

function getStores(input) {
  let apiBody = null;
  return request
    .get(`${BASE_URL}input=${input}%20Portland%20Oregon`)
    .then(apiData => {
      apiBody = apiData.body.candidates;
      // console.log(apiBody)
      return apiBody;
    });
  
}

// getStores('wormwood');

module.exports = getStores;
