const UserInfoModel = require('../model/UserInfoModel');
const checkToken = require('../ws/checkToken');

module.exports = function(req) {
  return new Promise((resolve, reject) => {
    checkToken(req)
      .then(() => {
        UserInfoModel.findOne({
          userId: req.body.userId
        })
      })
      .then(result => {
        if (!result) {
          return reject('勤務情報が見つかりませんでした');
        }
        result.userConfig = req.body.userConfig;
        result.timeSheets = req.body.timeSheets;
        return result.save();
      })
      .catch(e => reject(e));
  });
};
