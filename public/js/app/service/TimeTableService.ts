import { Injectable } from '@angular/core';
import { Jsonp, URLSearchParams, Response } from '@angular/http';
import { TimeRow } from '../entity/TimeRow';

@Injectable()
export class TimeTableService {
  jsonp:Jsonp
  timeRows: Array<TimeRow>
  constructor(jsonp:Jsonp) {
    this.jsonp = jsonp;
    this.timeRows = [
      new TimeRow('1000', '1800', '0100'),
      new TimeRow('1000', '1830', '0100')
    ];
  }
  save():Promise<String> {
    return new Promise<String>((resolve, reject) => {
      let params = new URLSearchParams();
      params.set('callback', 'JSONP_CALLBACK');
      params.set('zipcode', '5630021');
      this.jsonp.get('http://zipcloud.ibsnet.co.jp/api/search', { search: params }).subscribe((response:Response) => {
        console.log(response.json().results[0].address2);
        return resolve(response.json().results[0].address2);
      });
    });
  }
}
