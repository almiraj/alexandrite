import { Component, Input, OnChanges } from '@angular/core';

import { TimeSheet } from '../entity/TimeSheet';
import { DateRow } from '../entity/DateRow';

@Component({
  selector: 'TimeSheetComponent',
  template: `
    <div class="table-responsive">
      <table class="table table-bordered table-striped table-responsive">
        <thead class="thead-default">
          <tr id="timeHead">
            <th></th>
            <th>開始</th>
            <th>終了</th>
            <th>休憩</th>
            <th>計</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let dateRow of dateRows; let i = index" id="{{'dateRow' + i}}">
            <td id="{{'dateRow' + i + 'date'}}">{{dateRow.date}}</td>
            <td>
              <select [(ngModel)]="dateRow.beginHour"><option *ngFor="let h of allHours" [value]="h">{{h}}</option></select><select [(ngModel)]="dateRow.beginMinute"><option *ngFor="let m of allMinutes" [value]="m">{{m}}</option></select>
            </td>
            <td>
              <select [(ngModel)]="dateRow.endHour"><option *ngFor="let h of allHours" [value]="h">{{h}}</option></select><select [(ngModel)]="dateRow.endMinute"><option *ngFor="let m of allMinutes" [value]="m">{{m}}</option></select>
            </td>
            <td>
              <select [(ngModel)]="dateRow.intervalHour"><option *ngFor="let h of allHours" [value]="h">{{h}}</option></select><select [(ngModel)]="dateRow.intervalMinute"><option *ngFor="let m of allMinutes" [value]="m">{{m}}</option></select>
            </td>
            <td><span>{{dateRow | DateRowSummaryPipe}}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [
    'th, td { padding: 2px; }'
  ]
})
export class TimeSheetComponent implements OnChanges {
  @Input() timeSheet:TimeSheet
  allHours:Array<String> = []
  allMinutes:Array<String> = []
  hourMinutes:Array<String> = []
  dateRows:Array<DateRow>
  constructor() {
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
