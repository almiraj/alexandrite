const mongoose = require('mongoose');

module.exports = (function() {
  const Schema = mongoose.Schema;
  return mongoose.model('UserInfo', new Schema({
    userId: { type: String, index: { unique: true } },
    userConfig: new Schema({
      beginHour: { type: Number },
      beginMinute: { type: Number },
      endHour: { type: Number },
      endMinute: { type: Number },
      breakHour: { type: Number },
      breakMinute: { type: Number },
      minutesInterval: { type: Number }
    }),
    timeSheets: [ new Schema({
      yearMonth: { type: String, index: true },
      dateRows: [ new Schema({
        date: { type: Date, index: true },
        beginHour: { type: Number },
        beginMinute: { type: Number },
        endHour: { type: Number },
        endMinute: { type: Number },
        breakHour: { type: Number },
        breakMinute: { type: Number },
        workTime: { type: Number }
      }) ],
    }) ]
  }, {
    usePushEach: true
  }));
})();
