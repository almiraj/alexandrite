import { Component, Input, OnChanges } from '@angular/core';

import { TimeSheet } from '../entity/TimeSheet';
import { DateRow } from '../entity/DateRow';

@Component({
  selector: 'TimeTableComponent',
  template: `
    <div class="table-responsive">
      <table class="table table-bordered table-striped table-responsive">
        <thead class="thead-default">
          <tr id="timeHead">
            <th>日付</th>
            <th>開始</th>
            <th>終了</th>
            <th>休憩</th>
            <th>合計</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let dateRow of dateRows; let i = index" id="{{'dateRow' + i}}">
            <td id="{{'dateRow' + i + 'date'}}">{{dateRow.date}}</td>
            <td><input id="{{'dateRow' + i + 'begin'}}" class="form-control" [(ngModel)]="dateRow.begin"></td>
            <td><input id="{{'dateRow' + i + 'end'}}" class="form-control" [(ngModel)]="dateRow.end"></td>
            <td><input id="{{'dateRow' + i + 'interval'}}" class="form-control" [(ngModel)]="dateRow.interval"></td>
            <td><span id="{{'dateRow' + i + 'summary'}}">{{dateRow | DateRowSummaryPipe}}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class TimeTableComponent implements OnChanges {
  @Input() timeSheet:TimeSheet
  dateRows:Array<DateRow>
  ngOnChanges() {
    if (this.timeSheet) {
      this.dateRows = this.timeSheet.dateRows;
    }
  }
}
