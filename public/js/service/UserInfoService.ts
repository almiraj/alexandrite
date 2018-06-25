import { Injectable } from '@angular/core';

import { TimeSheet } from '../entity/TimeSheet';
import { DateRow } from '../entity/DateRow';
import { UserInfo } from '../entity/UserInfo';
import { UserConfig } from '../entity/UserConfig';
import { HttpService } from '../service/HttpService';
import { TimeSheetUtils } from '../util/TimeSheetUtils';

const initUserConfig = new UserConfig(9, 0, 18, 0, 1, 0, 15);

@Injectable()
export class UserInfoService {
  constructor(
    public httpService:HttpService
  ) {}

  selectUserInfo(userId:string):Promise<UserInfo> {
    return this.httpService.post<UserInfo>('/ws/selectUserInfo', { userId })
      .then(resBody => {
        var userInfo:UserInfo = resBody;
        if (!userInfo.userId) {
          userInfo = new UserInfo(userId, initUserConfig, new Array<TimeSheet>());
        }
        if (!TimeSheetUtils.findThisMonthSheet(userInfo.timeSheets)) {
          userInfo.timeSheets.push(TimeSheetUtils.createThisMonthSheet());
        }
        return userInfo;
      });
  }
  updateUserInfo(userInfo:UserInfo):Promise<void> {
    return this.httpService.post<void>('/ws/updateUserInfo', {
      userInfo: JSON.stringify(userInfo)
    });
  }
}
