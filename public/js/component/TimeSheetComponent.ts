import { Component, Input, ChangeDetectorRef } from '@angular/core';

import { DateRow } from '../entity/DateRow';
import { TimeSheet } from '../entity/TimeSheet';
import { UserInfoService } from '../service/UserInfoService';

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
          <tr *ngFor="let dateRow of timeSheet.dateRows; let i = index" [ngClass]="{saturday: dateRow.isSaturday, sunday: dateRow.isSunday, holiday: dateRow.isHoliday}">
            <td class="td-date">
              <span class="today-container"><i [ngClass]="{today: dateRow.isToday}"></i>{{dateRow.date | date:'d'}}<span class="day"> ({{dateRow.dayOfJapan}})</span></span>
            </td>
            <td>
              <select [(ngModel)]="dateRow.beginHour" (change)="dateRow.setDefaultBreakTime()"><option *ngFor="let h of userInfoService.hourSelections" [value]="h">{{h | FillZeroPipe:2}}</option></select
              ><select [(ngModel)]="dateRow.beginMinute" (change)="dateRow.setDefaultBreakTime()"><option *ngFor="let m of userInfoService.minuteSelections" [value]="m">{{m | FillZeroPipe:2}}</option></select>
            </td>
            <td>
              <select [(ngModel)]="dateRow.endHour" (change)="dateRow.setDefaultBreakTime()"><option *ngFor="let h of userInfoService.hourSelections" [value]="h">{{h | FillZeroPipe:2}}</option></select
              ><select [(ngModel)]="dateRow.endMinute" (change)="dateRow.setDefaultBreakTime()"><option *ngFor="let m of userInfoService.minuteSelections" [value]="m">{{m | FillZeroPipe:2}}</option></select>
            </td>
            <td class="d-none d-sm-table-cell">
              <select (change)="dateRow.setDefaultBreakTime()"><option value=""></option><option value="午前休">午前休</option><option value="午後休">午後休</option></select>
            </td>
            <td class="d-none d-sm-table-cell" [ngClass]="{'not-default': dateRow.isNotDefaultInterval}">
              <select [(ngModel)]="dateRow.breakHour" (change)="dateRow.setDefaultBreakTime()"><option *ngFor="let h of userInfoService.hourSelections" [value]="h">{{h | FillZeroPipe:2}}</option></select
              ><select [(ngModel)]="dateRow.breakMinute" (change)="dateRow.setDefaultBreakTime()"><option *ngFor="let m of userInfoService.minuteSelections" [value]="m">{{m | FillZeroPipe:2}}</option></select>
            </td>
            <td class="d-none d-sm-table-cell">
              <input type="text" class="remarks-textbox">
            </td>
            <td class="d-none d-sm-table-cell">
              {{dateRow.summary}}
            </td>
            <td class="d-sm-none">
              <!-- Button trigger modal -->
              <button id="modal-button{{i}}" class="modal-button fa fa-window-restore" (click)="openModal('#modal-window' + i)" [ngClass]="{'not-default': dateRow.isNotDefaultInterval}"></button>
              <!-- Modal -->
              <div class="modal" id="modal-window{{i}}" tabindex="-1" role="dialog" [attr.aria-labelledby]="'modal-button' + i" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title">
                        <span class="today-container"><i [ngClass]="{today: dateRow.isToday}"></i>{{dateRow.date | date:'d'}}<span class="day"> ({{dateRow.dayOfJapan}})</span></span>
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
                              <select [(ngModel)]="dateRow.beginHour" (change)="dateRow.setDefaultBreakTime()"><option *ngFor="let h of userInfoService.hourSelections" [value]="h">{{h | FillZeroPipe:2}}</option></select
                              ><select [(ngModel)]="dateRow.beginMinute" (change)="dateRow.setDefaultBreakTime()"><option *ngFor="let m of userInfoService.minuteSelections" [value]="m">{{m | FillZeroPipe:2}}</option></select>
                              ～
                              <select [(ngModel)]="dateRow.endHour" (change)="dateRow.setDefaultBreakTime()"><option *ngFor="let h of userInfoService.hourSelections" [value]="h">{{h | FillZeroPipe:2}}</option></select
                              ><select [(ngModel)]="dateRow.endMinute" (change)="dateRow.setDefaultBreakTime()"><option *ngFor="let m of userInfoService.minuteSelections" [value]="m">{{m | FillZeroPipe:2}}</option></select>
                            </td>
                          </tr><tr>
                            <td>有給</td>
                            <td><select (change)="dateRow.setDefaultBreakTime()"><option value=""></option><option value="午前休">午前休</option><option value="午後休">午後休</option></select></td>
                          </tr><tr>
                            <td>休憩</td>
                            <td [ngClass]="{'not-default': dateRow.isNotDefaultInterval}">
                              <select [(ngModel)]="dateRow.breakHour" (change)="dateRow.setDefaultBreakTime()"><option *ngFor="let h of userInfoService.hourSelections" [value]="h">{{h | FillZeroPipe:2}}</option></select
                              ><select [(ngModel)]="dateRow.breakMinute" (change)="dateRow.setDefaultBreakTime()"><option *ngFor="let m of userInfoService.minuteSelections" [value]="m">{{m | FillZeroPipe:2}}</option></select>
                            </td>
                          </tr><tr>
                            <td>備考</td>
                            <td><input type="text" class="remarks-textbox"></td>
                          </tr><tr>
                            <td>計</td>
                            <td>{{dateRow.summary}}</td>
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
    '.day { font-size: 70%; color: #666; }',
    '.remarks-textbox { width: 100%; }',
    '.modal-button { font-size: 0.9rem; background-color: transparent; border-style: none; cursor: pointer; }',
    '.not-default { color: red; }',
    '.not-default select { background-color: red; }',
    '.saturday { background-color: rgb(152,192,214); }',
    '.sunday { background-color: #C7A5DC; }',
    '.holiday { background-color: rgb(201,221,164); }',
    '.today-container { position: relative; }',
    '.today:before { font-family: FontAwesome; content: "\\f00c"; position: absolute; bottom: 0.55rem; right: -0.35rem; color: rgb(223,206,162); }',
    '.modal-header, .modal-header span { color: rgb(248,242,251); background-color: #69A5C4; }',
    '.modal-body th, .modal-body td { text-align: left; }',
  ]
})
export class TimeSheetComponent {
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
}
