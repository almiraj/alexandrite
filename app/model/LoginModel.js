const mongoose = require('mongoose');

module.exports = (function() {
  const Schema = mongoose.Schema;
  return mongoose.model('Login', new Schema({
    userId: { type: String, index: { unique: true } },
    userHash: { type: String }
  }));
})();
