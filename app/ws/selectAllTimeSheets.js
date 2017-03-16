const TimeSheetUsersModel = require('../model/TimeSheetUsersModel');

module.exports = function(req) {
  return new Promise((resolve, reject) => {
    const reqBody = req.body;

    TimeSheetUsersModel.findOne({
      'userId': reqBody.userId
    })
    .then(result => {
      if (!result) {
        return reject('Not Found');
      }
      return resolve(result.timeSheets);
    })
    .catch(e => {
      return reject(e);
    });
  });
};
