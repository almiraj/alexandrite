import { Component } from '@angular/core';

import { TimeTableService } from '../service/TimeTableService';

@Component({
  selector: 'TimeTableInputComponent',
  providers: [TimeTableService],
  template: `
    <TimeTableComponent></TimeTableComponent>
    <button class="btn btn-default pull-right" (click)="save()">保存</button>
  `
})
export class TimeTableInputComponent {
  timeTableService: TimeTableService
  constructor(timeTableService:TimeTableService) {
    this.timeTableService = timeTableService;
  }
  save() {
    this.timeTableService.updateTimeSheet().then(() => {
      alert('saved');
    }).catch(e => {
      alert(e);
    });
  }
}
