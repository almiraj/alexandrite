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
      .then(result => resolve(result))
      .catch(e => reject(e));
  });
};
