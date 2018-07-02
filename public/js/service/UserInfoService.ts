import { Injectable } from '@angular/core';

import { UserInfo } from '../entity/UserInfo';
import { UserConfig } from '../entity/UserConfig';
import { HttpService } from '../service/HttpService';
import { TimeSheetUtils } from '../util/TimeSheetUtils';

const initUserConfig = new UserConfig(9, 0, 18, 0, 1, 0, 15);

@Injectable()
export class UserInfoService {
  userInfo:UserInfo
  hourSelections:Array<number>
  minuteSelections:Array<number>

  constructor(
    public httpService:HttpService
  ) {}

  selectUserInfo(userId:string):Promise<void> {
    return this.httpService.post<UserInfo>('/ws/selectUserInfo', { userId })
      .then(resBody => {
        this.userInfo = resBody;
        if (!this.userInfo.userId) {
          // まだ保存したことのないアカウントの場合、クライアント側で情報を生成する
          this.userInfo = new UserInfo(userId, initUserConfig, []);
        } else {
          // 保存したことのあるアカウントの場合、取得したString型の日付をDate型にパースする
          this.userInfo.timeSheets.forEach(timeSheet => {
            timeSheet.dateRows.forEach(dateRow => {
              dateRow.date = new Date(dateRow.date.toString());
            });
          });
        }
        if (!TimeSheetUtils.findThisMonthSheet(this.userInfo.timeSheets)) {
          // 今月の勤務表が取得できなかった場合、先頭に今月の情報を追加する
          this.userInfo.timeSheets.unshift(TimeSheetUtils.createThisMonthSheet());
        }
        // 「分刻み間隔」を元に決定される時間と分のセレクトボックス情報を更新する
        this.reloadHourMinuteSelections();
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
