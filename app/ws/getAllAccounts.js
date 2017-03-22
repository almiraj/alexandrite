const AccountModel = require('../model/AccountModel');

module.exports = function(req) {
  return new Promise((resolve, reject) => {
    const reqBody = req.body;

    AccountModel.find({
    })
    .then(result => {
      if (!result) {
        return reject('Not Found');
      }
      return resolve(result);
    })
    .catch(e => {
      return reject(e);
    });
  });
};
