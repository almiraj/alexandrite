const TimeSheetUsersModel = require('../model/TimeSheetUsersModel');

module.exports = function(req, res) {
  if (req.body.userId) {
    TimeSheetUsersModel.update(
      {},
      {
        userId: req.body.userId,
        timeSheet: [
          {
            month: req.body.month,
            timeRows: JSON.parse(req.body.timeRows)
          }
        ]
      },
      { upsert: true },
      function(err, result) {
        if (err) throw err;
        res.send(result);
      }
    );
  } else {
    TimeSheetUsersModel.update(
      {},
      {
        userId: 'foo',
        timeSheet: [
          {
            month: '201611',
            timeRows: [ { date: '1', begin: '0900', end: '1800', interval: '0100' }, { date: '2', begin: '0900', end: '1800', interval: '0100' } ]
          },
          {
            month: '201612',
            timeRows: [ { date: '1', begin: '0930', end: '2100', interval: '0100' }, { date: '2', begin: '1230', end: '2400', interval: '0100' } ]
          }
        ]
      },
      { upsert: true },
      function(err, result) {
        if (err) throw err;
        res.send(result);
      }
    );
  }
};
