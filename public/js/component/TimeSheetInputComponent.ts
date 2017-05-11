import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TimeSheet } from '../entity/TimeSheet';
import { ModalService } from '../service/ModalService';
import { TimeSheetService } from '../service/TimeSheetService';
import { TimeSheetUtils } from '../util/TimeSheetUtils';

@Component({
  selector: 'TimeSheetInputComponent',
  template: `
    <div class="row">
      <div class="col-md-2">
        <ul class="list-unstyled">
          <li *ngFor="let timeSheet of timeSheets | ReversePipe">
            <button class="btn btn-default" (click)="selectMonth(timeSheet.month)">{{timeSheet.month}}</button>
          </li>
        </ul>
      </div>
      <div class="col-md-10">
        <TimeSheetComponent [timeSheet]=selectedTimeSheet></TimeSheetComponent>
      </div>
    </div>
    <div>
      <button class="btn btn-default pull-right" (click)="save()">保存</button>
    </div>
  `
})
export class TimeSheetInputComponent implements OnInit {
  userId:String
  timeSheets:Array<TimeSheet>
  selectedTimeSheet:TimeSheet

  constructor(
    public route:ActivatedRoute,
    public modalService:ModalService,
    public timeSheetService:TimeSheetService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = String(params['userId']);
      this.timeSheetService.selectAllTimeSheets(this.userId)
        .then((timeSheets:Array<TimeSheet>) => {
          if (!TimeSheetUtils.findThisMonthSheet(timeSheets)) {
            timeSheets.push(TimeSheetUtils.createThisMonthSheet());
          }
          this.timeSheets = timeSheets;
          this.selectedTimeSheet = timeSheets[timeSheets.length - 1];
        })
        .catch(e => this.modalService.alertError(e));
    });
  }
  selectMonth(selectedMonth:String) {
    this.selectedTimeSheet = this.timeSheets.find((timeSheet:TimeSheet) => {
      return timeSheet.month == selectedMonth;
    });
  }
  save() {
    this.timeSheetService.updateTimeSheet(this.userId, this.selectedTimeSheet)
      .then(() => this.modalService.alertSaved())
      .catch(e => this.modalService.alertError(e));
  }
}
