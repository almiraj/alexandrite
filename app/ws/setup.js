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
                  yearMonth: '2016/11',
                  dateRows: [
                    { date: 1, beginHour: 10, beginMinute: 0, endHour: 18, endMinute: 30, intervalHour: 1, intervalMinute: 0 },
                    { date: 2, beginHour: 10, beginMinute: 0, endHour: 21, endMinute: 0, intervalHour: 1, intervalMinute: 0 },
                    { date: 3 },
                    { date: 4 },
                    { date: 5 },
                    { date: 6 },
                    { date: 7, beginHour: 10, beginMinute: 0, endHour: 0, endMinute: 30, intervalHour: 1, intervalMinute: 0 },
                    { date: 8, beginHour: 10, beginMinute: 0, endHour: 18, endMinute: 30, intervalHour: 1, intervalMinute: 0 },
                    { date: 9, beginHour: 10, beginMinute: 0, endHour: 18, endMinute: 30, intervalHour: 1, intervalMinute: 0 },
                    { date: 10, beginHour: 10, beginMinute: 0, endHour: 18, endMinute: 30, intervalHour: 1, intervalMinute: 0 },
                    { date: 11, beginHour: 10, beginMinute: 0, endHour: 18, endMinute: 30, intervalHour: 1, intervalMinute: 0 },
                    { date: 12 },
                    { date: 13 },
                    { date: 14, beginHour: 10, beginMinute: 0, endHour: 18, endMinute: 30, intervalHour: 1, intervalMinute: 0 },
                    { date: 15, beginHour: 10, beginMinute: 0, endHour: 18, endMinute: 30, intervalHour: 1, intervalMinute: 0 },
                    { date: 16, beginHour: 10, beginMinute: 0, endHour: 18, endMinute: 30, intervalHour: 1, intervalMinute: 0 },
                    { date: 17, beginHour: 10, beginMinute: 0, endHour: 18, endMinute: 30, intervalHour: 1, intervalMinute: 0 },
                    { date: 18, beginHour: 10, beginMinute: 0, endHour: 18, endMinute: 30, intervalHour: 1, intervalMinute: 0 },
                    { date: 19 },
                    { date: 20 },
                    { date: 21, beginHour: 10, beginMinute: 0, endHour: 18, endMinute: 30, intervalHour: 1, intervalMinute: 0 },
                    { date: 22, beginHour: 10, beginMinute: 0, endHour: 18, endMinute: 30, intervalHour: 1, intervalMinute: 0 },
                    { date: 23 },
                    { date: 24, beginHour: 10, beginMinute: 0, endHour: 18, endMinute: 30, intervalHour: 1, intervalMinute: 0 },
                    { date: 25, beginHour: 10, beginMinute: 0, endHour: 18, endMinute: 30, intervalHour: 1, intervalMinute: 0 },
                    { date: 26 },
                    { date: 27 },
                    { date: 28, beginHour: 10, beginMinute: 0, endHour: 18, endMinute: 30, intervalHour: 1, intervalMinute: 0 },
                    { date: 29, beginHour: 10, beginMinute: 0, endHour: 18, endMinute: 30, intervalHour: 1, intervalMinute: 0 },
                    { date: 30, beginHour: 10, beginMinute: 0, endHour: 18, endMinute: 30, intervalHour: 1, intervalMinute: 0 }
                  ]
                },
                {
                  yearMonth: '2016/12',
                  dateRows: [
                    { date: 1, beginHour: 10, beginMinute: 0, endHour: 21, endMinute: 0, intervalHour: 1, intervalMinute: 0 },
                    { date: 2, beginHour: 10, beginMinute: 0, endHour: 18, endMinute: 30, intervalHour: 1, intervalMinute: 0 },
                    { date: 3 },
                    { date: 4 },
                    { date: 5, beginHour: 10, beginMinute: 0, endHour: 18, endMinute: 30, intervalHour: 1, intervalMinute: 0 },
                    { date: 6, beginHour: 10, beginMinute: 0, endHour: 18, endMinute: 30, intervalHour: 1, intervalMinute: 0 },
                    { date: 7, beginHour: 10, beginMinute: 0, endHour: 18, endMinute: 30, intervalHour: 1, intervalMinute: 0 },
                    { date: 8, beginHour: 10, beginMinute: 0, endHour: 18, endMinute: 30, intervalHour: 1, intervalMinute: 0 },
                    { date: 9, beginHour: 10, beginMinute: 0, endHour: 18, endMinute: 30, intervalHour: 1, intervalMinute: 0 },
                    { date: 10 },
                    { date: 11 },
                    { date: 12, beginHour: 10, beginMinute: 0, endHour: 18, endMinute: 30, intervalHour: 1, intervalMinute: 0 },
                    { date: 13, beginHour: 10, beginMinute: 0, endHour: 18, endMinute: 30, intervalHour: 1, intervalMinute: 0 },
                    { date: 14, beginHour: 10, beginMinute: 0, endHour: 18, endMinute: 30, intervalHour: 1, intervalMinute: 0 },
                    { date: 15, beginHour: 10, beginMinute: 0, endHour: 18, endMinute: 30, intervalHour: 1, intervalMinute: 0 },
                    { date: 16, beginHour: 10, beginMinute: 0, endHour: 18, endMinute: 30, intervalHour: 1, intervalMinute: 0 },
                    { date: 17 },
                    { date: 18 },
                    { date: 19, beginHour: 10, beginMinute: 0, endHour: 18, endMinute: 30, intervalHour: 1, intervalMinute: 0 },
                    { date: 20, beginHour: 10, beginMinute: 0, endHour: 18, endMinute: 30, intervalHour: 1, intervalMinute: 0 },
                    { date: 21, beginHour: 10, beginMinute: 0, endHour: 18, endMinute: 30, intervalHour: 1, intervalMinute: 0 },
                    { date: 22, beginHour: 10, beginMinute: 0, endHour: 18, endMinute: 30, intervalHour: 1, intervalMinute: 0 },
                    { date: 23 },
                    { date: 24 },
                    { date: 25 },
                    { date: 26, beginHour: 10, beginMinute: 0, endHour: 18, endMinute: 30, intervalHour: 1, intervalMinute: 0 },
                    { date: 27, beginHour: 10, beginMinute: 0, endHour: 18, endMinute: 30, intervalHour: 1, intervalMinute: 0 },
                    { date: 28, beginHour: 10, beginMinute: 0, endHour: 18, endMinute: 30, intervalHour: 1, intervalMinute: 0 },
                    { date: 29, beginHour: 10, beginMinute: 0, endHour: 18, endMinute: 30, intervalHour: 1, intervalMinute: 0 },
                    { date: 30 },
                    { date: 31 }
                  ]
                }
              ]
            }
          )
        ], (err) => !err ? resolve() : reject(err));
      });
    });
};
