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
  static toYYYYMMSlash(date:Date):string {
    return this.toYYYY(date) + '/' + this.toMM(date);
  }
  static toMMDD(date:Date):string {
    return this.toMM(date) + this.toDD(date);
  }
  static isWeekend(date:Date):Boolean {
    return date.getDay() == 0 || date.getDay() == 6;
  }
  static isPublicHoliday(date:Date):Boolean {
    return [].includes(this.toMMDD(date)); // TODO
  }
  static findThisMonthSheet(timeSheets:Array<TimeSheet>):TimeSheet {
    const todayYearMonth = this.toYYYYMMSlash(new Date());
    return timeSheets.find((timeSheet:TimeSheet) => {
      return timeSheet.yearMonth == todayYearMonth;
    });
  }
  static createThisMonthSheet():TimeSheet {
    const today = new Date();
    const lastDayOfThisMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

    const newDateRows = new Array<DateRow>();
    for (var i = 1; i <= lastDayOfThisMonth; i++) {
      const date = new Date(today.getFullYear(), today.getMonth(), i);
      if (this.isWeekend(date) || this.isPublicHoliday(date)) {
        newDateRows.push(new DateRow(i, null, null, null, null, null, null));
      } else {
        newDateRows.push(new DateRow(i, 9, 0, 18, 0, 1, 0));
      }
    }
    return new TimeSheet(TimeSheetUtils.toYYYYMMSlash(today), newDateRows);
  }
}
