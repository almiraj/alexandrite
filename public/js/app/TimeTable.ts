import { Component } from '@angular/core';

@Component({
  selector: 'TimeTable',
  template: `
    <div class="table-responsive">
      <table class="table table-bordered table-striped table-responsive">
        <thead class="thead-default">
          <tr id="timeHead">
            <th>日付</th>
            <th>開始</th>
            <th>終了</th>
            <th>休憩</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let timeRow of timeTable; let i = index" id="{{'timeRow' + i}}">
            <td id="{{'timeRow' + i + 'date'}}">{{i + 1}}</td>
            <td><input id="{{'timeRow' + i + 'begin'}}" class="form-control" [(ngModel)]="timeRow.begin"></td>
            <td><input id="{{'timeRow' + i + 'end'}}" class="form-control" [(ngModel)]="timeRow.end"></td>
            <td><input id="{{'timeRow' + i + 'interval'}}" class="form-control" [(ngModel)]="timeRow.interval"></td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class TimeTable {
  timeTable: Array<Object>
  constructor() {
    this.timeTable = [
      { date: 1 ,begin: '1000', end: '1800', interval: '0100' },
      { date: 2, begin: '1000', end: '1830', interval: '0100' },
    ];
  }
}
