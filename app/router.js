var express = require('express');
var router = express.Router();

router.get('/*', function(req, res, next) {
  var apiFunction = require('./services/' + req.path.replace(/^\//, ''));
  res.send(apiFunction(req, res, next));
});

module.exports = router;
