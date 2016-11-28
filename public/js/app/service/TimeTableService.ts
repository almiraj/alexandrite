import { TimeRow } from '../entity/TimeRow';

export class TimeTableService {
  timeRows: Array<TimeRow>
  constructor() {
    this.timeRows = [
      new TimeRow('1000', '1800', '0100'),
      new TimeRow('1000', '1830', '0100')
    ];
  }
  save() {
    alert(this.timeRows[0].begin);
  }
}
