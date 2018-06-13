const mongoose = require('mongoose');

module.exports = (function() {
  const Schema = mongoose.Schema;
  return mongoose.model('TimeSheetUsers', new Schema({
    userId: { type: String, index: { unique: true } },
    userName: { type: String },
    timeSheets: [ new Schema({
      yearMonth: { type: String, index: true },
      dateRows: [ new Schema({
        date: { type: Number, index: true },
        beginHour: { type: Number },
        beginMinute: { type: Number },
        endHour: { type: Number },
        endMinute: { type: Number },
        intervalHour: { type: Number },
        intervalMinute: { type: Number },
        workTime: { type: Number }
      }) ],
    }) ]
  }, {
    usePushEach: true
  }));
})();
