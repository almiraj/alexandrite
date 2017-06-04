import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TimeSheet } from '../entity/TimeSheet';
import { ModalService } from '../service/ModalService';
import { TimeSheetService } from '../service/TimeSheetService';
import { TimeSheetUtils } from '../util/TimeSheetUtils';

@Component({
  selector: 'TimeSheetInputComponent',
  template: `
    <div class="row">
      <div class="col-md-2">
        <ul class="list-unstyled">
          <li *ngFor="let timeSheet of timeSheets | ReversePipe">
            <button class="btn btn-default" (click)="selectMonth(timeSheet.month)">{{timeSheet.month}}</button>
          </li>
        </ul>
      </div>
      <div class="col-md-10">
        <div>
          <button class="btn btn-default" (click)="save()">サーバへ保存</button>
          <a class="btn btn-default pull-right" id="download" href="#" download="time_sheet.csv" (click)="saveCSV()">CSV保存</a>
        </div>
        <TimeSheetComponent [timeSheet]=selectedTimeSheet></TimeSheetComponent>
      </div>
    </div>
  `
})
export class TimeSheetInputComponent implements OnInit {
  userId:String
  timeSheets:Array<TimeSheet>
  selectedTimeSheet:TimeSheet

  constructor(
    public route:ActivatedRoute,
    public modalService:ModalService,
    public timeSheetService:TimeSheetService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = String(params['userId']);
      this.timeSheetService.selectAllTimeSheets(this.userId)
        .then((timeSheets:Array<TimeSheet>) => {
          if (!TimeSheetUtils.findThisMonthSheet(timeSheets)) {
            timeSheets.push(TimeSheetUtils.createThisMonthSheet());
          }
          this.timeSheets = timeSheets;
          this.selectedTimeSheet = timeSheets[timeSheets.length - 1];
        })
        .catch(e => this.modalService.alertError(e));
    });
  }
  selectMonth(selectedMonth:String) {
    this.selectedTimeSheet = this.timeSheets.find((timeSheet:TimeSheet) => {
      return timeSheet.month == selectedMonth;
    });
  }
  save() {
    this.timeSheetService.updateTimeSheet(this.userId, this.selectedTimeSheet)
      .then(() => this.modalService.alertSaved())
      .catch(e => this.modalService.alertError(e));
  }
  saveCSV() {
    const fileName = this.selectedTimeSheet.month + ".csv";
    // CSVの先頭行にデータ名
    let data = "date,type1,type2,begin,end,paidVacBegin,paidVacEnd,nightOverTime,actualWorkTime,paidVacTime,paidWorkTime,appendixDescription,appendixPhase,appendixRemarks\n";
    // 各データを格納
    for (let row of this.selectedTimeSheet.dateRows) {
      data += row.date + "," + row.type1 + "," + row.type2 + "," +
              row.begin + "," + row.end + "," + row.paidVacBegin + "," + row.paidVacEnd + "," +
              row.nightOverTime + "," + row.actualWorkTime + "," + row.paidVacTime + "," +
              row.paidWorkTime + "," + row.appendixDescription + "," + row.appendixPhase + "," +
              row.appendixRemarks + "\n";
    }
    // データ未入力のセルが undefined なので消す
    data = data.replace(/undefined/g,"");
    
    let blob = new Blob([data], { "type": "text/plain" });

    if (window.navigator.msSaveBlob) {
      window.navigator.msSaveBlob(blob, fileName);
      window.navigator.msSaveOrOpenBlob(blob, fileName); // msSaveOrOpenBlobの場合はファイルを保存せずに開ける
    } else {
      let elm = <HTMLAnchorElement>document.getElementById("download");
      elm.download = fileName;
      elm.href = window.URL.createObjectURL(blob);
    }
  }
}
