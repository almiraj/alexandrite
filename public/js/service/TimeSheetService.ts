import { Injectable } from '@angular/core';

import { TimeSheet } from '../entity/TimeSheet';
import { DateRow } from '../entity/DateRow';
import { HttpService } from '../service/HttpService';

@Injectable()
export class TimeSheetService {
  constructor(
    public httpService:HttpService
  ) {}

  selectTimeSheet(userId:String, month:String):Promise<Array<DateRow>> {
    return this.httpService.post<Array<DateRow>>('/ws/selectTimeSheet', { userId, month });
  }
  selectAllTimeSheets(userId:String):Promise<Array<TimeSheet>> {
    return this.httpService.post<Array<TimeSheet>>('/ws/selectAllTimeSheets', { userId });
  }
  updateTimeSheet(userId:String, timeSheet:TimeSheet):Promise<void> {
    return this.httpService.post<void>('/ws/updateTimeSheet', {
      userId,
      timeSheet: JSON.stringify(timeSheet)
    });
  }
}
