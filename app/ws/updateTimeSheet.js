const TimeSheetUsersModel = require('../model/TimeSheetUsersModel');

module.exports = function(req, res) {
  TimeSheetUsersModel.update(
    { userId: 'foo' },
    { userName: 'foo bar' },
    {
      timeSheet: [
        {
          month: '201611',
          timeTable: [ { date: '1', begin: '0900', end: '1800' }, { date: '2', begin: '0900', end: '1800' } ]
        },
        {
          month: '201612',
          timeTable: [ { date: '1', begin: '0930', end: '2100' }, { date: '2', begin: '1230', end: '2400' } ]
        }
      ]
    },
    function(err, result) {
      if (err) throw err;
      res.send(JSON.stringify(result));
    }
  );
};
