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
      smtp.close();
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

      // SMTP認証が成功した場合はトークンを発行する
      const loginInfo = {
        loginId: req.body.loginId,
        loginToken: generateUserToken(),
        lastAccessedTime: new Date()
      };
      return LoginModel.collection.insert([
        new LoginModel(loginInfo)
      ], (e) => !e ? resolve(loginInfo) : reject(e));
    });
  });
};

function generateUserToken() {
  const hashsum = crypto.createHash('SHA256');
  hashsum.update('}d' + new Date() + 'P1');
  return hashsum.digest('hex');
}
