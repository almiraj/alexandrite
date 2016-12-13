import { Pipe, PipeTransform } from '@angular/core';

import { TimeRow } from '../entity/TimeRow';

@Pipe({
  name: 'TimeRowSummaryPipe',
  pure: false
})
export class TimeRowSummaryPipe implements PipeTransform {
  re:RegExp = /(\d{1,2})(\d{2})/
  toMinutes(src:String):number {
    if (src && this.re.test(src.toString())) {
      return Number(RegExp.$1) * 60 + Number(RegExp.$2);
    }
    return 0;
  }
  transform(timeRow:TimeRow):String {
    const end = this.toMinutes(timeRow.end);
    const begin = this.toMinutes(timeRow.begin);
    const interval = this.toMinutes(timeRow.interval);
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
