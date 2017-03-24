import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Response } from '@angular/http';

import { AccountInfo } from '../entity/AccountInfo';
import { HttpUtils } from '../util/HttpUtils';

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
          HttpUtils.handleResponse(res)
            .then(resBody => {
              this.accountInfo = resBody;
              return resolve(this.accountInfo.userId);
            })
            .catch(e => reject(e));
        });
    });
  }

  getAllAccounts():Promise<Array<AccountInfo>> {
    return new Promise<Array<AccountInfo>>((resolve, reject) => {
      this.http
        .post('/ws/getAllAccounts', {
        })
        .subscribe((res:Response) => {
          HttpUtils.handleResponse(res).then(resBody => resolve(resBody)).catch(e => reject(e));
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
          HttpUtils.handleResponse(res).then(resBody => resolve(resBody)).catch(e => reject(e));
        });
    });
  }

  deleteAccount(userId:String):Promise<AccountInfo> {
    return new Promise<AccountInfo>((resolve, reject) => {
      this.http
        .post('/ws/deleteAccount', {
          userId: userId
        })
        .subscribe((res:Response) => {
          HttpUtils.handleResponse(res).then(resBody => resolve(resBody)).catch(e => reject(e));
        });
    });
  }

}
