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
          this.userInfo = new UserInfo(userId, initUserConfig, []);
        }
        if (!TimeSheetUtils.findThisMonthSheet(this.userInfo.timeSheets)) {
          this.userInfo.timeSheets.unshift(TimeSheetUtils.createThisMonthSheet());
        }
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
