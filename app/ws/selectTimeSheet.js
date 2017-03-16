const TimeSheetUsersModel = require('../model/TimeSheetUsersModel');

module.exports = function(req) {
  return new Promise((resolve, reject) => {
    TimeSheetUsersModel.findOne({
      'userId': req.query.userId,
      'timeSheets.month': req.query.month
    })
    .then(result => {
      if (!result) {
        return reject('Not Found');
      }
      return resolve(result);
    })
    .catch(e => {
      return reject(e);
    });
  });
};
