import { Pipe, PipeTransform } from '@angular/core';
import { TimeRow } from '../entity/TimeRow';

@Pipe({
  name: 'TimeRowSummaryPipe',
  pure: false
})
export class TimeRowSummaryPipe implements PipeTransform {
  transform(timeRow:TimeRow):String {
    const sum = Number(timeRow.end) - Number(timeRow.begin) - Number(timeRow.interval);
    if (sum <= 0) {
      return '';
    }

    const sumStr = String(sum);
    if (sumStr.length >= 4) {
        return sumStr;
    }

    return ('0000' + sumStr).slice(-4);
  }
}
