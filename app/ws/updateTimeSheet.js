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

      const reqTimeSheet = JSON.parse(reqBody.timeSheet);
      for (var i = 0; i < result.timeSheets.length; i++) {
        if (result.timeSheets[i].month == reqTimeSheet.month) {
          // update
          result.timeSheets[i] = reqTimeSheet;
          return result.save().then(() => resolve()).catch(e => reject(e));
        }
      }

      // insert
      result.timeSheets.push(reqTimeSheet);
      return result.save().then(() => resolve()).catch(e => reject(e));
    })
    .catch(e => {
      return reject(e);
    });
  });
};
