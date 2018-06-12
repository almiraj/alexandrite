import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'HourMinutePipe'
})
export class HourMinutePipe implements PipeTransform {
  regexp:RegExp = /(\d{2})(\d{2})/
  transform(value:string) {
    if (this.regexp.test(value)) {
      return RegExp.$1 + ':' + RegExp.$2;
    }
    return value;
  }
}