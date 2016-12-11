import { Component } from '@angular/core';
import { TimeRowSummaryPipe } from '../pipe/TimeRowSummaryPipe';
import { TimeTableService } from '../service/TimeTableService';
import { TimeRow } from '../entity/TimeRow';

@Component({
  selector: 'TimeTableComponent',
  pipes: [TimeRowSummaryPipe],
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
          <tr *ngFor="let timeRow of timeTableService.timeRows; let i = index" id="{{'timeRow' + i}}">
            <td id="{{'timeRow' + i + 'date'}}">{{timeRow.date}}</td>
            <td><input id="{{'timeRow' + i + 'begin'}}" class="form-control" [(ngModel)]="timeRow.begin"></td>
            <td><input id="{{'timeRow' + i + 'end'}}" class="form-control" [(ngModel)]="timeRow.end"></td>
            <td><input id="{{'timeRow' + i + 'interval'}}" class="form-control" [(ngModel)]="timeRow.interval"></td>
            <td><span id="{{'timeRow' + i + 'summary'}}">{{timeRow | TimeRowSummaryPipe}}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class TimeTableComponent /*implements ngOnChanges*/ {
  // @Input
  timeTableService:TimeTableService
  constructor(timeTableService:TimeTableService) {
    this.timeTableService = timeTableService;
    this.timeTableService.selectTimeSheet().catch(e => { alert(e); });
  }
}
