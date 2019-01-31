'use strict';
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');
const LoginModel = require('../model/LoginModel');

// 環境変数が足りなければ落とす
if (!process.env.CONFIRM_MAIL_ADDRESS || !process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
  console.error('CONFIRM_MAIL_ADDRESS is not found from ENV');
  process.exit(1);
}

// Firebase SDKの初期設定をする
admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY)),
  databaseURL: "https://alexandrite-16a4f.firebaseio.com"
});

module.exports = function(req) {
  // お試しログインの場合、そのまま素通りさせる
  if (req.body.loginId == 'trynow') {
    return LoginModel.create({ loginId: req.body.loginId, loginToken: generateToken(), lastAccessedTime: new Date() });
  }
  // OAuth認証の場合、トークンチェックを行う
  if (req.body.loginedToken) {
    return admin.auth().verifyIdToken(req.body.loginedToken)
      .then(() => LoginModel.create({ loginId: req.body.loginId, loginToken: generateToken(), lastAccessedTime: new Date() }));
  }
  // office365の場合、SMTP認証を行い、認証が通らなければrejectし、通ればトークンを発行する
  return sendMail(req.body.loginId, req.body.loginPassword)
    .then(() => LoginModel.create({ loginId: req.body.loginId, loginToken: generateToken(), lastAccessedTime: new Date() }));
};

function sendMail(address, password) {
  return new Promise((resolve, reject) => {
    const smtp = nodemailer.createTransport({
      host: 'smtp.office365.com',
      auth: {
        user : address,
        pass : password,
        port: '587'
      }
    });
    smtp.sendMail({
      from: address,
      to: process.env.CONFIRM_MAIL_ADDRESS,
      subject: 'ログイン通知',
      text: 'ログインできたよ',
      html: '<b>ログインできたよ</b>'
    }, (e, info) => {
      smtp.close();
      if (!e) {
        return resolve();
      }
      const originalMessage = String(e);
      console.log(originalMessage);
      if (originalMessage.includes('Missing credentials') || originalMessage.includes('Authentication unsuccessful')) {
        return reject('ユーザIDまたはパスワードが違います');
      }
      if (originalMessage.includes('ENOTFOUND')) {
        return reject('接続に失敗しました');
      }
      return reject(originalMessage);
    });
  });
}

function generateToken() {
  const hashsum = crypto.createHash('SHA256');
  hashsum.update('}d' + new Date() + 'P1');
  return hashsum.digest('hex');
}
