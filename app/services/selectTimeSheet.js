const TimeSheetUsersModel = require('../model/TimeSheetUsersModel');

module.exports = function(req, res) {
  TimeSheetUsersModel.findOne({ id: 'rain' }, function(err, result) {
    if (err) throw err;
    res.send(JSON.stringify(result));
  });
};
