const TimeSheetUsersModel = require('../model/TimeSheetUsersModel');

module.exports = function(req) {
  return new Promise((resolve, reject) => {
    const reqBody = req.body;

    TimeSheetUsersModel.findOne({
      'userId': reqBody.userId
    }, 'timeSheet')
    .then(result => {
      if (!result) {
        return reject('Not Found');
      }
      return resolve(result.timeSheet);
    });
  });
};
