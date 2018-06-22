import { Injectable } from '@angular/core';

import { LoginInfo } from '../entity/LoginInfo';
import { HttpService } from '../service/HttpService';

@Injectable()
export class LoginService {
  constructor(
    public httpService:HttpService,
    public loginInfo:LoginInfo
  ) {}

  login(loginId:String, loginPassword:String):Promise<LoginInfo> {
    return this.httpService
      .post<LoginInfo>('/ws/login', { loginId, loginPassword })
      .then(resBody => Object.assign(this.loginInfo, resBody));
  }
  checkToken(loginId:String, loginToken:String):Promise<LoginInfo> {
    return this.httpService
      .post<LoginInfo>('/ws/checkToken', { loginId, loginToken })
      .then(resBody => {
        this.loginInfo.loginId = loginId;
        this.loginInfo.loginToken = loginToken;
      };
  }
}
