import { DateRow } from '../entity/DateRow';

export class TimeSheet {
  constructor(
    public month:string,
    public dateRows:Array<DateRow>
  ) {}
}
