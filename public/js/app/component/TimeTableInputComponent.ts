import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Modal } from 'angular2-modal/plugins/bootstrap';

import { LoginService } from '../service/LoginService';
import { TimeTableService } from '../service/TimeTableService';

@Component({
  selector: 'TimeTableInputComponent',
  providers: [LoginService, TimeTableService, Modal],
  template: `
    <span defaultOverlayTarget></span>
    <TimeTableComponent></TimeTableComponent>
    <button class="btn btn-default pull-right" (click)="save()">保存</button>
  `
})
export class TimeTableInputComponent implements OnInit {
  timeTableService: TimeTableService
  route: ActivatedRoute
  userId: String
  constructor(timeTableService:TimeTableService, public modal: Modal, route: ActivatedRoute) {
    this.timeTableService = timeTableService;
    this.route = route;
  }
  ngOnInit() {
    this.route.params.subscribe(params => this.userId = String(params['userId']);
  }
  save() {
    this.timeTableService.updateTimeSheet().then(() => {
      this.modal.alert()
        .size('sm')
        .body('<span class="glyphicon glyphicon-cloud-upload"></span> <strong>保存しました</strong>')
        .keyboard(32)
        .headerClass('hidden')
        .bodyClass('modal-body text-center text-info h4')
        .footerClass('hidden')
        .open();
    }).catch(e => {
      alert(e);
    });
  }
}
