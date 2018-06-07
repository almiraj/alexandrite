import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'YearMonthPipe'
})
export class YearMonthPipe implements PipeTransform {
  regexp:RegExp = /(\d{4})(\d{2})/
  transform(value:string) {
    if (this.regexp.test(value)) {
      return RegExp.$1 + '/' + RegExp.$2;
    }
    return value;
  }
}