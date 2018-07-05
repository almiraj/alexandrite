import { isHoliday } from 'japanese-holidays';

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
  static isHoliday(date:Date):Boolean {
    return !!isHoliday(date);
  }
  static findThisMonthSheet(timeSheets:Array<TimeSheet>):TimeSheet {
    const todayYearMonth = this.toYYYYMMSlash(new Date());
    return timeSheets.find((timeSheet:TimeSheet) => {
      return timeSheet.yearMonth == todayYearMonth;
    });
  }
  static createThisMonthSheet():TimeSheet {
    const now = new Date();
    const lastDayOfThisMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

    const newDateRows = new Array<DateRow>();
    for (var i = 1; i <= lastDayOfThisMonth; i++) {
      const date = new Date(now.getFullYear(), now.getMonth(), i);
      if (this.isWeekend(date) || this.isHoliday(date)) {
        newDateRows.push(new DateRow(date));
      } else {
        const dateRow = new DateRow(date);
        dateRow.beginHour   = 9;
        dateRow.beginMinute = 0;
        dateRow.endHour     = 18;
        dateRow.endMinute   = 0;
        dateRow.breakHour   = 1;
        dateRow.breakMinute = 0;
        newDateRows.push(dateRow);
      }
    }
    const timeSheet = new TimeSheet();
    timeSheet.yearMonth = TimeSheetUtils.toYYYYMMSlash(now);
    timeSheet.dateRows = newDateRows;
    return timeSheet;
  }
  static allHours():Array<number> {
    const allHours:Array<number> = [];
    for (var hour = 0; hour < 24; hour++) {
      allHours.push(hour);
    }
    return allHours;
  }
  static allMinutes(minutesInterval:number):Array<number> {
    const allMinutes:Array<number> = [];
    for (var minute = 0; minute < 59; minute++) {
      if (minute % minutesInterval == 0) {
        allMinutes.push(minute);
      }
    }
    return allMinutes;
  }
}
