import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Response } from '@angular/http';

import { LoginInfo } from '../entity/LoginInfo';

@Injectable()
export class LoginService {
  loginInfo: LoginInfo

  constructor(
    public http:Http
  ) {}

  login(userId:String, password:String):Promise<String> {
    return new Promise<String>((resolve, reject) => {
      this.http
        .post('/ws/login', {
          userId: userId,
          password: password
        })
        .subscribe((res:Response) => {
          const resBody = res.json();
          console.log('resBody');
          console.log(resBody);
          if (resBody.error) {
            return reject(resBody.error);
          }
          this.loginInfo = resBody;
          return resolve(this.loginInfo.userId);
        });
    });
  }
}
