import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Modal } from 'angular2-modal/plugins/bootstrap';

import { TimeSheet } from '../entity/TimeSheet';
import { DateRow } from '../entity/DateRow';
import { TimeTableService } from '../service/TimeTableService';
import { TimeSheetUtils } from '../util/TimeSheetUtils';

@Component({
  selector: 'TimeTableInputComponent',
  template: `
    <span defaultOverlayTarget></span>
    <div class="row">
      <div class="col-md-2">
        <ul class="list-unstyled">
          <li *ngFor="let timeSheet of timeSheets | ReversePipe">
            <button class="btn btn-default" (click)="selectMonth(timeSheet.month)">{{timeSheet.month}}</button>
          </li>
        </ul>
      </div>
      <div class="col-md-10">
        <TimeTableComponent [timeSheet]=selectedTimeSheet></TimeTableComponent>
      </div>
    </div>
    <div class="row">
      <button class="btn btn-default pull-right" (click)="save()">保存</button>
    </div>
  `
})
export class TimeTableInputComponent implements OnInit {
  userId:String
  timeSheets:Array<TimeSheet>
  selectedTimeSheet:TimeSheet

  constructor(
    public route:ActivatedRoute,
    public modal:Modal,
    public timeTableService:TimeTableService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = String(params['userId']);
      this.timeTableService.selectAllTimeSheets(this.userId)
        .then((timeSheets:Array<TimeSheet>) => {
          if (!TimeSheetUtils.findThisMonthSheet(timeSheets)) {
            timeSheets.push(TimeSheetUtils.createThisMonthSheet());
          }
          this.timeSheets = timeSheets;
          this.selectedTimeSheet = timeSheets[timeSheets.length - 1];
        })
        .catch((e) => {
          alert(String(e));
        });
    });
  }
  selectMonth(selectedMonth:String) {
    this.selectedTimeSheet = this.timeSheets.find((timeSheet:TimeSheet) => {
      return timeSheet.month == selectedMonth;
    });
  }
  save() {
    this.timeTableService.updateTimeSheet(this.userId, this.selectedTimeSheet)
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
