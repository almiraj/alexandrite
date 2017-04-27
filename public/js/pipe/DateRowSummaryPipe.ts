import { Pipe, PipeTransform } from '@angular/core';

import { DateRow } from '../entity/DateRow';
import { TimeSheetUtils } from '../util/TimeSheetUtils';

@Pipe({
  name: 'DateRowSummaryPipe',
  pure: false
})
export class DateRowSummaryPipe implements PipeTransform {
  transform(dateRow:DateRow):String {
    const end = TimeSheetUtils.calcMinutes(dateRow.end);
    const begin = TimeSheetUtils.calcMinutes(dateRow.begin);
    const interval = TimeSheetUtils.calcMinutes(dateRow.interval);
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
