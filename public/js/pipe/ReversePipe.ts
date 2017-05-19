import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ReversePipe'
})
export class ReversePipe implements PipeTransform {
  transform(value:Array<any>) {
    if (!value) {
      return value;
    }
    return value.reverse();
  }
}