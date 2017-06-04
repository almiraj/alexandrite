import { Component, Input, OnChanges } from '@angular/core';

import { TimeSheet } from '../entity/TimeSheet';
import { DateRow } from '../entity/DateRow';

@Component({
  selector: 'TimeSheetComponent',
  template: `
    <h4 id="yyyymm"></h4>
    <div class="table-responsive">
      <table class="table table-bordered table-striped table-responsive">
        <thead class="thead-default">
          <tr id="timeHead">
            <th>日</th>
            <th>区分1</th>
            <th>区分2</th>
            <th colspan="2">業務時間</th>
            <th colspan="2">時間有給</th>
            <th colspan="2">非勤務</th>
            <th>深夜</th>
            <th>実働</th>
            <th>有給</th>
            <th>勤務</th>
            <th>業務内容</th>
            <th>作業工程</th>
            <th>備考</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let dateRow of dateRows; let i = index">
            <td style="text-align:right;">{{dateRow.date}}</td>
            <td><input class="form-control" [(ngModel)]="dateRow.type1"></td>
            <td><input class="form-control" [(ngModel)]="dateRow.type2"></td>
            <td><input class="form-control" [(ngModel)]="dateRow.begin"></td>
            <td><input class="form-control" [(ngModel)]="dateRow.end"></td>
            <td><input class="form-control" [(ngModel)]="dateRow.paidVacBegin"></td>
            <td><input class="form-control" [(ngModel)]="dateRow.paidVacEnd"></td>
            <td><input class="form-control" [(ngModel)]="dateRow.unpaidVacTime1"></td>
            <td><input class="form-control" [(ngModel)]="dateRow.unpaidVacTime2"></td>
            <td><span>{{dateRow | DateRowSummaryPipe:'nightOverTime'}}</span></td>
            <td><span>{{dateRow | DateRowSummaryPipe:'actualWorkTime'}}</span></td>
            <td><span>{{dateRow | DateRowSummaryPipe:'paidVacTime'}}</span></td>
            <td><span>{{dateRow | DateRowSummaryPipe:'paidWorkTime'}}</span></td>
            <td><input class="form-control" [(ngModel)]="dateRow.appendixDescription"></td>
            <td><input class="form-control" [(ngModel)]="dateRow.appendixPhase"></td>
            <td><input class="form-control" [(ngModel)]="dateRow.appendixRemarks"></td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: ['th { text-align:center; }']
})
export class TimeSheetComponent implements OnChanges {
  @Input() timeSheet:TimeSheet
  dateRows:Array<DateRow>
  ngOnChanges() {
    if (this.timeSheet) {
      this.dateRows = this.timeSheet.dateRows;
      document.getElementById("yyyymm").textContent = this.timeSheet.month.substring(0,4) + "/" + this.timeSheet.month.substring(4);
    }
  }
}
