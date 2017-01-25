import { Component } from '@angular/core';
import { Modal } from 'angular2-modal/plugins/bootstrap';

import { TimeTableService } from '../service/TimeTableService';

@Component({
  selector: 'TimeTableInputComponent',
  providers: [TimeTableService, Modal],
  template: `
    <span defaultOverlayTarget></span>
    <TimeTableComponent></TimeTableComponent>
    <button class="btn btn-default pull-right" (click)="save()">保存</button>
  `
})
export class TimeTableInputComponent {
  timeTableService: TimeTableService
  constructor(timeTableService:TimeTableService, public modal: Modal) {
    this.timeTableService = timeTableService;
  }
  save() {
    this.timeTableService.updateTimeSheet().then(() => {
      this.modal.alert()
          .size('sm')
          .body('<h4>保存しました</h4>')
          .keyboard(27)
          .headerClass('hidden')
          .bodyClass('text-center')
          .footerClass('hidden')
          .open();
    }).catch(e => {
      alert(e);
    });
  }
}
