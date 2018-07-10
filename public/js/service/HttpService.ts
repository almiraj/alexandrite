import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class HttpService {
  static NO_TOKEN_ERROR:string = 'ログインしていません'

  constructor(
    private http:Http
  ) {}

  post<T>(url:string, params:Object):Promise<T> {
    return new Promise<T>((resolve, reject) => {
      if (!params['loginId']) {
        params['loginId'] = localStorage.getItem('loginId');
        params['loginToken'] = localStorage.getItem('loginToken');
      }
      this.http.post(url, params)
        .subscribe(
          (res:Response) => {
            const resBody = res.json();
            console.log('resBody : ' + JSON.stringify(resBody));
            if (resBody.errorMessage) {
              if (resBody.errorMessage == HttpService.NO_TOKEN_ERROR) {
                localStorage.removeItem('loginId');
                localStorage.removeItem('loginToken');
              }
              return reject(resBody.errorMessage);
            } else {
              return resolve(resBody);
            }
          },
          (res:Response) => {
            const errBody = String(res);
            console.log('errBody : ' + errBody);
            reject(errBody);
          }
        );
    });
  }
}
