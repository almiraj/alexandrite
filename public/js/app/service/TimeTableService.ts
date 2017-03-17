import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Response } from '@angular/http';

import { TimeSheet } from '../entity/TimeSheet';
import { TimeRow } from '../entity/TimeRow';

@Injectable()
export class TimeTableService {
  constructor(
    public http:Http
  ) {}

  selectTimeSheet(userId:String, month:String):Promise<Array<TimeRow>> {
    return new Promise<Array<TimeRow>>((resolve, reject) => {
      this.http
        .post('/ws/selectTimeSheet', {
          userId: userId,
          month: month
        })
        .subscribe((res:Response) => {
          const resBody = res.json();
          console.log('resBody');
          console.log(JSON.stringify(resBody));
          if (resBody.error) {
            return reject(resBody.error);
          }
          return resolve(resBody);
        });
    });
  }
  selectAllTimeSheets(userId:String):Promise<Array<TimeSheet>> {
    return new Promise<Array<TimeSheet>>((resolve, reject) => {
      this.http
        .post('/ws/selectAllTimeSheets', {
          userId: userId
        })
        .subscribe((res:Response) => {
          const resBody = res.json();
          console.log('resBody');
          console.log(JSON.stringify(resBody));
          if (resBody.error) {
            return reject(resBody.error);
          }
          return resolve(resBody);
        });
    });
  }
  updateTimeSheet(userId:String, timeSheet:TimeSheet):Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.http
        .post('/ws/updateTimeSheet', {
          userId: userId,
          timeSheet: JSON.stringify(timeSheet)
        })
        .subscribe((res:Response) => {
          const resBody = res.json();
          console.log('resBody');
          console.log(JSON.stringify(resBody));
          if (resBody.error) {
            return reject(resBody.error);
          }
          return resolve();
        });
    });
  }
}
