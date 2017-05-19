const crypto = require('crypto');
const AccountModel = require('../model/AccountModel');

module.exports = function(req) {
  return new Promise((resolve, reject) => {
    const reqBody = req.body;

    AccountModel.findOne({
      'userId': reqBody.userId
    })
    .then(result => {
      if (!result) {
        return reject('Not Found');
      }
      if (result.isAdmin) {
        return reject('Cannot delete admin');
      }
      AccountModel.remove({
        'userId': reqBody.userId,
      })
      .then(() => resolve())
      .catch(e => reject(e));
    });
  });
};
