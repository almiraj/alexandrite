const mongoose = require('mongoose');

module.exports = (function() {
  const Schema = mongoose.Schema;
  return mongoose.model('Login', new Schema({
    loginId: { type: String },
    loginToken: { type: String },
    lastAccessedTime: { type: Date, expires: 60 * 60 * 24 * 7 }
  }));
})();
