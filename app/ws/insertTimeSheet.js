const TimeSheetUsersModel = require('../model/TimeSheetUsersModel');

module.exports = function(req, res) {
  const timeSheetUserModel = new TimeSheetUsersModel();
  new TimeSheetUsersModel({
    userId: 'foo',
    userName: 'foo bar',
    timeSheet: [{
      month: '201612',
      timeTable: [ { date: '1', begin: '0930', end: '2100' }, { date: '2', begin: '0930', end: '1800' } ]
    }]
  }).save(function(err, result) {
    if (err) throw err;
    res.send(JSON.stringify(result));
  });
};
