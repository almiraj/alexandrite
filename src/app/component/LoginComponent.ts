import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { glyphicons } from 'glyphicons';

import { LoginService } from '../service/LoginService';
import { ModalService } from '../service/ModalService';
import { LoginInfo } from '../entity/LoginInfo';

@Component({
  selector: 'LoginComponent',
  template: `
    <div id="header"></div>
    <div class="container">
      <div class="row">
        <div id="col" class="col-md-6 col-sm-8">
          <div id="tabs">
            <ul class="nav nav-pills">
              <li class="nav-item">
                <a class="nav-link active" href="#office365" data-toggle="tab">Office 365</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#trynow" data-toggle="tab">お試し</a>
              </li>
            </ul>
            <div class="tab-content">
              <div class="tab-pane active" id="office365">
                <div class="form-group">
                  <input class="form-control" placeholder="Email address" type="email" [(ngModel)]="loginId">
                </div>
                <div class="form-group">
                  <input class="form-control" placeholder="Password" type="password" [(ngModel)]="loginPassword">
                </div>
                <div class="text-center">
                  <button id="login-button" class="btn" (click)="login()">Sign in</button>
                </div>
              </div>
              <div class="tab-pane" id="trynow">
                <p>お試しアカウントで<br>ログインすることができます。</p>
                <p>このアカウント情報は共有されるため、<br>入力した情報は誰かに閲覧されたり、<br>編集される可能性があります。</p>
                <div class="text-center">
                  <button id="login-button" class="btn" (click)="tryLogin()">Sign in</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    '#header { width: 100%; height: 130px; background: center 70% no-repeat url("./assets/header-logo.png"); }',
    '#login-button { border-color: #333; margin-top: 0.6rem; }',
    '#col { margin: 3rem auto auto auto; }',
    '.tab-pane { padding: 2rem; text-align: center; }',
    '.nav-link.active { background-color: #69A5C4;  }',
    '.nav-link.active a { color: #fff; }',
    'a { color: #69A5C4; }',
    '.tab-pane { background-color: #69A5C4; }',
    '.tab-pane p { color: #fff; }',
    '.nav-pills .nav-link { border-radius: 0.25rem 0.25rem 0 0; }',
    '.btn:focus, .btn.focus { box-shadow: 0 0 0 0.4rem rgba(238, 182, 215, 0.25); }'
    
  ]
})
export class LoginComponent {
  loginId:string
  loginPassword:string

  constructor(
    private router:Router,
    private loginService:LoginService,
    private modalService:ModalService
  ) {}

  ngAfterViewInit() {
    // タブの設定を行う
    $('.tab-pane').css({ height: $('.nav-tabs').height() });
    // $('.nav-tabs').css({ 'margin-left': (($('body').innerWidth() - $('.tab-content').innerWidth()) / 2 - $('.nav-tabs li').innerWidth()) + 'px' });
    $('.nav-tabs li.active').addClass('active-li');
    $('.nav-tabs [data-toggle="tab"]').on('shown.bs.tab', () => {
      const lis = $('.nav-tabs li');
      for (let i = 0; i < lis.length; i++) {
        const li = $(lis.get(i));
        console.log(li.has('.active'));
        (li.children('.active').length ? li.addClass('active-li') : li.removeClass('active-li'));
      }
    });
  }
  login() {
    this.loginService.login(this.loginId, this.loginPassword)
      .then(loginInfo => this.router.navigate(['/TimeSheetInput', loginInfo.loginId]))
      .catch(e => this.modalService.alertError(e));
  }
  tryLogin() {
    this.loginService.login('user@user.user', 'user')
      .then(loginInfo => this.router.navigate(['/TimeSheetInput', loginInfo.loginId]))
      .catch(e => this.modalService.alertError(e));
  }
}
