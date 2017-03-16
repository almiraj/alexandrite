const mongoose = require('mongoose');

module.exports = (function() {
  const Schema = mongoose.Schema;
  return mongoose.model('TimeSheetUsers', new Schema({
    userId: { type: String, index: { unique: true } },
    userName: { type: String },
    timeSheets: [ new Schema({
      month: { type: String, index: true },
      timeRows: [ new Schema({
        date: { type: String, index: true },
        begin: { type: String },
        end: { type: String },
        interval: { type: String },
        workTime: { type: Number }
      }) ],
    }) ]
  }));
})();
