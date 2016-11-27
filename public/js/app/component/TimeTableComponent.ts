import { Component } from '@angular/core';
import { TimeTableService } from '../service/TimeTableService';
import { TimeRow } from '../entity/TimeRow';

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
          <tr *ngFor="let timeRow of timeRows; let i = index" id="{{'timeRow' + i}}">
            <td id="{{'timeRow' + i + 'date'}}">{{i + 1}}</td>
            <td><input id="{{'timeRow' + i + 'begin'}}" class="form-control" [(ngModel)]="timeRow.begin" (keyup)="calculate()"></td>
            <td><input id="{{'timeRow' + i + 'end'}}" class="form-control" [(ngModel)]="timeRow.end" (keyup)="calculate()"></td>
            <td><input id="{{'timeRow' + i + 'interval'}}" class="form-control" [(ngModel)]="timeRow.interval" (keyup)="calculate()"></td>
            <td><span id="{{'timeRow' + i + 'summary'}}">{{timeRow.summary}}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class TimeTableComponent {
  timeRows:Array<TimeRow>
  constructor(timeTableService:TimeTableService) {
    this.timeRows = timeTableService.timeRows;
  }
  calculate() {
    for (let i = 0; i < this.timeRows.length; i++) {
      let timeRow = this.timeRows[i];
      timeRow.summary = String(Number(timeRow.end) - Number(timeRow.begin) - Number(timeRow.interval));
    }
  }
}
