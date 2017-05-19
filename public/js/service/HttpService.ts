import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

@Injectable()
export class HttpService {
  constructor(
    public http:Http
  ) {}

  post<T>(url:string, params:Object):Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.http
        .post(url, params)
        .subscribe(
          (res:Response) => {
            const resBody = res.json();
            console.log('resBody : ' + JSON.stringify(resBody));
            return (resBody.errorMessage) ? reject(resBody.errorMessage) : resolve(resBody);
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
