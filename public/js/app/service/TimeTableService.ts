import { TimeRow } from '../entity/TimeRow';

export class TimeTableService {
  timeRows: Array<TimeRow>
  save() {
    alert(this.timeRows[0].begin);
  }
  constructor() {
    this.timeRows = [
      new TimeRow('1', '1000', '1800', '0100'),
      new TimeRow('1', '1000', '1830', '0100')
    ];
  }
}
