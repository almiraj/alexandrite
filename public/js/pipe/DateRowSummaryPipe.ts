import { Pipe, PipeTransform } from '@angular/core';

import { DateRow } from '../entity/DateRow';
import { TimeSheetUtils } from '../util/TimeSheetUtils';

@Pipe({
  name: 'DateRowSummaryPipe',
  pure: false
})
export class DateRowSummaryPipe implements PipeTransform {
  transform(dateRow:DateRow):string {
    const end = dateRow.endHour * 60 + Number(dateRow.endMinute);
    const begin = dateRow.beginHour * 60 + Number(dateRow.beginMinute);
    const breakTime = dateRow.breakHour * 60 + Number(dateRow.breakMinute);
    if (!end || !begin || !breakTime) {
      return '';
    }
    const sum = end - begin - breakTime;
    if (sum <= 0) {
      return '';
    }
    const sumHour = Math.floor(sum / 60);
    const sumMinute = Math.floor(sum % 60);
    return ('0000' + sumHour).slice(-2) + ':' + ('0000' + sumMinute).slice(-2);
  }
}
