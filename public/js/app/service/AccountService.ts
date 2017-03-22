import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Response } from '@angular/http';

import { AccountInfo } from '../entity/AccountInfo';

@Injectable()
export class AccountService {
  accountInfo:AccountInfo

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
          this.accountInfo = resBody;
          return resolve(this.accountInfo.userId);
        });
    });
  }

  getAllAccounts():Promise<Array<AccountInfo>> {
    return new Promise<Array<AccountInfo>>((resolve, reject) => {
      this.http
        .post('/ws/getAllAccounts', {
        })
        .subscribe((res:Response) => {
          const resBody = res.json();
          console.log('resBody');
          console.log(resBody);
          if (resBody.error) {
            return reject(resBody.error);
          }
          return resolve(resBody);
        });
    });
  }

  addAccount(userId:String):Promise<AccountInfo> {
    return new Promise<AccountInfo>((resolve, reject) => {
      this.http
        .post('/ws/addAccount', {
          userId: userId
        })
        .subscribe((res:Response) => {
          const resBody = res.json();
          console.log('resBody');
          console.log(resBody);
          if (resBody.error) {
            return reject(resBody.error);
          }
          return resolve(resBody);
        });
    });
  }
}
