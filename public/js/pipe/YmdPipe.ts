import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'YmdPipe'
})
export class YmdPipe implements PipeTransform {
  regexp:RegExp = /(\d{4})(0(\d{1})|(\d{2}))/
  transform(value:string, component:string) {
    if (this.regexp.test(value)) {
      return RegExp.$3 + RegExp.$4 + '/' + component;
    }
    return value;
  }
}
