import { Response } from '@angular/http';

export class HttpUtils {
  static handleResponse(res:Response):Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const resBody = res.json();
      console.log('resBody : ' + JSON.stringify(resBody));
      return (resBody.errorMessage) ? reject(resBody.errorMessage) : resolve(resBody);
    });
  }
}