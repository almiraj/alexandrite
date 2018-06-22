const LoginModel = require('../model/LoginModel');

module.exports = function(req) {
  return new Promise((resolve, reject) => {
    return LoginModel.findOne({
      loginId: req.body.loginId,
      loginToken: req.body.loginToken
    })
    .then(result => result ? resolve(result) : reject('ログインしてください'));
  });
};
