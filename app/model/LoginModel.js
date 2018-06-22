const mongoose = require('mongoose');

module.exports = (function() {
  const Schema = mongoose.Schema;
  return mongoose.model('Login', new Schema({
    loginId: { type: String, index: { unique: true } },
    loginToken: { type: String }
  }));
})();
