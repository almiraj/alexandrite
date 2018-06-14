const UserInfoModel = require('../model/UserInfoModel');

module.exports = function(req) {
  return new Promise((resolve, reject) => {
    const reqBody = req.body;

    UserInfoModel.findOne({
      'userId': reqBody.userId
    })
    .then(result => {
      if (!result) {
        return reject('Not Found');
      }

      result.userConfig = reqBody.userConfig;
      result.timeSheets = reqBody.timeSheets;
      return result.save().then(() => resolve()).catch(e => reject(e));
    })
    .catch(e => {
      return reject(e);
    });
  });
};
