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
  static toYYYYMM(date:Date):String {
    return this.toYYYY(date) + this.toMM(date);
  }
  static toMMDD(date:Date):String {
    return this.toMM(date) + this.toDD(date);
  }
  static toMinutesFromHHMM(hhmm:String):number {
    if (hhmm && /(\d{1,2})(\d{2})/.test(String(hhmm))) {
      const hour = Number(RegExp.$1);
      const minute = Number(RegExp.$2);
      return (hour * 60) + minute;
    }
    return NaN;
  }
  static toHHMMFromMinutes(minutes:number) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return ('0000' + h).slice(-2) + ('0000' + m).slice(-2);
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

    const dateRows = new Array<DateRow>();
    for (var i = 1; i <= lastDayOfThisMonth; i++) {
      const dataRow = new DateRow();
      dataRow.date = String(i);

      const date = new Date(today.getFullYear(), today.getMonth(), i);
      if (!this.isWeekend(date) && !this.isPublicHoliday(date)) {
        dataRow.begin = '0900';
        dataRow.end = '1800';
      }

      dateRows.push(dataRow);
    }

    const timeSheet = new TimeSheet();
    timeSheet.month = TimeSheetUtils.toYYYYMM(today);
    timeSheet.dateRows = dateRows;
    return timeSheet;
  }
}
