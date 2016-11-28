import { Pipe } from '@angular/core';
import { TimeRow } from '../entity/TimeRow';
import { CommonService } from '../service/CommonService';

@Pipe({
  name: 'TimeRowSummaryPipe'
})
export class TimeRowSummaryPipe {
  transform(timeRow:TimeRow) {
    return new CommonService().expand4digit(Number(timeRow.end) - Number(timeRow.begin) - Number(timeRow.interval));
  }
}
