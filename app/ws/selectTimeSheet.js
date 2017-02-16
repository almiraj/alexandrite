const TimeSheetUsersModel = require('../model/TimeSheetUsersModel');

module.exports = function(req) {
  return new Promise((resolve, reject) => {
    TimeSheetUsersModel.findOne({
      'userId': req.query.userId,
      'timeSheet.month': req.query.month
    }).then(result => {
      return resolve(result);
    });
  });
};
