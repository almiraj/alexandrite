import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Modal } from 'angular2-modal/plugins/bootstrap';

import { LoginService } from '../service/LoginService';

@Component({
  selector: 'LoginComponent',
  template: `
    <br>
    <div class="form-inline">
      <div class="form-group">
        <input type="text" id="userId" class="form-control" placeholder="ユーザID (foo)" [(ngModel)]="userId">
      </div>
      <div class="form-group">
        <input type="password" id="password" class="form-control" placeholder="パスワード (bar)" [(ngModel)]="password">
      </div>
      <button class="btn btn-default" (click)="login()">ログイン</button>
    </div>
  `
})
export class LoginComponent {
  userId:String
  password:String

  constructor(
    public router:Router,
    public loginService:LoginService
  ) {}

  login() {
    this.loginService.login(this.userId, this.password)
      .then((userId:String) => {
        this.router.navigate(['/TimeTableInput', userId]);
      })
      .catch((e) => {
        alert(String(e));
      });
  }
}
