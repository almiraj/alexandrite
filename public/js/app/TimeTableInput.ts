import { Component } from '@angular/core';
import { TimeTable } from './TimeTable';

@Component({
  selector: 'TimeTableInput',
  template: `
    <TimeTable></TimeTable>
    <button>保存</button>
  `,
  directives: [TimeTable]
})
export class TimeTableInput {
  constructor() {
  }
}
