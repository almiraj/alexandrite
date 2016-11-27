import { Component } from '@angular/core';
import { TimeTable } from './TimeTable';

@Component({
  selector: 'TimeTableInput',
  template: `
    <TimeTable></TimeTable>
    <button class="btn btn-default pull-right">保存</button>
  `,
  directives: [TimeTable]
})
export class TimeTableInput {
  constructor() {
  }
}
