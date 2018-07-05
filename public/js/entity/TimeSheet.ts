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
      const dateRow = new DateRow(new Date(now.getFullYear(), now.getMonth(), i));
      if (!dateRow.isSaturday && !dateRow.isSunday && !dateRow.isHoliday) {
        dateRow.beginHour   = 9;
        dateRow.beginMinute = 0;
        dateRow.endHour     = 18;
        dateRow.endMinute   = 0;
        dateRow.breakHour   = 1;
        dateRow.breakMinute = 0;
      }
      newDateRows.push(dateRow);
    }
    const timeSheet = new TimeSheet();
    timeSheet.yearMonth = this.getTodayYearMonth();
    timeSheet.dateRows = newDateRows;
    return timeSheet;
  }
}
