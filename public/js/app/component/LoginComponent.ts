import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Modal } from 'angular2-modal/plugins/bootstrap';

import { AccountService } from '../service/AccountService';
import { ModalService } from '../service/ModalService';

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
    <div class="form-inline col-md-2" style="margin-top:3em;padding:0;">
      <table class="table table-bordered">
        <tr><th>ユーザID</th><th>パスワード</th></tr>
        <tr><td>admin</td><td>admin</td></tr>
        <tr><td>foo</td><td>bar</td></tr>
      </table>
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
      .then((userId:String) => {
        this.router.navigate(['/TimeSheetInput', userId]);
      })
      .catch(e => this.modalService.alertError(e));
  }
}
