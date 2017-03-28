const AccountModel = require('../model/AccountModel');
const TimeSheetUsersModel = require('../model/TimeSheetUsersModel');

module.exports = function(req) {
  return Promise.resolve()
    .then(() => {
      new Promise((resolve, reject) => {
        return AccountModel.remove((err) => !err ? resolve() : reject(err));
      });
    })
    .then(() => {
      return new Promise((resolve, reject) => {
        return TimeSheetUsersModel.remove((err) => !err ? resolve() : reject(err));
      });
    })
    .then(() => {
      return new Promise((resolve, reject) => {
        AccountModel.collection.insert([
          new AccountModel(
            {
              userId: 'foo',
              userHash: '4f0a3df0e66d312db01148aed62f91df395c66343d65bc25f9b6ed119ec54c72', // foo
              isAdmin: false
            }
          ),
          new AccountModel(
            {
              userId: 'admin',
              userHash: 'fbbd5f9ac5423983deb5a7b00a27b0ddc193828e0c6a4dfe957ad1300d963a51', // admin
              isAdmin: true
            }
          )
        ], (err) => !err ? resolve() : reject(err));
      });
    })
    .then(() => {
      return new Promise((resolve, reject) => {
        TimeSheetUsersModel.collection.insert([
          new TimeSheetUsersModel(
            {
              userId: 'foo',
              timeSheets: [
                {
                  month: '201611',
                  dateRows: [ { date: '1', begin: '0900', end: '1800', interval: '0100' }, { date: '2', begin: '0900', end: '1800', interval: '0100' } ]
                },
                {
                  month: '201612',
                  dateRows: [ { date: '1', begin: '0930', end: '2100', interval: '0100' }, { date: '2', begin: '1230', end: '2400', interval: '0100' } ]
                }
              ]
            }
          )
        ], (err) => !err ? resolve() : reject(err));
      });
    });
};
