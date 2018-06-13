import { DateRow } from '../entity/DateRow';

export class TimeSheet {
  constructor(
    public yearMonth:string,
    public dateRows:Array<DateRow>
  ) {}
}
