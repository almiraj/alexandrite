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
              userHash: 'b65e5ef9b569432539dba222ddc32ee173ef1812d0638ce7fc7f75561a9ae179' // bar
            }
          ),
          new AccountModel(
            {
              userId: 'admin',
              userHash: 'fbbd5f9ac5423983deb5a7b00a27b0ddc193828e0c6a4dfe957ad1300d963a51' // admin
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
