import { Injectable } from '@angular/core';

import { LoginInfo } from '../entity/LoginInfo';
import { HttpService } from '../service/HttpService';

@Injectable()
export class LoginService {
  constructor(
    public httpService:HttpService
  ) {}

  login(loginId:string, loginPassword:string):Promise<void> {
    return this.httpService
      .post<LoginInfo>('/ws/login', { loginId, loginPassword })
      .then(resBody => {
        const loginInfo:LoginInfo = resBody;
        localStorage.setItem('loginId', loginInfo.loginId);
        localStorage.setItem('loginToken', loginInfo.loginToken);
      });
  }
  checkToken():Promise<void> {
    const loginId = localStorage.getItem('loginId');
    const loginToken = localStorage.getItem('loginToken');
    return this.httpService.post<void>('/ws/checkToken', { loginId, loginToken });
  }
}
