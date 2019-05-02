const getStores = require('./googleApi');

const herbMiddleware = (req, res, next) => {
  const { name } =  req.params;
  let storeName = null;
  let storeAddress = null;
  let stores = [];
  return getStores(name)
    .then(herbInfo => {
      return Promise.all(herbInfo.map(herbStore => {
        storeName = herbStore.name;
        storeAddress = herbStore.formatted_address;
        herbInfo = {
          storeName,
          storeAddress
        };
        stores.push(herbInfo);
      }));
    })
    .then(() => {
      req.stores = stores;
      next();
    });
};

module.exports = herbMiddleware;
