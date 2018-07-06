import { DateRow } from '../entity/DateRow';

export class TimeSheet {
  yearMonth:string
  dateRows:Array<DateRow>

  static getTodayYearMonth():string {
    const now = new Date();
    return String(now.getFullYear()) + '/' + ('0' + (now.getMonth() + 1)).slice(-2);
  }
  static createTodaySheet():TimeSheet {
    const now = new Date();
    const lastDayOfThisMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const newDateRows = new Array<DateRow>();
    for (var i = 1; i <= lastDayOfThisMonth; i++) {
      newDateRows.push(new DateRow(new Date(now.getFullYear(), now.getMonth(), i)));
    }
    const timeSheet = new TimeSheet();
    timeSheet.yearMonth = this.getTodayYearMonth();
    timeSheet.dateRows = newDateRows;
    return timeSheet;
  }
}
