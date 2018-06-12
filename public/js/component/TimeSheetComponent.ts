import { Component, Input, OnChanges } from '@angular/core';

import { TimeSheet } from '../entity/TimeSheet';
import { DateRow } from '../entity/DateRow';

@Component({
  selector: 'TimeSheetComponent',
  template: `
    <div class="table-responsive">
      <table class="table table-striped table-responsive">
        <thead>
          <tr>
            <th></th>
            <th>開始</th>
            <th>終了</th>
            <th class="d-none d-sm-table-cell">有給</th>
            <th class="d-none d-sm-table-cell">休憩</th>
            <th class="d-none d-sm-table-cell">備考</th>
            <th class="d-none d-sm-table-cell">計</th>
            <th class="d-sm-none"></th>
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
            <td class="d-none d-sm-table-cell text-nowrap">
              <select [(ngModel)]="dateRow.intervalHour"><option value=""></option><option value="午前休">午前休</option><option value="午後休">午後休</option></select>
            </td>
            <td class="d-none d-sm-table-cell text-nowrap">
              <select [(ngModel)]="dateRow.intervalHour"><option *ngFor="let h of allHours" [value]="h">{{h}}</option></select
              ><select [(ngModel)]="dateRow.intervalMinute"><option *ngFor="let m of allMinutes" [value]="m">{{m}}</option></select>
            </td>
            <td class="d-none d-sm-table-cell text-nowrap">
              <input type="text" style="width:12rem;">
            </td>
            <td class="d-none d-sm-table-cell text-nowrap">
              {{dateRow | DateRowSummaryPipe | HourMinutePipe}}
            </td>
            <td class="d-sm-none text-nowrap">
              <!-- Button trigger modal -->
              <a (click)="openModal('#exampleModalCenter' + i)">
                <i class="fa fa-window-restore" aria-hidden="true"></i>
              </a>
              <!-- Modal -->
              <div class="modal" id="exampleModalCenter{{i}}" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalLongTitle">{{timeSheet.month | YmdPipe:dateRow.date}}</h5>
                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
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
                            <td><input type="text" style="width:12rem;"></td>
                          </tr><tr>
                            <td>計</td>
                            <td>{{dateRow | DateRowSummaryPipe | HourMinutePipe}}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                      <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [
    'th { font-weight: normal; }',
    'th, td { padding: 2px 4px; }',
    'select { border:1px solid #eee; border-radius: 0.3rem; }'
  ]
})
export class TimeSheetComponent implements OnChanges {
  @Input() timeSheet:TimeSheet
  allHours:Array<String> = []
  allMinutes:Array<String> = []
  dateRows:Array<DateRow>
  constructor() {
    const minutesInterval = 15;
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
  openModal(modalId:String) {
    // ngForの中では宣言的にモーダルを作れないので、click時に明示的にモーダルを開く
    const element:any = $(modalId);
    element.modal();
  }
}
