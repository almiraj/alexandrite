'use strict';
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
      lunchBeginHour: { type: Number },
      lunchBeginMinute: { type: Number },
      lunchEndHour: { type: Number },
      lunchEndMinute: { type: Number },
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
        paidOffType: { type: String, enum: ['AM', 'PM'] },
        remarks: { type: String },
        workTime: { type: Number }
      }) ],
    }) ]
  }, {
    usePushEach: true
  }));
})();
