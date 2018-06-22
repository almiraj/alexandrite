const UserInfoModel = require('../model/UserInfoModel');
const checkToken = require('../ws/checkToken');

module.exports = function(req) {
  return new Promise((resolve, reject) => {
    checkToken(req)
      .then(() => {
        UserInfoModel.findOne({
          userId: req.body.userId
        })
        .then(result => result ? resolve(result) : resolve({ userId: req.body.userId, userConfig: {}, timeSheets: [] }))
        .catch(e => reject(e));
      })
      .catch(e => reject(e));
  });
};
