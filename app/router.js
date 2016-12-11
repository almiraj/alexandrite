var express = require('express');

module.exports = (function() {
  var router = express.Router();

  router.get('/*', function(req, res, next) {
    var apiFunction = require('./ws/' + req.path.replace(/^\//, ''));
    apiFunction(req, res);
  });

  router.post('/*', function(req, res, next) {
    var apiFunction = require('./ws/' + req.path.replace(/^\//, ''));
    apiFunction(req, res);
  });

  return router;
})();
