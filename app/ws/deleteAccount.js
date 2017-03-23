const crypto = require('crypto');
const AccountModel = require('../model/AccountModel');

module.exports = function(req) {
  return new Promise((resolve, reject) => {
    const reqBody = req.body;

    AccountModel.remove({
      'userId': reqBody.userId,
    })
    .then(() => resolve())
    .catch(e => reject(e));
  });
};
