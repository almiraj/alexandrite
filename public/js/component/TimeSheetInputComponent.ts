import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { TimeSheetComponent } from '../component/TimeSheetComponent';
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
      <nav class="navbar navbar-expand-xs fixed-top text-white font-weight-bold">
        <button id="modal-button" class="fa fa-lg fa-diamond" data-toggle="modal" data-target="#modal-window"></button>
        <div>
          <select id="year-month-select" [(ngModel)]="selectedYearMonth">
            <option *ngFor="let timeSheet of userInfoService.userInfo.timeSheets">
              {{timeSheet.yearMonth}}
            </option>
          </select>
        </div>
        <button id="save-button" (click)="save()">保存</button>
      </nav>
      <div id="timesheet">
        <TimeSheetComponent [selectedYearMonth]="selectedYearMonth"></TimeSheetComponent>
      </div>
      <!-- Modal -->
      <div class="modal" id="modal-window" tabindex="-1" role="dialog" aria-labelledby="modal-button" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" aria-hidden="true">設定</h5>
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
                      <input type="text" id="config-minutes-interval" [(ngModel)]="userInfoService.userInfo.userConfig.minutesInterval">分
                    </td>
                  </tr><tr>
                    <td>ログアウト</td>
                    <td>
                      <button id="config-logout-button" class="fa fa-user-times" (click)="logout()"></button>
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
    'nav { background-color: #69A5C4; }',
    '#timesheet { margin-top: 3rem; }',
    '#modal-button { color: rgb(248,242,251); font-weight: bold; background-color: transparent; border-style: none; height: 1.9rem; cursor: pointer; }',
    '#save-button   { color: rgb(248,242,251); font-weight: bold; background-color: transparent; border-style: none; height: 1.9rem; cursor: pointer; }',
    '#year-month-select { color: rgb(58,29,75); }',
    '#config-logout-button { color: #ccc; font-weight: normal; background-color: transparent; border: 1px solid #ccc; height: 1.9rem; cursor: pointer; }',
    '#config-minutes-interval { width: 4rem; }',
    '.modal-content { max-width: 25rem; }',
    '.modal-content select { border:1px solid #eee; border-radius: 0.3rem; }',
    '.modal-header, .modal-header span { color: rgb(248,242,251); background-color: #69A5C4; }',
  ]
})
export class TimeSheetInputComponent {
  @ViewChild(TimeSheetComponent) child:TimeSheetComponent
  selectedYearMonth:string

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private loginService:LoginService,
    private modalService:ModalService,
    private userInfoService:UserInfoService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const userId = params['userId'];
      this.userInfoService.selectUserInfo(userId)
        .then(() => {
          // 今月の勤務表を表示する
          this.selectedYearMonth = TimeSheet.getTodayYearMonth();
          // 今月の勤務表が取得できていなかった場合、先頭に今月の情報を追加する
          const timeSheets = this.userInfoService.userInfo.timeSheets;
          if (timeSheets.length == 0 || timeSheets[0].yearMonth != this.selectedYearMonth) {
            timeSheets.unshift(TimeSheet.createTodaySheet());
          }
          // 「分刻み間隔」を元に決定される時間と分のセレクトボックス情報を更新する
          this.userInfoService.reloadHourMinuteSelections();
        })
        .catch(e => this.modalService.alertError(e));
    });

    $(() => $('#modal-window').on('hide.bs.modal', e => {
      // 「分刻み間隔」を元に決定される時間と分のセレクトボックス情報を更新する
      this.userInfoService.reloadHourMinuteSelections();
      // 自身を再描画する
      this.child.reload();
    }));
  }
  save() {
    this.userInfoService.updateUserInfo()
      .then(() => this.modalService.alertSaved())
      .catch(e => this.modalService.alertError(e));
  }
  logout() {
    this.loginService.logout()
      .then(() => {
        location.href = '/';
      })
      .catch(e => this.modalService.alertError(e));
  }
}
