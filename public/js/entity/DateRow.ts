export class DateRow {
  constructor(
    public date:number,
    public beginHour:number,
    public beginMinute:number,
    public endHour:number,
    public endMinute:number,
    public breakHour:number,
    public breakMinute:number
  ) {}
  isNotDefaultInterval:boolean
}
