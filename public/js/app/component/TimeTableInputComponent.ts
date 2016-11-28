import { Component } from '@angular/core';
import { CommonService } from '../service/CommonService';
import { TimeTableComponent } from '../component/TimeTableComponent';
import { TimeTableService } from '../service/TimeTableService';

@Component({
  selector: 'TimeTableInputComponent',
  providers: [TimeTableService, CommonService],
  template: `
    <TimeTableComponent></TimeTableComponent>
    <button class="btn btn-default pull-right" (click)="save()">保存</button>
  `,
  directives: [TimeTableComponent]
})
export class TimeTableInputComponent {
  timeTableService: TimeTableService
  save() {
    this.timeTableService.save();
  }
  constructor(timeTableService:TimeTableService) {
    this.timeTableService = timeTableService;
  }
}
