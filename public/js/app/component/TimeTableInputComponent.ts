import { Component } from '@angular/core';
import { TimeTableComponent } from '../component/TimeTableComponent';
import { TimeTableService } from '../service/TimeTableService';

@Component({
  selector: 'TimeTableInputComponent',
  providers: [TimeTableService],
  template: `
    <TimeTableComponent></TimeTableComponent>
    <button class="btn btn-default pull-right" (click)="save()">保存</button>
  `,
  directives: [TimeTableComponent]
})
export class TimeTableInputComponent {
  timeTableService: TimeTableService
  save() {
    this.timeTableService.save().then((address2:String) => {
      alert(address2);
    });
  }
  constructor(timeTableService:TimeTableService) {
    this.timeTableService = timeTableService;
  }
}
