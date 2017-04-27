import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '../service/AccountService';
import { ModalService } from '../service/ModalService';
import { SetupService } from '../service/SetupService';
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
      <div class="form-group">
        <button class="btn btn-default" (click)="login()">ログイン</button>
      </div>
    </div>
    <div id="test-message">
      <p>admin/adminでログインするとアカウントの一覧が見れます。アカウントとパスワードは今のところ全て同じです。</p>
      <p><button class="btn btn-default" (click)="setup()">初期データ投入</button></p>
    </div>
  `,
  styles: [
    '#test-message {margin-top:2em;padding:0;color:red;}'
  ]
})
export class LoginComponent {
  userId:String
  password:String

  constructor(
    public router:Router,
    public accountService:AccountService,
    public setupService:SetupService,
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
  setup() {
    this.setupService.setup()
      .then(() => this.modalService.alert('初期化しました'))
      .catch(e => this.modalService.alertError(e));
  }
}
