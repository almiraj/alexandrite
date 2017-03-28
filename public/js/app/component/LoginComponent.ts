import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Modal } from 'angular2-modal/plugins/bootstrap';

import { AccountService } from '../service/AccountService';
import { ModalService } from '../service/ModalService';
import { AccountInfo } from '../entity/AccountInfo';

@Component({
  selector: 'LoginComponent',
  template: `
    <br>
    <div class="form-inline">
      <div class="form-group">
        <input type="text" id="userId" class="form-control" placeholder="ユーザID" [(ngModel)]="userId">
      </div>
      <div class="form-group">
        <input type="password" id="password" class="form-control" placeholder="パスワード" [(ngModel)]="password">
      </div>
      <button class="btn btn-default" (click)="login()">ログイン</button>
    </div>
    <div style="margin-top:3em;padding:0;">
      <span>admin/adminでログインすると、アカウントの一覧が見れます。アカウントとパスワードは今のところ全て同じです。</span>
    </div>
  `
})
export class LoginComponent {
  userId:String
  password:String

  constructor(
    public router:Router,
    public accountService:AccountService,
    public modalService:ModalService
  ) {}

  login() {
    this.accountService.login(this.userId, this.password)
      .then((accountInfo:AccountInfo) => {
        if (accountInfo.isAdmin) {
          this.router.navigate(['/Account']);
        } else {
          this.router.navigate(['/TimeSheetInput', accountInfo.userId]);
        }
      })
      .catch(e => this.modalService.alertError(e));
  }
}
