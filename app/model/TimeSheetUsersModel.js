const mongoose = require('mongoose');

module.exports = (function() {
  mongoose.connect('mongodb://localhost/timeSheet');

  const Schema = mongoose.Schema;
  return mongoose.model('TimeSheetUsers', new Schema({
    id: { type: String, index: { unique: true } },
    name: { type: String },
    timeSheet: [ new Schema({
      month: { type: String, index: { unique: true } },
      timeTable: [ new Schema({
        date: { type: String, index: { unique: true } },
        begin: { type: String },
        end: { type: String },
        interval: { type: String },
        workTime: { type: Number }
      }) ],
    }) ]
  }));
})();
