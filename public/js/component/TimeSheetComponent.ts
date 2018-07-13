import { Component, Input, ChangeDetectorRef } from '@angular/core';

import { PaidOffType } from '../constant/PaidOffType';
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
            <th class="d-none d-sm-table-cell">日</th>
            <th class="d-none d-sm-table-cell">開始</th>
            <th class="d-none d-sm-table-cell">終了</th>
            <th class="d-none d-sm-table-cell">有給</th>
            <th class="d-none d-sm-table-cell">休憩</th>
            <th class="d-none d-sm-table-cell"><!-- 自動入力ボタン --></th>
            <th class="d-none d-sm-table-cell">備考</th>
            <th class="d-none d-sm-table-cell">計</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let dateRow of timeSheet.dateRows; let i = index" [ngClass]="{saturday: dateRow.isSaturday, sunday: dateRow.isSunday, holiday: dateRow.isHoliday}">
            <td class="td-date">
              <span class="today-container"><i [ngClass]="{today: dateRow.isToday}"></i>{{dateRow.date | date:'d'}}<span class="day"> ({{dateRow.dayOfJapan}})</span></span>
            </td>
            <td>
              <div *ngIf="dateRow.paidOffType != PaidOffType.ALL && dateRow.paidOffType != PaidOffType.AM">
                <select [(ngModel)]="dateRow.beginHour" [ngClass]="{'not-default': !dateRow.isDefaultBegin(userInfoService.userInfo.userConfig)}" (change)="dateRow.fillBreakTime(userInfoService.userInfo.userConfig)"><option value=""></option><option *ngFor="let h of userInfoService.hourSelections" [value]="h">{{h | FillZeroPipe:2}}</option></select
                ><select [(ngModel)]="dateRow.beginMinute" [ngClass]="{'not-default': !dateRow.isDefaultBegin(userInfoService.userInfo.userConfig)}" (change)="dateRow.fillBreakTime(userInfoService.userInfo.userConfig)"><option value=""></option><option *ngFor="let m of userInfoService.minuteSelections" [value]="m">{{m | FillZeroPipe:2}}</option></select>
              </div>
              <div *ngIf="dateRow.paidOffType == PaidOffType.ALL || dateRow.paidOffType == PaidOffType.AM">
                {{dateRow.beginHour | FillZeroPipe:2}}:{{dateRow.beginMinute | FillZeroPipe:2}}
              </div>
            </td>
            <td>
              <div *ngIf="dateRow.paidOffType != PaidOffType.ALL && dateRow.paidOffType != PaidOffType.PM">
                <select [(ngModel)]="dateRow.endHour" (change)="dateRow.fillBreakTime(userInfoService.userInfo.userConfig)"><option value=""></option><option *ngFor="let h of userInfoService.hourSelections" [value]="h">{{h | FillZeroPipe:2}}</option></select
                ><select [(ngModel)]="dateRow.endMinute" (change)="dateRow.fillBreakTime(userInfoService.userInfo.userConfig)"><option value=""></option><option *ngFor="let m of userInfoService.minuteSelections" [value]="m">{{m | FillZeroPipe:2}}</option></select>
              </div>
              <div *ngIf="dateRow.paidOffType == PaidOffType.ALL || dateRow.paidOffType == PaidOffType.PM">
                {{dateRow.endHour | FillZeroPipe:2}}:{{dateRow.endMinute | FillZeroPipe:2}}
              </div>
            </td>
            <td class="d-none d-sm-table-cell">
              <select [(ngModel)]="dateRow.paidOffType" [ngClass]="{'not-default': !!dateRow.paidOffType}" (change)="dateRow.fillBreakTime(userInfoService.userInfo.userConfig)"><option value=""><option *ngFor="let k of PaidOffType.keys()" [value]="k">{{PaidOffType.toLabel(k)}}</option></select>
            </td>
            <td class="d-none d-sm-table-cell" [ngClass]="{'not-default': !dateRow.isDefaultBreakTime(userInfoService.userInfo.userConfig)}">
              <select [(ngModel)]="dateRow.breakHour"><option value=""></option><option *ngFor="let h of userInfoService.hourSelections" [value]="h">{{h | FillZeroPipe:2}}</option></select
              ><select [(ngModel)]="dateRow.breakMinute"><option value=""></option><option *ngFor="let m of userInfoService.minuteSelections" [value]="m">{{m | FillZeroPipe:2}}</option></select>
            </td>
            <td class="td-autofill">
              <button class="autofill-button fa fa-paint-brush" (click)="autofill(dateRow)"></button>
            </td>
            <td class="d-none d-sm-table-cell">
              <input [(ngModel)]="dateRow.remarks" [ngClass]="{'not-default': !!dateRow.remarks}" class="remarks-textbox" type="text">
            </td>
            <td class="d-none d-sm-table-cell">
              {{dateRow.summary}}
            </td>
            <td class="d-sm-none td-modal">
              <!-- Button trigger modal -->
              <button id="modal-button{{i}}" class="modal-button fa fa-window-restore" (click)="openModal('#modal-window' + i)" [ngClass]="{'not-default': dateRow.isCareful(userInfoService.userInfo.userConfig)}"></button>
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
                              <select [(ngModel)]="dateRow.beginHour" [ngClass]="{'not-default': !dateRow.isDefaultBegin(userInfoService.userInfo.userConfig)}" (change)="dateRow.fillBreakTime(userInfoService.userInfo.userConfig)"><option value=""></option><option *ngFor="let h of userInfoService.hourSelections" [value]="h">{{h | FillZeroPipe:2}}</option></select
                              ><select [(ngModel)]="dateRow.beginMinute" [ngClass]="{'not-default': !dateRow.isDefaultBegin(userInfoService.userInfo.userConfig)}" (change)="dateRow.fillBreakTime(userInfoService.userInfo.userConfig)"><option value=""></option><option *ngFor="let m of userInfoService.minuteSelections" [value]="m">{{m | FillZeroPipe:2}}</option></select>
                              ～
                              <select [(ngModel)]="dateRow.endHour" (change)="dateRow.fillBreakTime(userInfoService.userInfo.userConfig)"><option value=""></option><option *ngFor="let h of userInfoService.hourSelections" [value]="h">{{h | FillZeroPipe:2}}</option></select
                              ><select [(ngModel)]="dateRow.endMinute" (change)="dateRow.fillBreakTime(userInfoService.userInfo.userConfig)"><option value=""></option><option *ngFor="let m of userInfoService.minuteSelections" [value]="m">{{m | FillZeroPipe:2}}</option></select>
                            </td>
                          </tr><tr>
                            <td>有給</td>
                            <td><select [(ngModel)]="dateRow.paidOffType" [ngClass]="{'not-default': !!dateRow.paidOffType}" (change)="dateRow.fillBreakTime(userInfoService.userInfo.userConfig)"><option value=""><option *ngFor="let k of PaidOffType.keys()" [value]="k">{{PaidOffType.toLabel(k)}}</option></select></td>
                          </tr><tr>
                            <td>休憩</td>
                            <td [ngClass]="{'not-default': !dateRow.isDefaultBreakTime(userInfoService.userInfo.userConfig)}">
                              <select [(ngModel)]="dateRow.breakHour"><option value=""></option><option *ngFor="let h of userInfoService.hourSelections" [value]="h">{{h | FillZeroPipe:2}}</option></select
                              ><select [(ngModel)]="dateRow.breakMinute"><option value=""></option><option *ngFor="let m of userInfoService.minuteSelections" [value]="m">{{m | FillZeroPipe:2}}</option></select>
                            </td>
                          </tr><tr>
                            <td>備考</td>
                            <td><input [(ngModel)]="dateRow.remarks" [ngClass]="{'not-default': !!dateRow.remarks}" class="remarks-textbox" type="text"></td>
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
    '#timeSheetTable > thead > tr > th, #timeSheetTable > tbody > tr > td { white-space: nowrap; padding: 0.75rem 0.12rem; text-align: center; vertical-align: middle; }',
    '#timeSheetTable > tbody > tr > td.td-date { text-align: right; }',
    '#timeSheetTable > tbody > tr > td.td-autofill, #timeSheetTable > tbody > tr > td.td-modal { width: 1.6rem; padding: 0.75rem 0; }', // 幅は限界まで小さくする
    '.day { font-size: 70%; color: #666; }',
    '.remarks-textbox { width: 80%; }',
    '.autofill-button, .modal-button { font-size: 0.9rem; background-color: transparent; border-style: none; cursor: pointer; }',
    '.not-default, .not-default select { color: rgb(214,148,150); }',
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
  PaidOffType = PaidOffType;

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
  autofill(dateRow:DateRow) {
    if (dateRow.hasSomeTimeSelection()) {
      // 既に入力がある場合はクリア機能を提供する
      if (confirm(dateRow.date.getDate() + '(' + dateRow.dayOfJapan + ') の情報を削除してもよろしいですか？')) {
        dateRow.clearAnyTimeSelection();
      }
    } else {
      dateRow.fillBeginAndEnd(this.userInfoService.userInfo.userConfig);
      dateRow.fillBreakTime(this.userInfoService.userInfo.userConfig);
    }
  }
  openModal(modalId:String) {
    // ngForの中では宣言的にモーダルを作れないので、click時に明示的にモーダルを開く
    const element:any = $(modalId);
    element.modal();
  }
}
