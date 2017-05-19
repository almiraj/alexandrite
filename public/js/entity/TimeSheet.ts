import { DateRow } from '../entity/DateRow';

export class TimeSheet {
  constructor(
    public month:String,
    public dateRows:Array<DateRow>
  ) {}
}
