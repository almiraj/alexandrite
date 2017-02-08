import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Modal } from 'angular2-modal/plugins/bootstrap';

import { LoginService } from '../service/LoginService';
import { LoginEntity } from '../entity/LoginEntity';

@Component({
  selector: 'LoginComponent',
  providers: [LoginService],
  template: `
    <br>
    <div class="form-inline">
      <div class="form-group">
        <input type="text" id="userId" class="form-control" placeholder="ユーザID (foo)"
          [(ngModel)]="loginService.loginInfo.userId">
      </div>
      <div class="form-group">
        <input type="password" id="password" class="form-control" placeholder="パスワード (bar)"
          [(ngModel)]="loginService.loginInfo.password">
      </div>
      <button class="btn btn-default" (click)="login()">ログイン</button>
    </div>
  `
})
export class LoginComponent {
  loginService: LoginService
  constructor(private router: Router, loginService: LoginService) {
    this.loginService = loginService;
  }
  login() {
    this.loginService.login().then((userId:String) => {
      this.router.navigate(['/TimeTableInput', userId]);
    }).catch(e => {
      alert(e);
    });
  }
}
