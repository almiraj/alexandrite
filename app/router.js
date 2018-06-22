const express = require('express');
const mongoose = require('mongoose');

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI);

module.exports = (function() {
  const router = express.Router();
  router.get('/*', (req, res, next) => callWebService(req, res, next));
  router.post('/*', (req, res, next) => callWebService(req, res, next));
  return router;
})();

function callWebService(req, res, next) {
  console.log('path:' + req.path);
  console.log('query:' + JSON.stringify(req.query));
  console.log('body:' + JSON.stringify(req.body));
  const apiFunction = require('./ws/' + req.path.replace(/^\//, ''));

  apiFunction(req)
    .then(result => {
      console.log('response:' + JSON.stringify(result));
      res.send(result || {});
    })
    .catch(e => {
      console.error('error:' + JSON.stringify(e));
      const resBody = { errorMessage: (e instanceof Error) ? e.message : String(e) };
      console.log('response:' + JSON.stringify(resBody));
      res.send(resBody);
    });
}
