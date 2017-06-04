import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TimeSheet } from '../entity/TimeSheet';
import { DateRow } from '../entity/DateRow';
import { ModalService } from '../service/ModalService';
import { TimeSheetService } from '../service/TimeSheetService';
import { TimeSheetUtils } from '../util/TimeSheetUtils';

import { read, IWorkBook, IWorkSheet } from 'ts-xlsx';

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
          <div style="border:#C0C0C0 solid 1px;float:right;border-radius: 5px;padding:2px;">
            勤務表(xlsx or xlsm)を開く
            <input id="load-file" type="file" accept=".xlsx,.xlsm">
          </div>
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
    
    document.getElementById("load-file").addEventListener("change",  this.onXlsxSelected.bind(this));
  }
  
  onXlsxSelected(evt:any){
    const reader = new FileReader();
    const this_ = this;
    const fileName = evt.target.files[0].name;
    reader.readAsBinaryString(evt.target.files[0]);
    reader.onload = function(ev:any){
      const wb: IWorkBook = read(reader.result, {type:"binary"});
      const ws: IWorkSheet = wb.Sheets[wb.SheetNames[0]];
      
      if("G1" in ws == false)
      {
        alert(fileName + "\nError:セル G1 が空です");
        return;
      }
      
      const dt: Date = new Date(1900,1,1);
      dt.setDate(Number(ws.G1.v) - 1);
      const month:String = dt.getFullYear().toString() + (dt.getMonth()<10? "0":"") + dt.getMonth().toString();

      const idx = this_.timeSheets.findIndex((timeSheet:TimeSheet) => {
        return timeSheet.month == month;
      });
      if(idx >= 0)
      {
        this_.timeSheets.splice(idx, 1);
      }
      
      const ts = new TimeSheet();
      ts.month = month;
      ts.dateRows = new Array<DateRow>();
      for(let i = 0; i <31; i++)
      {
        const dr = new DateRow();
        dr.date = (1 + i).toString();
        const r = (6 + i).toString();
        dr.type1            = TimeSheetInputComponent.getSheetData(ws, "E"+r);
        dr.type2            = TimeSheetInputComponent.getSheetData(ws, "F"+r);
        dr.begin          = TimeSheetInputComponent.getSheetTime(ws, "G"+r);
        dr.end            = TimeSheetInputComponent.getSheetTime(ws, "H"+r);
        dr.paidVacBegin   = TimeSheetInputComponent.getSheetTime(ws, "I"+r);
        dr.paidVacEnd     = TimeSheetInputComponent.getSheetTime(ws, "J"+r);
        dr.unpaidVacTime1 = TimeSheetInputComponent.getSheetTime(ws, "U"+r);
        dr.unpaidVacTime2 = TimeSheetInputComponent.getSheetTime(ws, "V"+r);
        dr.appendixDescription = TimeSheetInputComponent.getSheetData(ws, "AD"+r);
        dr.appendixPhase       = TimeSheetInputComponent.getSheetData(ws, "AG"+r);
        dr.appendixRemarks     = TimeSheetInputComponent.getSheetData(ws, "AH"+r);
        ts.dateRows.push( dr );
      }
      this_.selectedTimeSheet = ts;
      this_.timeSheets.push(ts);
      console.log(this_.selectedTimeSheet);
      (<HTMLInputElement>document.getElementById("load-file")).value = "";
    };
  }
  
  static getSheetTime(ws:IWorkSheet, cell:string):String {
    return (cell in ws) ? this.DateToString(ws[cell].v) : "";
  }
  static getSheetData(ws:IWorkSheet, cell:string):String {
    return (cell in ws) ? ws[cell].v : "";
  }
  
  static DateToString(dts:string): String {
    const h = Math.floor( Number(dts) * 24 );
    const m = Math.floor( Number(dts) * 24 * 60 ) % 60;
    return ((h<10? "0": "") + h) + ((m<10? "0": "") + m);
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
