const TimeSheetUsersModel = require('../model/TimeSheetUsersModel');

module.exports = function(req, res) {
  console.log('::req');
  console.log(req.query);
  TimeSheetUsersModel.findOne(
    {
      'userId': req.query.userId,
      'timeSheet.month': req.query.month
    },
    function(err, result) {
      if (err) throw err;
      console.log('::res');
      console.log(JSON.stringify(result));
      res.send(JSON.stringify(result));
    }
  );
};
