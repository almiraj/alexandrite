const express = require('express');
const mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

module.exports = (function() {
  const router = express.Router();

  router.get('/*', function(req, res, next) {
    callWebService(req, res, next);
  });
  router.post('/*', function(req, res, next) {
    callWebService(req, res, next);
  });

  return router;
})();

function callWebService(req, res, next) {
  console.log('request:' + JSON.stringify(req.query || req.body));
  const apiFunction = require('./ws/' + req.path.replace(/^\//, ''));

  apiFunction(req)
  .then(result => {
    console.log('response:' + JSON.stringify(result));
    res.send(result || {});
  })
  .catch(e => {
    console.error(e);
    res.send({error: e});
  });
}
