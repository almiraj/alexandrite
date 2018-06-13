export class DateRow {
  constructor(
    public date:number,
    public beginHour:number,
    public beginMinute:number,
    public endHour:number,
    public endMinute:number,
    public intervalHour:number,
    public intervalMinute:number
  ) {}
  isNotDefaultInterval:boolean
}
