const crypto = require('crypto');
const LoginModel = require('../model/LoginModel');

module.exports = function(req) {
  return new Promise((resolve, reject) => {
    LoginModel.findOne({
      'userId': req.body.userId,
      'userHash': toHash(toHash(req.body.password || ''))
    }).then(result => {
      if (!result) {
        return reject('Not Found');
      }

      return resolve({
        userId: result.userId,
        userHash: result.userHash
      });
    });
  });
};

function toHash(text) {
  const hashsum = crypto.createHash('SHA256');
  hashsum.update('3d' + text + '91');
  return hashsum.digest('hex');
}
