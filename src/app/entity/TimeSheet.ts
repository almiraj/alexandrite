import * as moment from 'moment-timezone';
moment.tz.setDefault('UTC');

import { DateRow } from '../entity/DateRow';
import { UserConfig } from '../entity/UserConfig';

export class TimeSheet {
  yearMonth:string
  dateRows:Array<DateRow>

  static getTodayYearMonth():string {
    const now = new Date(); // ここはローカル年月を使う
    return String(now.getFullYear()) + '/' + ('0' + (now.getMonth() + 1)).slice(-2);
  }
  static createTodaySheet(userConfig:UserConfig):TimeSheet {
    const now = new Date(); // ここはローカル日付を使う
    const lastDayOfThisMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const newDateRows = new Array<DateRow>();
    for (let i = 1; i <= lastDayOfThisMonth; i++) {
      newDateRows.push(new DateRow(userConfig, moment([now.getFullYear(), now.getMonth(), i])));
    }
    const timeSheet = new TimeSheet();
    timeSheet.yearMonth = this.getTodayYearMonth();
    timeSheet.dateRows = newDateRows;
    return timeSheet;
  }
}
