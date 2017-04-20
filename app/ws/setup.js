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
                  dateRows: [
                    { date: '1', begin: '1000', end: '1800', interval: '0100' },
                    { date: '2', begin: '1000', end: '2100', interval: '0100' },
                    { date: '3', begin: '', end: '', interval: '' },
                    { date: '4', begin: '', end: '', interval: '' },
                    { date: '5', begin: '', end: '', interval: '' },
                    { date: '6', begin: '', end: '', interval: '' },
                    { date: '7', begin: '1000', end: '1800', interval: '0100' },
                    { date: '8', begin: '1000', end: '1800', interval: '0100' },
                    { date: '9', begin: '1000', end: '1800', interval: '0100' },
                    { date: '10', begin: '1000', end: '1800', interval: '0100' },
                    { date: '11', begin: '1000', end: '1800', interval: '0100' },
                    { date: '12', begin: '', end: '', interval: '' },
                    { date: '13', begin: '', end: '', interval: '' },
                    { date: '14', begin: '1000', end: '1800', interval: '0100' },
                    { date: '15', begin: '1000', end: '1800', interval: '0100' },
                    { date: '16', begin: '1000', end: '1800', interval: '0100' },
                    { date: '17', begin: '1000', end: '1800', interval: '0100' },
                    { date: '18', begin: '1000', end: '1800', interval: '0100' },
                    { date: '19', begin: '', end: '', interval: '' },
                    { date: '20', begin: '', end: '', interval: '' },
                    { date: '21', begin: '1000', end: '1800', interval: '0100' },
                    { date: '22', begin: '1000', end: '1800', interval: '0100' },
                    { date: '23', begin: '', end: '', interval: '' },
                    { date: '24', begin: '1000', end: '1800', interval: '0100' },
                    { date: '25', begin: '1000', end: '1800', interval: '0100' },
                    { date: '26', begin: '', end: '', interval: '' },
                    { date: '27', begin: '', end: '', interval: '' },
                    { date: '28', begin: '1000', end: '1800', interval: '0100' },
                    { date: '29', begin: '1000', end: '1800', interval: '0100' },
                    { date: '30', begin: '1000', end: '1800', interval: '0100' }
                  ]
                },
                {
                  month: '201612',
                  dateRows: [
                    { date: '1', begin: '1000', end: '2100', interval: '0100' },
                    { date: '2', begin: '1000', end: '2400', interval: '0100' },
                    { date: '3', begin: '', end: '', interval: '' },
                    { date: '4', begin: '', end: '', interval: '' },
                    { date: '5', begin: '1000', end: '1800', interval: '0100' },
                    { date: '6', begin: '1000', end: '1800', interval: '0100' },
                    { date: '7', begin: '1000', end: '1800', interval: '0100' },
                    { date: '8', begin: '1000', end: '1800', interval: '0100' },
                    { date: '9', begin: '1000', end: '1800', interval: '0100' },
                    { date: '10', begin: '', end: '', interval: '' },
                    { date: '11', begin: '', end: '', interval: '' },
                    { date: '12', begin: '1000', end: '1800', interval: '0100' },
                    { date: '13', begin: '1000', end: '1800', interval: '0100' },
                    { date: '14', begin: '1000', end: '1800', interval: '0100' },
                    { date: '15', begin: '1000', end: '1800', interval: '0100' },
                    { date: '16', begin: '1000', end: '1800', interval: '0100' },
                    { date: '17', begin: '', end: '', interval: '' },
                    { date: '18', begin: '', end: '', interval: '' },
                    { date: '19', begin: '1000', end: '1800', interval: '0100' },
                    { date: '20', begin: '1000', end: '1800', interval: '0100' },
                    { date: '21', begin: '1000', end: '1800', interval: '0100' },
                    { date: '22', begin: '1000', end: '1800', interval: '0100' },
                    { date: '23', begin: '', end: '', interval: '' },
                    { date: '24', begin: '', end: '', interval: '' },
                    { date: '25', begin: '', end: '', interval: '' },
                    { date: '26', begin: '1000', end: '1800', interval: '0100' },
                    { date: '27', begin: '1000', end: '1800', interval: '0100' },
                    { date: '28', begin: '1000', end: '1800', interval: '0100' },
                    { date: '29', begin: '1000', end: '1800', interval: '0100' },
                    { date: '30', begin: '', end: '', interval: '' },
                    { date: '31', begin: '', end: '', interval: '' }
                  ]
                }
              ]
            }
          )
        ], (err) => !err ? resolve() : reject(err));
      });
    });
};
