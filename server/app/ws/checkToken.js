'use strict';
const LoginModel = require('../model/LoginModel');

// トークンを更新し、更新できなければ未ログインと見なしてrejectする
module.exports = function(req) {
  return LoginModel.update({ loginId: req.body.loginId, loginToken: req.body.loginToken }, { $set: { lastAccessedTime: new Date() } })
    .then(result => {
      if (!result.nModified) {
        return Promise.reject('ログインしていません');
      }
    });
};
