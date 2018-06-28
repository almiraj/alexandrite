import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from '../service/LoginService';
import { ModalService } from '../service/ModalService';
import { LoginInfo } from '../entity/LoginInfo';

@Component({
  selector: 'LoginComponent',
  template: `
    <section class="main">
      <form class="form-1">
        <h5 id="form-title">
          <i class="fa fa-lg fa-diamond" aria-hidden="true"></i> Alexandrite
        </h5>
        <p class="field">
          <input type="text" name="loginId" [(ngModel)]="loginId" placeholder="E-mail">
          <i class="fa fa-lg fa-user" aria-hidden="true"></i>
        </p>
        <p class="field">
          <input type="password" name="loginPassword" [(ngModel)]="loginPassword" placeholder="Password">
          <i class="fa fa-lg fa-lock" aria-hidden="true"></i>
        </p>
        <p class="submit">
          <button (click)="login()"><i class="fa fa-lg fa-arrow-right"></i></button>
        </p>
      </form>
    </section>
  `,
  styles: [
    '/*https://tympanus.net/Tutorials/CustomLoginFormStyling/index.html*/',
    '*, *:after, *:before { -webkit-box-sizing: border-box; -moz-box-sizing: border-box; -ms-box-sizing: border-box; -o-box-sizing: border-box; box-sizing: border-box; padding: 0; margin: 0; }',
    '.clearfix:after { content: ""; display: table; clear: both; }',
    '.form-1 { /* Size & position */ width: 300px; margin: 58px auto 30px; padding: 10px; position: relative; /* For the submit button positioning */ /* Styles */ box-shadow: 0 0 1px rgba(0, 0, 0, 0.3), 0 3px 7px rgba(0, 0, 0, 0.3), inset 0 1px rgba(255,255,255,1), inset 0 -3px 2px rgba(0,0,0,0.25); border-radius: 5px; background: white; /* Fallback */ background: -moz-linear-gradient(#eeefef, #ffffff 10%); background: -ms-linear-gradient(#eeefef, #ffffff 10%); background: -o-linear-gradient(#eeefef, #ffffff 10%); background: -webkit-gradient(linear, 0 0, 0 100%, from(#eeefef), color-stop(0.1, #ffffff)); background: -webkit-linear-gradient(#eeefef, #ffffff 10%); background: linear-gradient(#eeefef, #ffffff 10%); }',
    '.form-1 .field { position: relative; /* For the icon positioning */ }',
    '.form-1 .field i { /* Size and position */ left: 0px; top: 0px; position: absolute; height: 36px; width: 36px; /* Line */ border-right: 1px solid rgba(0, 0, 0, 0.1); box-shadow: 1px 0 0 rgba(255, 255, 255, 0.7); /* Styles */ color: #777777; text-align: center; line-height: 42px; -webkit-transition: all 0.3s ease-out; -moz-transition: all 0.3s ease-out; -ms-transition: all 0.3s ease-out; -o-transition: all 0.3s ease-out; transition: all 0.3s ease-out; pointer-events: none; }',
    '.form-1 input[type=text], .form-1 input[type=password] { font-family: "Lato", Calibri, Arial, sans-serif; font-size: 1rem; font-weight: 400; text-shadow: 0 1px 0 rgba(255,255,255,0.8); /* Size and position */ width: 100%; padding: 10px 18px 10px 45px; /* Styles */ border: none; /* Remove the default border */ box-shadow: inset 0 0 5px rgba(0,0,0,0.1), inset 0 3px 2px rgba(0,0,0,0.1); border-radius: 3px; background: #f9f9f9; color: #777; -webkit-transition: color 0.3s ease-out; -moz-transition: color 0.3s ease-out; -ms-transition: color 0.3s ease-out; -o-transition: color 0.3s ease-out; transition: color 0.3s ease-out; }',
    '.form-1 input[type=text] { margin-bottom: 10px; }',
    '.form-1 input[type=text]:hover ~ i, .form-1 input[type=password]:hover ~ i { color: #52cfeb; }',
    '.form-1 input[type=text]:focus ~ i, .form-1 input[type=password]:focus ~ i { color: #42A2BC; }',
    '.form-1 input[type=text]:focus, .form-1 input[type=password]:focus, .form-1 button[type=submit]:focus { outline: none; }',
    '.form-1 .submit { /* Size and position */ width: 65px; height: 65px; position: absolute; top: 17px; right: -25px; padding: 10px; z-index: 2; /* Styles */ background: #ffffff; border-radius: 50%; box-shadow: 0 0 2px rgba(0,0,0,0.1), 0 3px 2px rgba(0,0,0,0.1), inset 0 -3px 2px rgba(0,0,0,0.2); }',
    '.form-1 .submit:after { /* Size and position */ content: ""; width: 10px; height: 10px; position: absolute; top: -2px; left: 30px; /* Styles */ background: #ffffff; /* Other masks trick */ box-shadow: 0 62px white, -32px 31px white; }',
    '.form-1 button { /* Size and position */ width: 100%; height: 100%; margin-top: -1px; /* Icon styles */ font-size: 1.4rem; line-height: 1.75; color: white; /* Styles */ border: none; /* Remove the default border */ border-radius: inherit; background: #52cfeb; /* Fallback */ background: -moz-linear-gradient(#52cfeb, #42A2BC); background: -ms-linear-gradient(#52cfeb, #42A2BC); background: -o-linear-gradient(#52cfeb, #42A2BC); background: -webkit-gradient(linear, 0 0, 0 100%, from(#52cfeb), to(#42A2BC)); background: -webkit-linear-gradient(#52cfeb, #42A2BC); background: linear-gradient(#52cfeb, #42A2BC); box-shadow: inset 0 1px 0 rgba(255,255,255,0.3), 0 1px 2px rgba(0,0,0,0.35), inset 0 3px 2px rgba(255,255,255,0.2), inset 0 -3px 2px rgba(0,0,0,0.1); cursor: pointer; }',
    '.form-1 button:hover, .form-1 button[type=submit]:focus { background: #52cfeb; -webkit-transition: all 0.3s ease-out; -moz-transition: all 0.3s ease-out; -ms-transition: all 0.3s ease-out; -o-transition: all 0.3s ease-out; transition: all 0.3s ease-out; }',
    '.form-1 button:active { background: #42A2BC; box-shadow: inset 0 0 5px rgba(0,0,0,0.3), inset 0 3px 4px rgba(0,0,0,0.3); }',
    '#form-title { color: #42A2BC; line-height: 3rem; margin-bottom: 3px; }',
    '#form-title i { color: #52cfeb; }'
  ]
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
