'use strict';
const UserInfoModel = require('../model/UserInfoModel');
const checkToken = require('../ws/checkToken');

// 勤務表が既にあれば更新、なければ作成する
module.exports = function(req) {
  // ログインさえしていれば誰のものでもアクセスできてしまう
  // return checkToken(req).then(() => UserInfoModel.update({ userId: req.body.userId }, req.body, { upsert: true }));
  return checkToken(req).then(() => UserInfoModel.update({ userId: req.body.loginId }, req.body, { upsert: true }));
};
