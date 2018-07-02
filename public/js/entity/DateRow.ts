export class DateRow {
  isNotDefaultInterval:boolean

  constructor(
    public date:Date,
    public beginHour:number,
    public beginMinute:number,
    public endHour:number,
    public endMinute:number,
    public breakHour:number,
    public breakMinute:number
  ) {}
}
