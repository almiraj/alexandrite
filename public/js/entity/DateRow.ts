export class DateRow {
  beginHour:number
  beginMinute:number
  endHour:number
  endMinute:number
  breakHour:number
  breakMinute:number
  isNotDefaultInterval:boolean

  constructor(
    public date:Date
  ) {}
}
