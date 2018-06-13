import { TimeSheet } from '../entity/TimeSheet';
import { DateRow } from '../entity/DateRow';

export class TimeSheetUtils {
  static toYYYY(date:Date):string {
    return String(date.getFullYear());
  }
  static toMM(date:Date):string {
    return ('0' + (date.getMonth() + 1)).slice(-2);
  }
  static toDD(date:Date):string {
    return ('0' + date.getDate()).slice(-2);
  }
  static toYYYYMM(date:Date):string {
    return this.toYYYY(date) + this.toMM(date);
  }
  static toMMDD(date:Date):string {
    return this.toMM(date) + this.toDD(date);
  }
  static calcMinutes(hhmm:string):number {
    if (hhmm && /(\d{1,2})(\d{2})/.test(String(hhmm))) {
      const hour = Number(RegExp.$1);
      const minute = Number(RegExp.$2);
      return (hour * 60) + minute;
    }
    return null;
  }
  static isWeekend(date:Date):Boolean {
    return date.getDay() == 0 || date.getDay() == 6;
  }
  static isPublicHoliday(date:Date):Boolean {
    return [].includes(this.toMMDD(date)); // TODO
  }
  static findThisMonthSheet(timeSheets:Array<TimeSheet>):TimeSheet {
    const todayYYYYMM = this.toYYYYMM(new Date());
    return timeSheets.find((timeSheet:TimeSheet) => {
      return timeSheet.month == todayYYYYMM;
    });
  }
  static createThisMonthSheet():TimeSheet {
    const today = new Date();
    const lastDayOfThisMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

    const newDateRows = new Array<DateRow>();
    for (var i = 1; i <= lastDayOfThisMonth; i++) {
      const date = new Date(today.getFullYear(), today.getMonth(), i);
      if (this.isWeekend(date) || this.isPublicHoliday(date)) {
        newDateRows.push(new DateRow(String(i), '', '', '', ''));
      } else {
        newDateRows.push(new DateRow(String(i), '0900', '1800', '0100', '0800'));
      }
    }
    return new TimeSheet(TimeSheetUtils.toYYYYMM(today), newDateRows);
  }
}
