import { Pipe, PipeTransform } from '@angular/core';

import { DateRow } from '../entity/DateRow';
import { TimeSheetUtils } from '../util/TimeSheetUtils';

@Pipe({
  name: 'DateRowSummaryPipe',
  pure: false
})
export class DateRowSummaryPipe implements PipeTransform {
  static NIGHT_OVER_TIME:number = TimeSheetUtils.toMinutesFromHHMM('2200');

  transform(dateRow:DateRow, exponent:String):String {
    const minutes = new DateRowAsMinutes(dateRow);
    if (!minutes.actualWork) {
      return '';
    }
    if (exponent == 'nightOverTime') {
      const nightOverTime = minutes.end - DateRowSummaryPipe.NIGHT_OVER_TIME;
      return (nightOverTime > 0) ? TimeSheetUtils.toHHMMFromMinutes(nightOverTime) : '';
    }
    if (exponent == 'actualWorkTime') {
      const actualWorkTime = minutes.actualWork - minutes.unpaidVac1 - minutes.unpaidVac2;
      return (actualWorkTime > 0) ? TimeSheetUtils.toHHMMFromMinutes(actualWorkTime) : '';
    }
    if (exponent == 'paidVacTime') {
      const paidVacTime = minutes.paidVac;
      return (paidVacTime > 0) ? TimeSheetUtils.toHHMMFromMinutes(paidVacTime) : '';
    }
    if (exponent == 'paidWorkTime') {
      const paidWorkTime = minutes.actualWork + minutes.paidVac - minutes.unpaidVac1 - minutes.unpaidVac2;
      return (paidWorkTime > 0) ? TimeSheetUtils.toHHMMFromMinutes(paidWorkTime) : '';
    }
    throw new Error('unknown exponent');
  }
}
class DateRowAsMinutes {
  end:number
  begin:number
  actualWork:number
  paidVacEnd:number
  paidVacBegin:number
  paidVac:number
  unpaidVac1:number
  unpaidVac2:number

  constructor(dateRow:DateRow) {
    this.end = TimeSheetUtils.toMinutesFromHHMM(dateRow.end);
    this.begin = TimeSheetUtils.toMinutesFromHHMM(dateRow.begin);
    this.actualWork = this.end - this.begin || 0;

    this.paidVacEnd = TimeSheetUtils.toMinutesFromHHMM(dateRow.paidVacEnd);
    this.paidVacBegin = TimeSheetUtils.toMinutesFromHHMM(dateRow.paidVacBegin);
    this.paidVac = (this.paidVacEnd - this.paidVacBegin) || 0;

    this.unpaidVac1 = TimeSheetUtils.toMinutesFromHHMM(dateRow.unpaidVacTime1) || 0;
    this.unpaidVac2 = TimeSheetUtils.toMinutesFromHHMM(dateRow.unpaidVacTime2) || 0;
  }
}