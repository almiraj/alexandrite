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
        <input type="text" id="loginId" class="form-control" placeholder="ユーザID" [(ngModel)]="loginId">
      </div>
      <div class="form-group">
        <input type="password" id="loginPassword" class="form-control" placeholder="パスワード" [(ngModel)]="loginPassword">
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
    const loginToken = localStorage.getItem('loginToken');
    if (loginToken) {
      this.loginService.checkToken(this.loginId, loginToken)
        .then(() => this.router.navigate(['/TimeSheetInput', this.loginId]))
        .catch(e => {/*NOP*/});
    }
  }
  login() {
    this.loginService.login(this.loginId, this.loginPassword)
      .then((accountInfo:LoginInfo) => {
        localStorage.setItem('loginToken', accountInfo.loginToken);
        this.router.navigate(['/TimeSheetInput', accountInfo.loginId]);
      })
      .catch(e => {
        if (String(e).includes('Missing credentials')) {
          this.modalService.alertError('ユーザIDまたはパスワードが違います');
        } else {
          this.modalService.alertError(e);
        }
      });
  }
}
