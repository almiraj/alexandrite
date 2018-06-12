import { Component, Input, OnChanges } from '@angular/core';

import { TimeSheet } from '../entity/TimeSheet';
import { DateRow } from '../entity/DateRow';

@Component({
  selector: 'TimeSheetComponent',
  template: `
    <div class="table-responsive">
      <table class="table table-striped table-responsive"><!-- table-responsiveがないとdropdown内の疑似フォームが実現できない -->
        <thead>
          <tr>
            <th></th>
            <th>開始</th>
            <th>終了</th>
            <th class="d-none d-lg-table-cell">有給</th>
            <th class="d-none d-lg-table-cell">休憩</th>
            <th>計</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let dateRow of dateRows; let i = index" id="{{'dateRow' + i}}">
            <td class="text-right">
              {{dateRow.date}}
            </td>
            <td class="text-nowrap">
              <select [(ngModel)]="dateRow.beginHour"><option *ngFor="let h of allHours" [value]="h">{{h}}</option></select
              ><select [(ngModel)]="dateRow.beginMinute"><option *ngFor="let m of allMinutes" [value]="m">{{m}}</option></select>
            </td>
            <td class="text-nowrap">
              <select [(ngModel)]="dateRow.endHour"><option *ngFor="let h of allHours" [value]="h">{{h}}</option></select
              ><select [(ngModel)]="dateRow.endMinute"><option *ngFor="let m of allMinutes" [value]="m">{{m}}</option></select>
            </td>
            <td class="d-none d-lg-table-cell text-nowrap">
              <select [(ngModel)]="dateRow.intervalHour"><option value=""></option><option value="午前休">午前休</option><option value="午後休">午後休</option></select>
            </td>
            <td class="d-none d-lg-table-cell text-nowrap">
              <select [(ngModel)]="dateRow.intervalHour"><option *ngFor="let h of allHours" [value]="h">{{h}}</option></select
              ><select [(ngModel)]="dateRow.intervalMinute"><option *ngFor="let m of allMinutes" [value]="m">{{m}}</option></select>
            </td>
            <td><span>{{dateRow | DateRowSummaryPipe}}</span></td>
            <td class="text-nowrap">
              <a href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                ▼
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                <table class="table table-striped table-responsive">
                  <tbody>
                    <tr>
                      <td>有給</td>
                      <td><select [(ngModel)]="dateRow.intervalHour"><option value=""></option><option value="午前休">午前休</option><option value="午後休">午後休</option></select></td>
                    </tr><tr>
                      <td>休憩</td>
                      <td>
                        <select [(ngModel)]="dateRow.intervalHour"><option *ngFor="let h of allHours" [value]="h">{{h}}</option></select
                        ><select [(ngModel)]="dateRow.intervalMinute"><option *ngFor="let m of allMinutes" [value]="m">{{m}}</option></select>
                      </td>
                    </tr><tr>
                      <td>備考</td>
                      <td>
                        <input type="text" style="width:12rem;">
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [
    'th { font-weight: normal; text-align: left; }',
    'th, td { padding: 2px 4px; }',
    'select { border:1px solid #eee; border-radius: 0.3rem; }'
  ]
})
export class TimeSheetComponent implements OnChanges {
  @Input() timeSheet:TimeSheet
  allHours:Array<String> = []
  allMinutes:Array<String> = []
  hourMinutes:Array<String> = []
  dateRows:Array<DateRow>
  constructor() {
    // dropdownコンポーネントは<form>操作時にdropdownを消さない仕様になっているが、<form>とAngularは競合するため、疑似フォームを用意する
    $(() => $('.dropdown-form').on('click' + '.' + 'bs.dropdown' + '.data-api', e => e.stopPropagation()));
    $(() => $('.dropdown-form').on('click', e => e.stopPropagation()));

    const minutesInterval = 15;
    for (var hour = 0; hour < 24; hour++) {
      for (var minute = 0; minute < 59; minute++) {
        if (minute % minutesInterval == 0) {
          this.hourMinutes.push(String(hour).replace(/^(\d)$/, '0$1') + ':' + String(minute).replace(/^(\d)$/, '0$1'));
        }
      }
    }
    for (var hour = 0; hour < 24; hour++) {
      this.allHours.push(String(hour).replace(/^(\d)$/, '0$1'));
    }
    for (var minute = 0; minute < 59; minute++) {
      if (minute % minutesInterval == 0) {
        this.allMinutes.push(String(minute).replace(/^(\d)$/, '0$1'));
      }
    }
  }
  ngOnChanges() {
    if (this.timeSheet) {
      this.dateRows = this.timeSheet.dateRows;
    }
  }
}
