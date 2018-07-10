'use strict';
const UserInfoModel = require('../model/UserInfoModel');
const checkToken = require('../ws/checkToken');

// 勤務表を検索する
module.exports = function(req) {
  return checkToken(req).then(() => UserInfoModel.findOne({ userId: req.body.userId }));
};
