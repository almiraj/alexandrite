import { isHoliday } from 'japanese-holidays';

export class DateRow {
  beginHour:number
  beginMinute:number
  endHour:number
  endMinute:number
  breakHour:number
  breakMinute:number

  constructor(
    public date:Date
  ) {}

  get dayOfJapan():string {
    return ['日', '月', '火', '水', '木', '金', '土'][this.date.getDay()];
  }
  get isToday():boolean {
    const now = new Date();
    return this.date.getFullYear() == now.getFullYear()
      && this.date.getMonth() == now.getMonth()
      && this.date.getDate() == now.getDate();
  }
  get isSaturday():boolean {
    return this.date.getDay() == 6;
  }
  get isSunday():boolean {
    return this.date.getDay() == 0;
  }
  get isHoliday():boolean {
    return !!isHoliday(this.date);
  }
  get summary():string {
    const end = this.endHour * 60 + Number(this.endMinute);
    const begin = this.beginHour * 60 + Number(this.beginMinute);
    const breakTime = this.breakHour * 60 + Number(this.breakMinute);
    if (!end || !begin || !breakTime) {
      return '';
    }
    const sum = end - begin - breakTime;
    if (sum <= 0) {
      return '';
    }
    const sumHour = Math.floor(sum / 60);
    const sumMinute = Math.floor(sum % 60);
    return ('0000' + sumHour).slice(-2) + ':' + ('0000' + sumMinute).slice(-2);
  }
  get isNotDefaultInterval():boolean {
    if (this.beginHour === undefined || this.beginMinute === undefined || this.endHour === undefined || this.endMinute === undefined) {
      return false;
    }
    return (this.beginHour <= 12 && (this.breakHour != 1 || this.breakMinute != 0))
        || (this.beginHour > 12 && (this.breakHour != 0 || this.breakMinute != 0))
        || !!(!this.beginHour && (this.breakHour || this.breakMinute))
  }

  setDefaultBreakTime():void {
    if (this.beginHour === undefined || this.beginMinute === undefined || this.endHour === undefined || this.endMinute === undefined) {
      this.breakHour = undefined;
      this.breakMinute = undefined;
      return;
    }
    if (this.beginHour <= 12) {
      if (this.breakHour === undefined) {
        this.breakHour = 1;
      }
      if (this.breakMinute === undefined) {
        this.breakMinute = 0;
      }
    } else {
      if (this.breakHour === undefined) {
        this.breakHour = 0;
      }
      if (this.breakMinute === undefined) {
        this.breakMinute = 0;
      }
    }
  }
}
