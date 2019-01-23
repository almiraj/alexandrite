import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {
  constructor(
    private http:HttpClient
  ) {}

  post<T>(url:string, params:Object):Promise<T> {
    return new Promise<T>((resolve, reject) => {
      if (!params['loginId']) {
        params['loginId'] = localStorage.getItem('loginId');
        params['loginToken'] = localStorage.getItem('loginToken');
      }
      this.http.post(url, params)
        .subscribe(
          (res:any) => {
            console.log('res : ' + JSON.stringify(res));
            return res.errorMessage ? reject(res.errorMessage) : resolve(res);
          },
          (res:any) => {
            console.log('errBody : ' + JSON.stringify(res));
            return reject(res.message);
          }
        );
    });
  }
}
