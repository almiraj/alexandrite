import { Injectable } from '@angular/core';

import { AccountInfo } from '../entity/AccountInfo';
import { HttpService } from '../service/HttpService';

@Injectable()
export class AccountService {
  accountInfo:AccountInfo

  constructor(
    public httpService:HttpService
  ) {}

  login(userId:String, password:String):Promise<AccountInfo> {
    return this.httpService
      .post<AccountInfo>('/ws/login', { userId, password })
      .then(resBody => {
        this.accountInfo = resBody;
        return this.accountInfo;
      });
  }
  getAllAccounts():Promise<Array<AccountInfo>> {
    return this.httpService.post<Array<AccountInfo>>('/ws/getAllAccounts', {});
  }
  addAccount(userId:String):Promise<AccountInfo> {
    return this.httpService.post<AccountInfo>('/ws/addAccount', { userId });
  }
  deleteAccount(userId:String):Promise<void> {
    return this.httpService.post<void>('/ws/deleteAccount', { userId });
  }
}
