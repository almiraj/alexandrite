import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TimeSheetComponent } from '../component/TimeSheetComponent';
import { DateRow } from '../entity/DateRow';
import { TimeSheet } from '../entity/TimeSheet';
import { UserConfig } from '../entity/UserConfig';
import { UserInfo } from '../entity/UserInfo';
import { LoginService } from '../service/LoginService';
import { ModalService } from '../service/ModalService';
import { UserInfoService } from '../service/UserInfoService';

@Component({
  selector: 'TimeSheetInputComponent',
  template: `
    <div *ngIf="userInfoService.userInfo">
      <nav class="navbar navbar-expand-xs fixed-top bg-primary text-white font-weight-bold">
        <button id="configButton" class="fa fa-diamond" data-toggle="modal" data-target="#userConfigModal"></button>
        <div>
          <select [(ngModel)]="selectedYearMonth">
            <option *ngFor="let timeSheet of userInfoService.userInfo.timeSheets">
              {{timeSheet.yearMonth}}
            </option>
          </select>
        </div>
        <button id="saveButton" (click)="save()">保存</button>
      </nav>
      <div id="timesheet">
        <TimeSheetComponent [selectedYearMonth]="selectedYearMonth"></TimeSheetComponent>
      </div>
      <!-- Modal -->
      <div class="modal" id="userConfigModal" tabindex="-1" role="dialog" aria-labelledby="userConfigModalTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">設定</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <table class="table table-striped">
                <tbody>
                  <tr>
                    <td>基本勤務時間</td>
                    <td>
                      <select [(ngModel)]="userInfoService.userInfo.userConfig.beginHour"><option *ngFor="let h of userInfoService.hourSelections" [value]="h">{{h | FillZeroPipe:2}}</option></select
                      ><select [(ngModel)]="userInfoService.userInfo.userConfig.beginMinute"><option *ngFor="let m of userInfoService.minuteSelections" [value]="m">{{m | FillZeroPipe:2}}</option></select>
                      ～
                      <select [(ngModel)]="userInfoService.userInfo.userConfig.endHour"><option *ngFor="let h of userInfoService.hourSelections" [value]="h">{{h | FillZeroPipe:2}}</option></select
                      ><select [(ngModel)]="userInfoService.userInfo.userConfig.endMinute"><option *ngFor="let m of userInfoService.minuteSelections" [value]="m">{{m | FillZeroPipe:2}}</option></select>
                    </td>
                  </tr><tr>
                    <td>休憩時間</td>
                    <td>
                      <select [(ngModel)]="userInfoService.userInfo.userConfig.breakHour"><option *ngFor="let h of userInfoService.hourSelections" [value]="h">{{h | FillZeroPipe:2}}</option></select
                      ><select [(ngModel)]="userInfoService.userInfo.userConfig.breakMinute"><option *ngFor="let m of userInfoService.minuteSelections" [value]="m">{{m | FillZeroPipe:2}}</option></select>
                    </td>
                  </tr><tr>
                    <td>分刻み間隔</td>
                    <td>
                    <input type="text" class="input-time" [(ngModel)]="userInfoService.userInfo.userConfig.minutesInterval">分
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    'nav { background-color: #17a2b8; }',
    '#timesheet { margin-top: 3rem; }',
    '#configButton, #saveButton { color: #fff; font-weight: bold; background-color: transparent; border: 1px solid #fff; height: 1.9rem; cursor: pointer; }',
    '#configButton { width: 1.9rem; }',
    '.input-time { width: 4rem; }',
    '.modal-content { max-width: 25rem; }'
  ]
})
export class TimeSheetInputComponent {
  @ViewChild(TimeSheetComponent) child:TimeSheetComponent
  selectedYearMonth:string

  constructor(
    public route:ActivatedRoute,
    public loginService:LoginService,
    public modalService:ModalService,
    public userInfoService:UserInfoService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const userId = params['userId'];
      this.userInfoService.selectUserInfo(userId)
        .then(() => {
          this.selectedYearMonth = this.userInfoService.userInfo.timeSheets[0].yearMonth;
        })
        .catch(e => this.modalService.alertError(e));
    });

    $(() => $('#userConfigModal').on('hide.bs.modal', e => {
      this.userInfoService.reloadHourMinuteSelections();
      this.child.reload();
    }));
  }
  save() {
    this.userInfoService.updateUserInfo()
      .then(() => this.modalService.alertSaved())
      .catch(e => this.modalService.alertError(e));
  }
}
