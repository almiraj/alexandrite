import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Response } from '@angular/http';

import { TimeSheet } from '../entity/TimeSheet';
import { DateRow } from '../entity/DateRow';
import { HttpUtils } from '../util/HttpUtils';

@Injectable()
export class TimeSheetService {
  constructor(
    public http:Http
  ) {}

  selectTimeSheet(userId:String, month:String):Promise<Array<DateRow>> {
    return new Promise<Array<DateRow>>((resolve, reject) => {
      this.http
        .post('/ws/selectTimeSheet', {
          userId: userId,
          month: month
        })
        .subscribe((res:Response) => {
          HttpUtils.handleResponse(res).then(resBody => resolve(resBody)).catch(e => reject(e));
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
          HttpUtils.handleResponse(res).then(resBody => resolve(resBody)).catch(e => reject(e));
        });
    });
  }
  updateTimeSheet(userId:String, timeSheet:TimeSheet):Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http
        .post('/ws/updateTimeSheet', {
          userId: userId,
          timeSheet: JSON.stringify(timeSheet)
        })
        .subscribe((res:Response) => {
          HttpUtils.handleResponse(res).then(() => resolve()).catch(e => reject(e));
        });
    });
  }
}
