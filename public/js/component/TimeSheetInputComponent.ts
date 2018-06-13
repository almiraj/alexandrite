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
    <nav class="navbar navbar-expand-xs fixed-top bg-primary text-white font-weight-bold">
      <a href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <i class="fa fa-diamond" aria-hidden="true"> </i>
      </a>
      <div class="collapse navbar-collapse dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
        <a class="dropdown-item" href="#">Action</a>
        <a class="dropdown-item" href="#">Another action</a>
        <a class="dropdown-item" href="#">Something else here</a>
        <input type="text" value="a">
        <input type="text" value="b">
      </div>
      <div>
        <select [(ngModel)]="selectedYearMonth" (change)="selectYearMonth()">
          <option *ngFor="let timeSheet of timeSheets | ReversePipe" [value]="timeSheet.yearMonth" [selected]="timeSheets[0] == timeSheet">
            {{timeSheet.yearMonth}}
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
    'nav { background-color: #17a2b8; }',
    '#timesheet { margin-top: 3rem; }',
    '.fa-diamond { color: #ffffff; font-weight: bold; }'
  ]
})
export class TimeSheetInputComponent implements OnInit {
  userId:String
  timeSheets:Array<TimeSheet>
  selectedTimeSheet:TimeSheet
  selectedYearMonth:String

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
          this.selectedYearMonth = this.selectedTimeSheet.yearMonth;
        })
        .catch(e => this.modalService.alertError(e));
    });
  }
  selectYearMonth() {
    this.selectedTimeSheet = this.timeSheets.find((timeSheet:TimeSheet) => {
      return timeSheet.yearMonth == this.selectedYearMonth;
    });
  }
  save() {
    this.timeSheetService.updateTimeSheet(this.userId, this.selectedTimeSheet)
      .then(() => this.modalService.alertSaved())
      .catch(e => this.modalService.alertError(e));
  }
}
