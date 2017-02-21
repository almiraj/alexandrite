const LoginModel = require('../model/LoginModel');
const TimeSheetUsersModel = require('../model/TimeSheetUsersModel');

module.exports = function(req) {
  return Promise.all([
    new Promise((resolve, reject) => {
      LoginModel.update(
        {
          userId: 'foo'
        },
        {
          userHash: 'b65e5ef9b569432539dba222ddc32ee173ef1812d0638ce7fc7f75561a9ae179' // bar
        },
        { upsert: true },
        (err) => !err ? resolve() : reject(err)
      )
    }),
    new Promise((resolve, reject) => {
      LoginModel.update(
        {
          userId: 'foo2'
        },
        {
          userHash: 'b65e5ef9b569432539dba222ddc32ee173ef1812d0638ce7fc7f75561a9ae179' // bar
        },
        { upsert: true },
        (err) => !err ? resolve() : reject(err)
      )
    }),
    new Promise((resolve, reject) => {
      TimeSheetUsersModel.update(
        {
          userId: 'foo'
        },
        {
          timeSheet: [
            {
              month: '201611',
              timeRows: [ { date: '1', begin: '0900', end: '1800', interval: '0100' }, { date: '2', begin: '0900', end: '1800', interval: '0100' } ]
            },
            {
              month: '201612',
              timeRows: [ { date: '1', begin: '0930', end: '2100', interval: '0100' }, { date: '2', begin: '1230', end: '2400', interval: '0100' } ]
            }
          ]
        },
        { upsert: true },
        (err) => !err ? resolve() : reject(err)
      )
    }),
    new Promise((resolve, reject) => {
      TimeSheetUsersModel.update(
        {
          userId: 'foo2'
        },
        {
          timeSheet: [
            {
              month: '201611',
              timeRows: [ { date: '1', begin: '0900', end: '1800', interval: '0100' }, { date: '2', begin: '0900', end: '1800', interval: '0100' } ]
            },
            {
              month: '201612',
              timeRows: [ { date: '1', begin: '0930', end: '2100', interval: '0100' }, { date: '2', begin: '1230', end: '2400', interval: '0100' } ]
            }
          ]
        },
        { upsert: true },
        (err) => !err ? resolve() : reject(err)
      )
    })
  ]);
};
