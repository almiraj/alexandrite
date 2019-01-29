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
        <div class="col-md-12 col-sm-12">
          <div class="tabs-left">
            <ul class="nav nav-tabs">
              <li class="active"><a href="#a" data-toggle="tab"><img src="./assets/login-office.png" width="80" height="80"></a></li>
              <li><a href="#b" data-toggle="tab"><img src="./assets/login-try.png" width="80" height="80"></a></li>
              <li><img src="./assets/login-wait.png" width="80" height="80"></li>
              <li><img src="./assets/login-wait.png" width="80" height="80"></li>
            </ul>
            <div class="tab-content">
              <div class="tab-pane active" id="a">
                <div class="form-group">
                  <input class="form-control" placeholder="Email address" type="text" [(ngModel)]="loginId">
                </div>
                <div class="form-group">
                  <input class="form-control" placeholder="Password" type="password" [(ngModel)]="loginPassword">
                </div>
                <div class="text-center">
                  <button id="login-button" class="btn btn-default" (click)="login()">Sign in</button>
                </div>
              </div>
              <div class="tab-pane" id="b">
                <p>お試しアカウントでログインすることができます。</p>
                <p>このアカウント情報は共有されるため、<br>入力した情報は誰かに閲覧されたり、編集される可能性があります。</p>
                <div class="text-center">
                  <button id="login-button" class="btn btn-default" (click)="tryLogin()">Sign in</button>
                </div>
              </div>
              <div class="tab-pane" id="c">CCC</div>
              <div class="tab-pane" id="d">DDD</div>
              <div class="tab-pane" id="e">EEE</div>
              <div class="tab-pane" id="f">FFF</div>
            </div><!-- /tab-content -->
          </div><!-- /tabbable -->
        </div><!-- /col -->
      </div><!-- /row -->
    </div><!-- /container -->
    `,
  styles: [
    '#header { width: 100%; height: 130px; background: center 70% no-repeat url("./assets/header-logo.png"); }',
    '#login-button { border-color: #333; }',
    // '.container { margin: 0 auto 3rem auto; }',
    // https://codepen.io/anon/pen/ZwONgX
    'h3 { margin-top: 0; }',
    '.nav-tabs { float: left; border-bottom: 0; width: 100px; }',
    '.nav-tabs li { float: none; margin: 0; text-align: center; height: 100px; padding-top: 10px; background-color: rgb(201,221,164); }',
    '.nav-tabs li a { margin-right: 0; border: 0; border-radius: 0; }',
    '.nav-tabs > li.active > a, .nav-tabs > li.active > a:hover, .nav-tabs > li.active > a:focus { border: 0; }',
    '.tab-content { margin-left: 45px; }',
    '.tab-content .tab-pane { display: none; background-color: #fff; padding: 1.6rem; padding-top: 3.2rem; overflow-y: auto; }',
    '.tab-content .active { display: block; }',
    '.list-group { width: 100%; }',
    '.list-group .list-group-item { height: 50px; }',
    '.list-group .list-group-item h4, .list-group .list-group-item span { line-height: 11px; }',
    '.nav { display: block; }',
    '.tab-content { width: 20rem; }',
    '.tab-pane { height: 20rem; }',
    '.nav-tabs li.active-li { background-color: #fff; }',
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
