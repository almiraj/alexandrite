const UserInfoModel = require('../model/UserInfoModel');

module.exports = function(req) {
  return new Promise((resolve, reject) => {
    const reqBody = req.body;

    UserInfoModel.findOne({
      'userId': reqBody.userId
    })
    .then(result => {
      return resolve(result ? result : {});
    })
    .catch(e => {
      return reject(e);
    });
  });
};
