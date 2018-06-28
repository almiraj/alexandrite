import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'FillZeroPipe'
})
export class FillZeroPipe implements PipeTransform {
  transform(value:number, component:number):string {
    var s:string = String(value);
    while (s.length < component) {
      s = '0' + s;
    }
    return s;
  }
}
