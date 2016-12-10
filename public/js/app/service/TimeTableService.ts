import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Response } from '@angular/http';
import { TimeRow } from '../entity/TimeRow';

@Injectable()
export class TimeTableService {
  http:Http
  timeRows: Array<TimeRow>
  constructor(http:Http) {
    this.http = http;
    this.timeRows = [
      new TimeRow('1000', '1800', '0100'),
      new TimeRow('1000', '1830', '0100')
    ];
    this.get();
  }
  get():Promise<String> {
    return new Promise<String>((resolve, reject) => {
      let params = new URLSearchParams();
      params.set('userId', 'foo');
      params.set('month', '201612');
      this.http.get('/ws/selectTimeSheet', { search: params }).subscribe((res:Response) => {
        console.log('::res');
        console.log(JSON.stringify(res.json()));
        this.timeRows = res.json().timeSheet[0].timeTable;
        return resolve('');
      });
    });
  }
  save():Promise<String> {
    return new Promise<String>((resolve, reject) => {
      console.log(this.timeRows);
      resolve('ok');
    });
  }
}
