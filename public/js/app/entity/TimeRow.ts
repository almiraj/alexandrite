export class TimeRow {
  begin:String
  end:String
  interval:String
  summary:String
  constructor(begin:String, end:String, interval:String, summary:String) {
    this.begin = begin;
    this.end = end;
    this.interval = interval;
    this.summary = summary;
  }
}
