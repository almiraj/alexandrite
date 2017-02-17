import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Response } from '@angular/http';

import { TimeRow } from '../entity/TimeRow';

@Injectable()
export class TimeTableService {
  constructor(
    public http:Http
  ) {}

  selectTimeSheet(userId:String, month:String):Promise<Array<TimeRow>> {
    return new Promise<Array<TimeRow>>((resolve, reject) => {
      let params = new URLSearchParams();
      params.set('userId', userId);
      params.set('month', month);
      this.http
        .get('/ws/selectTimeSheet', { search: params }).subscribe((res:Response) => {
          const resBody = res.json();
          console.log(JSON.stringify(resBody));
          if (resBody) {
            return resolve(resBody.timeSheet[0].timeRows);
          } else {
            return reject('Not Found');
          }
        });
    });
  }
  updateTimeSheet(userId:String, month:String, timeRows:Array<TimeRow>):Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http
        .post('/ws/updateTimeSheet', {
          userId: userId,
          month: month,
          timeRows: JSON.stringify(timeRows)
        })
        .subscribe((res:Response) => {
          const resBody = res.json();
          console.log('resBody');
          console.log(resBody);
          if (resBody.error) {
            return reject(resBody.error);
          }
          return resolve();
        });
    });
  }
}
