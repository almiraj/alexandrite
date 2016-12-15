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
          .size('lg')
          .showClose(true)
          .title('A simple Alert style modal window')
          .body(`
              <h4>Alert is a classic (title/body/footer) 1 button modal window that 
              does not block.</h4>
              <b>Configuration:</b>
              <ul>
                  <li>Non blocking (click anywhere outside to dismiss)</li>
                  <li>Size large</li>
                  <li>Dismissed with default keyboard key (ESC)</li>
                  <li>Close wth button click</li>
                  <li>HTML content</li>
              </ul>`)
          .open();
    }).catch(e => {
      alert(e);
    });
  }
}
