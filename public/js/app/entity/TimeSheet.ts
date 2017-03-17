import { TimeRow } from '../entity/TimeRow';

export class TimeSheet {
  constructor(
    public month:String,
    public timeRows:Array<TimeRow>
  ) {}
}
