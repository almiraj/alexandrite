import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

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
                <a class="nav-link" href="#google" data-toggle="tab">Google</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#trynow" data-toggle="tab">お試し</a>
              </li>
            </ul>
            <div class="tab-content">
              <div class="tab-pane active" id="office365">
                <p>Office 365のアカウントと連携して<br>ログインします。<br>パスワードは記憶されません。</p>
                <div class="form-group">
                  <input class="form-control" placeholder="Email address" type="email" [(ngModel)]="loginId">
                </div>
                <div class="form-group">
                  <input class="form-control" placeholder="Password" type="password" [(ngModel)]="loginPassword">
                </div>
                <div class="text-center">
                  <button id="login-button" class="btn" (click)="loginOffice()">Sign in</button>
                </div>
              </div>
              <div class="tab-pane" id="google">
                <p>Googleアカウントと連携して<br>ログインします。</p>
                <div class="text-center">
                  <button id="login-button" class="btn" (click)="loginGoogle()">Sign in</button>
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
    private angularFireAuth:AngularFireAuth,
    private ngZone: NgZone,
    private router:Router,
    private loginService:LoginService,
    private modalService:ModalService
  ) {}

  loginOffice() {
    this.loginService.login(this.loginId, this.loginPassword)
      .then(loginInfo => this.router.navigate(['/TimeSheetInput', loginInfo.loginId]))
      .catch(e => this.modalService.alertError(e));
  }
  loginGoogle() {
    if (window['plugins'] && window['plugins'].googleplus) {
      // モバイル用
      window['plugins'].googleplus.login(
        {
          scopes: 'profile email',
          webClientId: '304128882553-0pab03kdp5rl2860kn9gbv89t9o6hjrl.apps.googleusercontent.com',
          offline: false,
        },
        (authData:any) => {
          const credential = (<any>firebase.auth.GoogleAuthProvider).credential(authData.idToken);
          let user:firebase.User;
          let idToken:string;
          let loginInfo:LoginInfo;
          Promise.resolve()
            .then(() => firebase.auth().signInWithCredential(credential)).then(o => user = o)
            .then(() => user.getIdToken()).then(o => idToken = o)
            .then(() => this.loginService.login(authData.email, null, idToken)).then(o => loginInfo = o)
            .then(() => this.ngZone.run(() => this.router.navigate(['/TimeSheetInput', loginInfo.loginId])))
            .catch(e => this.modalService.alertError(e));
        },
        (msg:any) => {
          alert('error: ' + msg);
        }
      );
    } else {
      // WEB用
      const provider = new firebase.auth.GoogleAuthProvider();
      let credential:firebase.auth.UserCredential;
      let idToken:string;
      let loginInfo:LoginInfo;
      Promise.resolve()
        .then(() => this.angularFireAuth.auth.signInWithPopup(provider)).then(o => credential = o)
        .then(() => credential.user.getIdToken()).then(o => idToken = o)
        .then(() => this.loginService.login(credential.user.email, null, idToken)).then(o => loginInfo = o)
        .then(() => this.ngZone.run(() => this.router.navigate(['/TimeSheetInput', loginInfo.loginId])))
        .catch(e => this.modalService.alertError(e));
    }
  }
  tryLogin() {
    this.loginService.login('trynow', 'trynow')
      .then(loginInfo => this.router.navigate(['/TimeSheetInput', loginInfo.loginId]))
      .catch(e => this.modalService.alertError(e));
  }
}
