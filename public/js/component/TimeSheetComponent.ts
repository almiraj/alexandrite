import { Component, Input, ChangeDetectorRef } from '@angular/core';

import { DateRow } from '../entity/DateRow';
import { TimeSheet } from '../entity/TimeSheet';
import { UserInfoService } from '../service/UserInfoService';
import { TimeSheetUtils } from '../util/TimeSheetUtils';

@Component({
  selector: 'TimeSheetComponent',
  template: `
    <div>
      <table id="timeSheetTable" class="table">
        <thead>
          <tr>
            <th></th>
            <th>開始</th>
            <th>終了</th>
            <th class="d-none d-sm-table-cell">有給</th>
            <th class="d-none d-sm-table-cell">休憩</th>
            <th class="d-none d-sm-table-cell">備考</th>
            <th class="d-none d-sm-table-cell">計</th>
            <th class="d-sm-none"></th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let dateRow of timeSheet.dateRows; let i = index" [ngClass]="{saturday: dateRow.date.getDay() == 6, sunday: dateRow.date.getDay() == 0, holiday: timeSheetUtils.isHoliday(dateRow.date)}">
            <td class="td-date">
              {{dateRow.date | date:'d'}}<span class="day"> ({{['日', '月', '火', '水', '木', '金', '土'][dateRow.date.getDay()]}})</span>
            </td>
            <td>
              <select [(ngModel)]="dateRow.beginHour" (change)="setDefault(dateRow)"><option *ngFor="let h of userInfoService.hourSelections" [value]="h">{{h | FillZeroPipe:2}}</option></select
              ><select [(ngModel)]="dateRow.beginMinute" (change)="setDefault(dateRow)"><option *ngFor="let m of userInfoService.minuteSelections" [value]="m">{{m | FillZeroPipe:2}}</option></select>
            </td>
            <td>
              <select [(ngModel)]="dateRow.endHour" (change)="setDefault(dateRow)"><option *ngFor="let h of userInfoService.hourSelections" [value]="h">{{h | FillZeroPipe:2}}</option></select
              ><select [(ngModel)]="dateRow.endMinute" (change)="setDefault(dateRow)"><option *ngFor="let m of userInfoService.minuteSelections" [value]="m">{{m | FillZeroPipe:2}}</option></select>
            </td>
            <td class="d-none d-sm-table-cell">
              <select (change)="setDefault(dateRow)"><option value=""></option><option value="午前休">午前休</option><option value="午後休">午後休</option></select>
            </td>
            <td class="d-none d-sm-table-cell" [ngClass]="{'not-default': dateRow.isNotDefaultInterval}">
              <select [(ngModel)]="dateRow.breakHour" (change)="setDefault(dateRow)"><option *ngFor="let h of userInfoService.hourSelections" [value]="h">{{h | FillZeroPipe:2}}</option></select
              ><select [(ngModel)]="dateRow.breakMinute" (change)="setDefault(dateRow)"><option *ngFor="let m of userInfoService.minuteSelections" [value]="m">{{m | FillZeroPipe:2}}</option></select>
            </td>
            <td class="d-none d-sm-table-cell">
              <input type="text" class="remarks-textbox">
            </td>
            <td class="d-none d-sm-table-cell">
              {{dateRow | DateRowSummaryPipe}}
            </td>
            <td class="d-sm-none">
              <!-- Button trigger modal -->
              <i id="modal-button{{i}}" class="modal-button fa fa-window-restore" (click)="openModal('#modal-window' + i)" [ngClass]="{'not-default': dateRow.isNotDefaultInterval}" aria-hidden="true"></i>
              <!-- Modal -->
              <div class="modal" id="modal-window{{i}}" tabindex="-1" role="dialog" [attr.aria-labelledby]="'modal-button' + i" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title">
                        {{dateRow.date | date:'y/M/d'}}
                      </h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <table class="table table-striped">
                        <tbody>
                          <tr>
                            <td>勤務時間</td>
                            <td>
                              <select [(ngModel)]="dateRow.beginHour" (change)="setDefault(dateRow)"><option *ngFor="let h of userInfoService.hourSelections" [value]="h">{{h | FillZeroPipe:2}}</option></select
                              ><select [(ngModel)]="dateRow.beginMinute" (change)="setDefault(dateRow)"><option *ngFor="let m of userInfoService.minuteSelections" [value]="m">{{m | FillZeroPipe:2}}</option></select>
                              ～
                              <select [(ngModel)]="dateRow.endHour" (change)="setDefault(dateRow)"><option *ngFor="let h of userInfoService.hourSelections" [value]="h">{{h | FillZeroPipe:2}}</option></select
                              ><select [(ngModel)]="dateRow.endMinute" (change)="setDefault(dateRow)"><option *ngFor="let m of userInfoService.minuteSelections" [value]="m">{{m | FillZeroPipe:2}}</option></select>
                            </td>
                          </tr><tr>
                            <td>有給</td>
                            <td><select (change)="setDefault(dateRow)"><option value=""></option><option value="午前休">午前休</option><option value="午後休">午後休</option></select></td>
                          </tr><tr>
                            <td>休憩</td>
                            <td [ngClass]="{'not-default': dateRow.isNotDefaultInterval}">
                              <select [(ngModel)]="dateRow.breakHour" (change)="setDefault(dateRow)"><option *ngFor="let h of userInfoService.hourSelections" [value]="h">{{h | FillZeroPipe:2}}</option></select
                              ><select [(ngModel)]="dateRow.breakMinute" (change)="setDefault(dateRow)"><option *ngFor="let m of userInfoService.minuteSelections" [value]="m">{{m | FillZeroPipe:2}}</option></select>
                            </td>
                          </tr><tr>
                            <td>備考</td>
                            <td><input type="text" class="remarks-textbox"></td>
                          </tr><tr>
                            <td>計</td>
                            <td>{{dateRow | DateRowSummaryPipe}}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [
    '#timeSheetTable > thead > th { font-weight: normal; }',
    '#timeSheetTable > thead > tr > th, #timeSheetTable > tbody > tr > td { white-space: nowrap; padding: 2px 4px; text-align: center; vertical-align: middle; }',
    '.td-date { text-align: right; }',
    '.td-date .day { font-size: 0.7rem; color: #666; }',
    '.remarks-textbox { width: 100%; }',
    '.modal-button { font-size: 0.9rem; cursor: pointer; }',
    '.not-default { color: red; }',
    '.not-default select { background-color: red; }',
    '.saturday { background-color: rgb(152,192,214); }',
    '.sunday { background-color: #C7A5DC; }',
    '.holiday { background-color: rgb(201,221,164); }',
    '.modal-header, .modal-header span { color: rgb(248,242,251); background-color: #69A5C4; }',
    '.modal-body th, .modal-body td { text-align: left; }',
  ]
})
export class TimeSheetComponent {
  timeSheetUtils:TimeSheetUtils = TimeSheetUtils
  @Input() selectedYearMonth:string
  timeSheet:TimeSheet

  constructor(
    private ref:ChangeDetectorRef,
    private userInfoService:UserInfoService
  ) {}

  ngOnChanges() {
    this.timeSheet = this.userInfoService.userInfo.timeSheets.find((timeSheet:TimeSheet) => {
      return timeSheet.yearMonth == this.selectedYearMonth;
    });
  }
  reload() {
    this.ngOnChanges();
    this.ref.detectChanges();
  }
  openModal(modalId:String) {
    // ngForの中では宣言的にモーダルを作れないので、click時に明示的にモーダルを開く
    const element:any = $(modalId);
    element.modal();
  }
  setDefault(dateRow:DateRow) {
    if (dateRow.beginHour <= 12) {
      if (dateRow.breakHour === undefined) {
        dateRow.breakHour = 1;
      }
      if (dateRow.breakMinute === undefined) {
        dateRow.breakMinute = 0;
      }
    } else {
      if (dateRow.breakHour === undefined) {
        dateRow.breakHour = 0;
      }
      if (dateRow.breakMinute === undefined) {
        dateRow.breakMinute = 0;
      }
    }
    dateRow.isNotDefaultInterval = (dateRow.beginHour <= 12 && (dateRow.breakHour != 1 || dateRow.breakMinute != 0))
      || (dateRow.beginHour > 12 && (dateRow.breakHour != 0 || dateRow.breakMinute != 0))
      || !!(!dateRow.beginHour && (dateRow.breakHour || dateRow.breakMinute));
  }
}
