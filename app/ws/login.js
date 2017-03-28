const crypto = require('crypto');
const AccountModel = require('../model/AccountModel');

module.exports = function(req) {
  return new Promise((resolve, reject) => {
    AccountModel.findOne({
      'userId': req.body.userId,
      'userHash': toHash(toHash(req.body.password || ''))
    })
    .then(result => {
      if (!result) {
        return reject('Not Found');
      }
      return resolve({
        userId: result.userId,
        userHash: result.userHash,
        isAdmin: result.isAdmin
      });
    })
    .catch(e => {
      return reject(e);
    });
  });
};

function toHash(text) {
  const hashsum = crypto.createHash('SHA256');
  hashsum.update('3d' + text + '91');
  return hashsum.digest('hex');
}
