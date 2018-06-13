export class DateRow {
  constructor(
    public date:string,
    public begin:string,
    public end:string,
    public interval:string,
    public workTime:string
  ) {}
  get beginHour():string { return this.begin.slice(0, 2); }
  set beginHour(_:string) { this.begin = _ + this.beginMinute; }
  get beginMinute():string { return this.begin.slice(2); }
  set beginMinute(_:string) { this.begin = this.beginHour + _; }
  get endHour():string { return this.end.slice(0, 2); }
  get endMinute():string { return this.end.slice(2); }
  get intervalHour():string { return this.interval.slice(0, 2); }
  get intervalMinute():string { return this.interval.slice(2); }
}
