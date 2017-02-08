const express = require('express');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);

module.exports = (function() {
  const router = express.Router();

  router.get('/*', function(req, res, next) {
    const apiFunction = require('./ws/' + req.path.replace(/^\//, ''));
    apiFunction(req, res);
  });

  router.post('/*', function(req, res, next) {
    const apiFunction = require('./ws/' + req.path.replace(/^\//, ''));
    apiFunction(req, res);
  });

  return router;
})();
