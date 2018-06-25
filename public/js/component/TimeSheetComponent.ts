import { Component, Input, ChangeDetectorRef } from '@angular/core';

import { DateRow } from '../entity/DateRow';
import { TimeSheet } from '../entity/TimeSheet';
import { UserInfoService } from '../service/UserInfoService';

@Component({
  selector: 'TimeSheetComponent',
  template: `
    <div>
      <table class="table table-striped">
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
          <tr *ngFor="let dateRow of timeSheet.dateRows; let i = index" id="{{'dateRow' + i}}">
            <td class="td-date">
              {{dateRow.date}}
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
              <input type="text" class="input-remarks">
            </td>
            <td class="d-none d-sm-table-cell">
              {{dateRow | DateRowSummaryPipe}}
            </td>
            <td class="d-sm-none">
              <!-- Button trigger modal -->
              <a (click)="openModal('#exampleModalCenter' + i)">
                <i class="fa fa-window-restore" [ngClass]="{'not-default': dateRow.isNotDefaultInterval}" aria-hidden="true"></i>
              </a>
              <!-- Modal -->
              <div class="modal" id="exampleModalCenter{{i}}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLongTitle">
                        {{timeSheet.yearMonth}}/{{dateRow.date | FillZeroPipe:2}}
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
                            <td><input type="text" class="input-remarks"></td>
                          </tr><tr>
                            <td>計</td>
                            <td>{{dateRow | DateRowSummaryPipe}}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-primary">Save changes</button>
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
    'th { font-weight: normal; }',
    'th, td { white-space: nowrap; padding: 2px 4px; text-align: center; vertical-align: middle; }',
    '.td-date { text-align: right; }',
    '.input-remarks { width: 100%; }',
    '.modal-body th, .modal-body td { text-align: left; }',
    'select { border:1px solid #eee; border-radius: 0.3rem; }',
    '.fa-window-restore { font-size: 0.8em; }',
    '.not-default { color: red; }',
    '.not-default select { background-color: red; }'
  ]
})
export class TimeSheetComponent {
  @Input() selectedYearMonth:string
  timeSheet:TimeSheet

  constructor(
    public ref:ChangeDetectorRef,
    public userInfoService:UserInfoService
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
