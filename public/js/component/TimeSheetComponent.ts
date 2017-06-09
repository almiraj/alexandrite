import { Component, Input, OnChanges, DoCheck } from '@angular/core';

import { TimeSheet } from '../entity/TimeSheet';
import { DateRow } from '../entity/DateRow';

@Component({
  selector: 'TimeSheetComponent',
  template: `
    <h4 id="yyyymm"></h4>
    <div class="table-responsive">
      <table class="table table-bordered table-responsive" id="time-sheet-table">
        <thead class="thead-default">
          <tr id="timeHead">
            <th>日</th>
            <th>曜日</th>
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
            <td style="padding:0;text-align:right;">{{dateRow.date}}</td>
            <td style="padding:0px 2px;text-align:right;"></td>
            <td style="padding:0;"><input class="form-control" [(ngModel)]="dateRow.type1"></td>
            <td style="padding:0;"><input class="form-control" [(ngModel)]="dateRow.type2"></td>
            <td style="padding:0;"><input class="form-control" [(ngModel)]="dateRow.begin"></td>
            <td style="padding:0;"><input class="form-control" [(ngModel)]="dateRow.end"></td>
            <td style="padding:0;"><input class="form-control" [(ngModel)]="dateRow.paidVacBegin"></td>
            <td style="padding:0;"><input class="form-control" [(ngModel)]="dateRow.paidVacEnd"></td>
            <td style="padding:0;"><input class="form-control" [(ngModel)]="dateRow.unpaidVacTime1"></td>
            <td style="padding:0;"><input class="form-control" [(ngModel)]="dateRow.unpaidVacTime2"></td>
            <td style="padding:0px 4px;"><span>{{dateRow | DateRowSummaryPipe:'nightOverTime'}}</span></td>
            <td style="padding:0px 4px;"><span>{{dateRow | DateRowSummaryPipe:'actualWorkTime'}}</span></td>
            <td style="padding:0px 4px;"><span>{{dateRow | DateRowSummaryPipe:'paidVacTime'}}</span></td>
            <td style="padding:0px 4px;"><span>{{dateRow | DateRowSummaryPipe:'paidWorkTime'}}</span></td>
            <td style="padding:0;"><input class="form-control" [(ngModel)]="dateRow.appendixDescription"></td>
            <td style="padding:0;"><input class="form-control" [(ngModel)]="dateRow.appendixPhase"></td>
            <td style="padding:0;"><input class="form-control" [(ngModel)]="dateRow.appendixRemarks"></td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: ['th { text-align:center; } input { min-width:60px; height:23px; border-radius:0px; text-align:center; } }']
})
export class TimeSheetComponent implements OnChanges, DoCheck {
  @Input() timeSheet:TimeSheet
  dateRows:Array<DateRow>
  ngOnChanges() {
    if (this.timeSheet) {
      this.dateRows = this.timeSheet.dateRows;
      document.getElementById("yyyymm").textContent = this.timeSheet.month.substring(0,4) + "/" + this.timeSheet.month.substring(4);
    }
  }
  ngDoCheck() {
    if (this.timeSheet) {
      const tb = <HTMLTableElement>document.getElementById("time-sheet-table");
      // テーブルのデータ行が生成される前にも ngDoCheck が呼ばれるため、データ行がある場合のみ処理する
      if (tb != undefined && tb.tBodies[0].rows.length > 0)
      {
        const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
        const y = this.timeSheet.month.substring(0,4);
        const m = this.timeSheet.month.substring(4);
        const firstDay = (new Date(Number(y), Number(m)-1, 1)).getDay();
        // 各行に曜日を入れ、土日には色を付ける
        for(let i=0; i < tb.tBodies[0].rows.length; i++)
        {
          const tr = tb.tBodies[0].rows[i];
          const day = (firstDay + i) % 7;
          tr.children[1].textContent = weekdays[ day ];
          if(day == 0 || day == 6)
          {
            tr.bgColor = day==0? "#FFE0E0": "#E0FFFF";
            for(let j=0; j < tr.children.length; j++)
            {
              const td = tr.children[j];
              if(td.children.length > 0)
              {
                const tdc = <HTMLInputElement>td.children[0];
                tdc.style.backgroundColor = tr.bgColor;
              }
            }
          }
        }
      }
    }
  }
}
