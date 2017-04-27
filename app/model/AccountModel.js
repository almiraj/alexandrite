const mongoose = require('mongoose');

module.exports = (function() {
  const Schema = mongoose.Schema;
  return mongoose.model('Accounts', new Schema({
    userId: { type: String, index: { unique: true } },
    userHash: { type: String },
    isAdmin: { type: Boolean }
  }));
})();
