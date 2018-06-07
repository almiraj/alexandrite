export class DateRow {
  constructor(
    public date:String,
    public begin:String,
    public end:String,
    public interval:String,
    public workTime:String
  ) {}
  get beginHour():String {
    return this.begin.slice(0, 2);
  }
  get beginMinute():String {
    return this.begin.slice(2);
  }
  get endHour():String {
    return this.end.slice(0, 2);
  }
  get endMinute():String {
    return this.end.slice(2);
  }
  get intervalHour():String {
    return this.interval.slice(0, 2);
  }
  get intervalMinute():String {
    return this.interval.slice(2);
  }
}
