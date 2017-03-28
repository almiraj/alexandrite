import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Response } from '@angular/http';

import { AccountInfo } from '../entity/AccountInfo';
import { HttpUtils } from '../util/HttpUtils';

@Injectable()
export class SetupService {
  constructor(
    public http:Http
  ) {}

  setup():Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http
        .post('/ws/setup', {
        })
        .subscribe((res:Response) => {
          HttpUtils.handleResponse(res).then(() => resolve()).catch(e => reject(e));
        });
    });
  }
}
