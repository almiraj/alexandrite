const crypto = require('crypto');
const LoginModel = require('../model/LoginModel');

module.exports = function(req, res) {
  console.log('::req');
  console.log(req.body);
  LoginModel.findOne(
    {
      'userId': req.body.userId,
      'userHash': toHash(toHash(req.body.password || ''))
    },
    function(err, result) {
      if (err) throw err;
      console.log('::res');
      console.log(JSON.stringify(result));
      result = result || {};  // TODO BusinessErrorの扱いを整理する
      res.send({
        userId: result.userId,
        userHash: result.userHash
      });
    }
  );
};

function toHash(text) {
  const hashsum = crypto.createHash('SHA256');
  hashsum.update('3d' + text + '91');
  return hashsum.digest('hex');
}
