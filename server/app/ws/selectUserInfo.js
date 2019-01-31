'use strict';
const UserInfoModel = require('../model/UserInfoModel');
const checkToken = require('../ws/checkToken');

// 勤務表を検索する
module.exports = function(req) {
  // ログインさえしていれば誰のものでもアクセスできてしまう
  // return checkToken(req).then(() => UserInfoModel.findOne({ userId: req.body.userId }));
  return checkToken(req).then(() => UserInfoModel.findOne({ userId: req.body.loginId }));
};
