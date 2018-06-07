import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TimeSheet } from '../entity/TimeSheet';
import { DateRow } from '../entity/DateRow';
import { ModalService } from '../service/ModalService';
import { TimeSheetService } from '../service/TimeSheetService';
import { TimeSheetUtils } from '../util/TimeSheetUtils';

@Component({
  selector: 'TimeSheetInputComponent',
  template: `
    <nav class="navbar navbar-expand-xs navbar-light bg-light fixed-top">
      <a class="" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        ▼
      </a>
      <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
        <a class="dropdown-item" href="#">Action</a>
        <a class="dropdown-item" href="#">Another action</a>
        <a class="dropdown-item" href="#">Something else here</a>
      </div>
      <div>
        <select [(ngModel)]="selectedMonth" (change)="selectMonth()">
          <option *ngFor="let timeSheet of timeSheets | ReversePipe" [value]="timeSheet.month" [selected]="timeSheets[0] == timeSheet">
            {{timeSheet.month | YearMonthPipe}}
          </option>
        </select>
      </div>
      保存
    </nav>
    <div id="timesheet">
      <TimeSheetComponent [timeSheet]=selectedTimeSheet></TimeSheetComponent>
    </div>
  `,
  styles: [
    '#timesheet { margin-top: 3rem; }'
  ]
})
export class TimeSheetInputComponent implements OnInit {
  userId:String
  timeSheets:Array<TimeSheet>
  selectedTimeSheet:TimeSheet
  selectedMonth:String

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
          this.selectedMonth = this.selectedTimeSheet.month;
        })
        .catch(e => this.modalService.alertError(e));
    });
  }
  selectMonth() {
    this.selectedTimeSheet = this.timeSheets.find((timeSheet:TimeSheet) => {
      return timeSheet.month == this.selectedMonth;
    });
  }
  save() {
    this.timeSheetService.updateTimeSheet(this.userId, this.selectedTimeSheet)
      .then(() => this.modalService.alertSaved())
      .catch(e => this.modalService.alertError(e));
  }
}
