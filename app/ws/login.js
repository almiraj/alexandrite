const crypto = require('crypto');
const nodemailer = require('nodemailer');

const LoginModel = require('../model/LoginModel');

const CONFIRM_MAIL_ADDRESS = process.env.CONFIRM_MAIL_ADDRESS;

module.exports = function(req) {
  return new Promise((resolve, reject) => {
    const smtp = nodemailer.createTransport({
      host: 'smtp.office365.com',
      auth: {
        user: req.body.loginId,
        pass: req.body.loginPassword,
        port: '587'
      }
    });
    smtp.sendMail({
      from: req.body.loginId,
      to: CONFIRM_MAIL_ADDRESS,
      subject: 'ログイン通知',
      text: 'ログインできたよ',
      html: '<b>ログインできたよ</b>'
    }, (e, info) => {
      if (e) {
        const errorMessage = String(e);
        console.log(errorMessage);
        if (errorMessage.includes('Missing credentials') || errorMessage.includes('Authentication unsuccessful')) {
          return reject('ユーザIDまたはパスワードが違います');
        }
        if (errorMessage.includes('ENOTFOUND')) {
          return reject('接続に失敗しました');
        }
        return reject(e);
      }
      const loginToken = generateUserToken();
      LoginModel.findOne({
        'loginId': req.body.loginId
      })
      .then(result => {
        if (result) {
          result.loginToken = loginToken;
          return result.save().then(() => resolve(result)).catch(e => reject(e));
        }
        const newResult = {
          'loginId': req.body.loginId,
          loginToken
        };
        return LoginModel.collection.insert([
          new LoginModel(newResult)
        ], (e) => !e ? resolve(newResult) : reject(e));
      })
      .catch(e => {
        return reject(e);
      });
      smtp.close();
    });
  });
};

function generateUserToken() {
  const hashsum = crypto.createHash('SHA256');
  hashsum.update('}d' + new Date() + 'P1');
  return hashsum.digest('hex');
}
