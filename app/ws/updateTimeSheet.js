const TimeSheetUsersModel = require('../model/TimeSheetUsersModel');

module.exports = function(req) {
  return new Promise((resolve, reject) => {
    const reqBody = req.body;

    TimeSheetUsersModel.update(
      {},
      {
        userId: reqBody.userId,
        timeSheet: JSON.parse(reqBody.timeSheet)
      },
      { upsert: true }
    )
    .then(result => {
      return (result.n > 0) ? resolve() : reject('Not Matched');
    });
  });
};
