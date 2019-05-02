const getUnwasted = require('./getUnwastedApi');

const unwastedHerbMiddleware = (req, res, next) => {
  const { name } = req.params;
  let unwastedTitle = null;
  let unwastedPostedDate = null;
  let unwastedExpiration = null;
  let unwastedUser = null;
  let allUnwastedItems = [];

  return getUnwasted(name)
    .then(unwastedHerbs => {
      return Promise.all(unwastedHerbs.map(herb => {
        unwastedTitle = herb.title;
        unwastedPostedDate = herb.postedDate;
        unwastedExpiration = herb.expiration;
        unwastedUser = herb.user;
        unwastedHerbs = {
          unwastedTitle,
          unwastedPostedDate,
          unwastedExpiration,
          unwastedUser
        };
        allUnwastedItems.push(unwastedHerbs);
      }));
    })
    .then(() => {
      req.unwasted = allUnwastedItems;
      next();
    });
};

module.exports = unwastedHerbMiddleware;
