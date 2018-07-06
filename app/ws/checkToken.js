const LoginModel = require('../model/LoginModel');

module.exports = function(req) {
  return new Promise((resolve, reject) => {
    return LoginModel.findOne({
      loginId: req.body.loginId,
      loginToken: req.body.loginToken
    })
    .then(result => {
      if (!result) {
        return reject('ログインしていません');
      }
      result.lastAccessedTime = new Date();
      result.save().then(() => resolve(result)).catch(e => reject(e));
    })
    .catch(e => reject(e));
  });
};
