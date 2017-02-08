const TimeSheetUsersModel = require('../model/TimeSheetUsersModel');

module.exports = function(req, res) {
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
    { upsert: true },
    function(err, result) {
      if (err) throw err;
      res.send(result);
    }
  );
};
