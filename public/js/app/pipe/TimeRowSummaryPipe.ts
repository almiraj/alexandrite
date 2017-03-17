import { Pipe, PipeTransform } from '@angular/core';

import { TimeRow } from '../entity/TimeRow';
import { TimeSheetUtils } from '../util/TimeSheetUtils';

@Pipe({
  name: 'TimeRowSummaryPipe',
  pure: false
})
export class TimeRowSummaryPipe implements PipeTransform {
  transform(timeRow:TimeRow):String {
    const end = TimeSheetUtils.calcMinutes(timeRow.end);
    const begin = TimeSheetUtils.calcMinutes(timeRow.begin);
    const interval = TimeSheetUtils.calcMinutes(timeRow.interval);
    if (!end || !begin || !interval) {
      return '';
    }

    const sum = end - begin - interval;
    if (sum <= 0) {
      return '';
    }

    const sumHours = Math.floor(sum / 60);
    const sumMinutes = Math.floor(sum % 60);
    return ('0000' + sumHours).slice(-2) + ('0000' + sumMinutes).slice(-2);
  }
}
