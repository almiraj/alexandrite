'use strict';
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const LoginModel = require('../model/LoginModel');

const CONFIRM_MAIL_ADDRESS = process.env.CONFIRM_MAIL_ADDRESS;

// SMTP認証を行い、認証が通らなければrejectし、通ればトークンを発行する
module.exports = function(req) {
  return sendMail(req).then(() => LoginModel.create({ loginId: req.body.loginId, loginToken: generateToken(), lastAccessedTime: new Date() }));
}

function sendMail(req) {
  return new Promise((resolve, reject) => {
    const smtp = nodemailer.createTransport({
      host: 'smtp.office365.com',
      auth: {
        user : req.body.loginId,
        pass : req.body.loginPassword,
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
