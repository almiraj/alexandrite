const mongoose = require('mongoose');

module.exports = (function() {
  const Schema = mongoose.Schema;
  return mongoose.model('TimeSheetUsers', new Schema({
    userId: { type: String, index: { unique: true } },
    userName: { type: String },
    projectName: { type: String },
    timeSheets: [ new Schema({
      month: { type: String, index: true },
      dateRows: [ new Schema({
        date: { type: String },
        type1: { type: String },
        type2: { type: String },
        begin: { type: String },
        end: { type: String },
        paidVacBegin: { type: String },
        paidVacEnd: { type: String },
        unpaidVacTime1: { type: String },
        unpaidVacTime2: { type: String },
        nightOverTime: { type: String },
        actualWorkTime: { type: String },
        paidVacTime: { type: String },
        paidWorkTime: { type: String },
        appendixDescription: { type: String },
        appendixPhase: { type: String },
        appendixRemarks: { type: String }
      }) ]
    }) ]
  }));
})();
