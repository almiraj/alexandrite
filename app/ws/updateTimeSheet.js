const TimeSheetUsersModel = require('../model/TimeSheetUsersModel');

module.exports = function(req) {
  return new Promise((resolve, reject) => {
    const reqBody = req.body;

    TimeSheetUsersModel.update(
      {},
      {
        userId: reqBody.userId,
        timeSheet: [
          {
            month: reqBody.month,
            timeRows: JSON.parse(reqBody.timeRows)
          }
        ]
      },
      { upsert: true }
    ).then(result => {
      return resolve(result);
    });
  });
};
