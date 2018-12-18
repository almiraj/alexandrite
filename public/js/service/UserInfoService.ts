import { Injectable } from '@angular/core';

import { UserInfo } from '../entity/UserInfo';
import { UserConfig } from '../entity/UserConfig';
import { DateRow } from '../entity/DateRow';
import { HttpService } from '../service/HttpService';

const initUserConfig = new UserConfig();
initUserConfig.beginHour        = 9;
initUserConfig.beginMinute      = 0;
initUserConfig.endHour          = 18;
initUserConfig.endMinute        = 0;
initUserConfig.lunchBeginHour   = 12;
initUserConfig.lunchBeginMinute = 0;
initUserConfig.lunchEndHour     = 13;
initUserConfig.lunchEndMinute   = 0;
initUserConfig.minutesInterval  = 15;

@Injectable()
export class UserInfoService {
  userInfo:UserInfo
  hourSelections:Array<number>
  minuteSelections:Array<number>

  constructor(
    private httpService:HttpService
  ) {}

  selectUserInfo(userId:string):Promise<void> {
    return this.httpService.post<UserInfo>('/ws/selectUserInfo', { userId })
      .then(resBody => {
        this.userInfo = resBody;
        if (!this.userInfo.userId) {
          // まだ保存したことのないアカウントの場合、クライアント側で情報を生成する
          this.userInfo = new UserInfo();
          this.userInfo.userId = userId;
          this.userInfo.userConfig = initUserConfig;
          this.userInfo.timeSheets = [];
        } else {
          // 保存したことのあるアカウントの場合、取得したString型の日付をDate型にパースし、さらにDateRow型にパースする
          this.userInfo.timeSheets.forEach(timeSheet => {
            timeSheet.dateRows.map((dateRow, i, arr) => {
              dateRow.date = new Date(dateRow.date.toString());
              arr[i] = $.extend(true, new DateRow(this.userInfo.userConfig, dateRow.date), dateRow);
            });
          });
        }
      });
  }
  updateUserInfo():Promise<void> {
    return this.httpService.post<void>('/ws/updateUserInfo', this.userInfo);
  }
  reloadHourMinuteSelections():void {
    this.hourSelections = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    this.minuteSelections = [];
    const minutes = [];
    for (var minute = 0; minute < 59; minute++) {
      if (minute % this.userInfo.userConfig.minutesInterval == 0) {
        this.minuteSelections.push(minute);
      }
    }
  }
}
