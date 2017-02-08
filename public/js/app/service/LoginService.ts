import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Response } from '@angular/http';

import { LoginInfo } from '../entity/LoginInfo';

@Injectable()
export class LoginService {
  http:Http
  loginInfo: LoginInfo = new LoginInfo()
  constructor(http:Http) {
    this.http = http;
  }
  login():LoginInfo {
    return new Promise<String>((resolve, reject) => {
      this.http.post('/ws/login', {
        userId: this.loginInfo.userId,
        password: this.loginInfo.password
      })
      .subscribe((res:Response) => {
        const resBody = res.json();
        console.log(JSON.stringify(resBody));
        if (resBody && resBody.userId) { // TODO BusinessErrorの扱いを整理する
          this.loginInfo = resBody;
          return resolve(this.loginInfo.userId);
        } else {
          return reject('Not Found');
        }
      });
    });
  }
}
