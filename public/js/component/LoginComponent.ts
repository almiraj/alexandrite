import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../service/LoginService';
import { ModalService } from '../service/ModalService';
import { LoginInfo } from '../entity/LoginInfo';

@Component({
  selector: 'LoginComponent',
  template: `
    <br>
    <div class="form-inline">
      <div class="form-group">
        <input type="text" class="form-control" placeholder="ユーザID" [(ngModel)]="loginId">
      </div>
      <div class="form-group">
        <input type="password" class="form-control" placeholder="パスワード" [(ngModel)]="loginPassword">
      </div>
      <div class="form-group">
        <button class="btn btn-default" (click)="login()">ログイン</button>
      </div>
    </div>
  `
})
export class LoginComponent {
  loginId:string
  loginPassword:string

  constructor(
    public router:Router,
    public loginService:LoginService,
    public modalService:ModalService
  ) {}

  ngOnInit() {
    this.loginService.checkToken()
      .then(loginInfo => this.router.navigate(['/TimeSheetInput', loginInfo.loginId]))
      .catch(e => {/*NOP*/});
  }

  login() {
    this.loginService.login(this.loginId, this.loginPassword)
      .then(loginInfo => this.router.navigate(['/TimeSheetInput', loginInfo.loginId]))
      .catch(e => this.modalService.alertError(e));
  }
}
