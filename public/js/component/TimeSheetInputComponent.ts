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
        <a href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i class="fa fa-diamond" aria-hidden="true"></i>
        </a>
        <div class="collapse navbar-collapse dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <!-- Button trigger modal -->
          <a href="#" class="dropdown-item" data-toggle="modal" data-target="#exampleModalCenter">勤務時間設定</a>
        </div>
        <div>
          <select [(ngModel)]="selectedYearMonth">
            <option *ngFor="let timeSheet of userInfoService.userInfo.timeSheets | ReversePipe">
              {{timeSheet.yearMonth}}
            </option>
          </select>
        </div>
        <a href="#" id="saveButton" (click)="save()">保存</a>
      </nav>
      <div id="timesheet">
        <TimeSheetComponent [selectedYearMonth]="selectedYearMonth"></TimeSheetComponent>
      </div>
      <!-- Modal -->
      <div class="modal" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">勤務時間設定</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <table class="table table-striped">
                <tbody>
                  <tr>
                    <td>勤務時間</td>
                    <td>
                      <select [(ngModel)]="userInfoService.userInfo.userConfig.beginHour"><option *ngFor="let h of allHours" [value]="h">{{h | FillZeroPipe:2}}</option></select
                      ><select [(ngModel)]="userInfoService.userInfo.userConfig.beginMinute"><option *ngFor="let m of allMinutes" [value]="m">{{m | FillZeroPipe:2}}</option></select>
                      ～
                      <select [(ngModel)]="userInfoService.userInfo.userConfig.endHour"><option *ngFor="let h of allHours" [value]="h">{{h | FillZeroPipe:2}}</option></select
                      ><select [(ngModel)]="userInfoService.userInfo.userConfig.endMinute"><option *ngFor="let m of allMinutes" [value]="m">{{m | FillZeroPipe:2}}</option></select>
                    </td>
                  </tr><tr>
                    <td>休憩時間</td>
                    <td>
                      <select [(ngModel)]="userInfoService.userInfo.userConfig.breakHour"><option *ngFor="let h of allHours" [value]="h">{{h | FillZeroPipe:2}}</option></select
                      ><select [(ngModel)]="userInfoService.userInfo.userConfig.breakMinute"><option *ngFor="let m of allMinutes" [value]="m">{{m | FillZeroPipe:2}}</option></select>
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
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    'nav { background-color: #17a2b8; }',
    '#timesheet { margin-top: 3rem; }',
    '.fa-diamond, #saveButton { color: #ffffff; font-weight: bold; }',
    '.input-time { width: 4rem; }'
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
          this.selectedYearMonth = this.userInfoService.userInfo.timeSheets[this.userInfoService.userInfo.timeSheets.length - 1].yearMonth;
        })
        .catch(e => this.modalService.alertError(e));
    });

    $(() => $('#exampleModalCenter').on('hide.bs.modal', e => {
      this.child.reload();
    }));
  }
  save() {
    this.userInfoService.updateUserInfo()
      .then(() => this.modalService.alertSaved())
      .catch(e => this.modalService.alertError(e));
  }
}
