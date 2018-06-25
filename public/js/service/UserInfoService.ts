import { Injectable } from '@angular/core';

import { UserInfo } from '../entity/UserInfo';
import { UserConfig } from '../entity/UserConfig';
import { HttpService } from '../service/HttpService';
import { TimeSheetUtils } from '../util/TimeSheetUtils';

const initUserConfig = new UserConfig(9, 0, 18, 0, 1, 0, 15);

@Injectable()
export class UserInfoService {
  userInfo:UserInfo

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
          this.userInfo.timeSheets.push(TimeSheetUtils.createThisMonthSheet());
        }
      });
  }
  updateUserInfo():Promise<void> {
    return this.httpService.post<void>('/ws/updateUserInfo', {
      userInfo: JSON.stringify(this.userInfo)
    });
  }
}
