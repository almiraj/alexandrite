import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Response } from '@angular/http';
import { TimeRow } from '../entity/TimeRow';

@Injectable()
export class TimeTableService {
  http:Http
  timeRows: Array<TimeRow>
  constructor(http:Http) {
    this.http = http;
  }
  selectTimeSheet():Promise<Array<TimeRow>> {
    return new Promise<Array<TimeRow>>((resolve, reject) => {
      let params = new URLSearchParams();
      params.set('userId', 'foo');
      params.set('month', '201612');
      this.http.get('/ws/selectTimeSheet', { search: params }).subscribe((res:Response) => {
        const resBody = res.json();
        console.log(JSON.stringify(resBody));
        if (resBody) {
          this.timeRows = resBody.timeSheet[0].timeRows;
          return resolve();
        } else {
          return reject('Not Found');
        }
      });
    });
  }
  updateTimeSheet():Promise<String> {
    return new Promise<String>((resolve, reject) => {
      console.log(this.timeRows);
      this.http.post('/ws/updateTimeSheet', {
          userId: 'foo',
          month: '201612',
          timeRows: JSON.stringify(this.timeRows)
        })
        .subscribe((res:Response) => {
          const resBody = res.json();
          console.log(resBody);
          return (resBody.n) ? resolve() : reject('Not Matched');
        });
    });
  }
}
