const UserInfoModel = require('../model/UserInfoModel');
const checkToken = require('../ws/checkToken');

module.exports = function(req) {
  return new Promise((resolve, reject) => {
    checkToken(req)
      .then(() => {
        return UserInfoModel.findOne({
          userId: req.body.userId
        });
      })
      .then(result => {
        if (!result) {
          UserInfoModel.collection.insert([
            new UserInfoModel({
              userId: req.body.userId,
              userConfig: req.body.userConfig,
              timeSheets: req.body.timeSheets
            })
          ]);
          return resolve(result);
        }
        result.userConfig = req.body.userConfig;
        result.timeSheets = req.body.timeSheets;
        return result.save().then(result => resolve(result));
      })
      .catch(e => reject(e));
  });
};
