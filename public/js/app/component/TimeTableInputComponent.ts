import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Modal } from 'angular2-modal/plugins/bootstrap';

import { TimeTableService } from '../service/TimeTableService';

@Component({
  selector: 'TimeTableInputComponent',
  template: `
    <span defaultOverlayTarget></span>
    <TimeTableComponent [timeRows]=timeRows></TimeTableComponent>
    <button class="btn btn-default pull-right" (click)="save()">保存</button>
  `
})
export class TimeTableInputComponent implements OnInit {
  userId: String
  month:String
  timeRows:Array<TimeRow>

  constructor(
    public route: ActivatedRoute,
    public modal: Modal,
    public timeTableService:TimeTableService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = String(params['userId']);
      this.month = String(params['month']);
      this.timeTableService.selectTimeSheet(this.userId, this.month)
        .then((timeRows:Array<TimeRow>) => {
          this.timeRows = timeRows;
        })
        .catch((e) => {
          alert(String(e));
        });
    });
  }
  save() {
    this.timeTableService.updateTimeSheet(this.userId, this.month, this.timeRows)
      .then(() => {
        this.modal.alert()
          .size('sm')
          .body('<span class="glyphicon glyphicon-cloud-upload"></span> <strong>保存しました</strong>')
          .keyboard(32)
          .headerClass('hidden')
          .bodyClass('modal-body text-center text-info h4')
          .footerClass('hidden')
          .open();
      })
      .catch(e => {
        alert(String(e));
      });
  }
}
