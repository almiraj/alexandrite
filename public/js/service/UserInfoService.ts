import { Injectable } from '@angular/core';

import { TimeSheet } from '../entity/TimeSheet';
import { DateRow } from '../entity/DateRow';
import { HttpService } from '../service/HttpService';

@Injectable()
export class UserInfoService {
  constructor(
    public httpService:HttpService
  ) {}

  selectUserInfo(userId:String):Promise<UserInfo> {
    return this.httpService.post<UserInfo>('/ws/selectUserInfo', { userId });
  }
  updateUserInfo(userInfo:UserInfo):Promise<void> {
    return this.httpService.post<void>('/ws/updateUserInfo', {
      userInfo: JSON.stringify(userInfo)
    });
  }
}
