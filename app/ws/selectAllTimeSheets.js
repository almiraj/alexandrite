const TimeSheetUsersModel = require('../model/TimeSheetUsersModel');

module.exports = function(req) {
  return new Promise((resolve, reject) => {
    const reqBody = req.body;

    TimeSheetUsersModel.findOne({
      'userId': reqBody.userId
    })
    .then(result => {
      return resolve(result ? result.timeSheets : []);
    })
    .catch(e => {
      return reject(e);
    });
  });
};
