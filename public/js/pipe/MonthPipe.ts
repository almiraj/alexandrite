import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'MonthPipe'
})
export class MonthPipe implements PipeTransform {
  regexp:RegExp = /(\d{4})(\d{2})/
  transform(value:string) {
    if (this.regexp.test(value)) {
      return RegExp.$2;
    }
    return value;
  }
}