import { TimeRow } from '../entity/TimeRow';

export class TimeTableService {
  timeRows: Array<TimeRow>
  constructor() {
    this.timeRows = [
      new TimeRow('1000', '1800', '0100', '700'),
      new TimeRow('1000', '1830', '0100', '730')
    ];
  }
  save() {
    alert(this.timeRows[0].begin);
  }
}
