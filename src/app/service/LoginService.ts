import { Injectable } from '@angular/core';

import { LoginInfo } from '../entity/LoginInfo';
import { HttpService } from '../service/HttpService';

@Injectable()
export class LoginService {
  constructor(
    private httpService:HttpService
  ) {}

  login(loginId:string, loginPassword:string, loginedToken?:string):Promise<LoginInfo> {
    return this.httpService
      .post<LoginInfo>('/ws/login', { loginId, loginPassword, loginedToken })
      .then(resBody => {
        const loginInfo:LoginInfo = $.extend(true, new LoginInfo(), resBody);
        loginInfo.saveToLocal();
        return loginInfo;
      });
  }
}
