import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountInfo } from '../entity/AccountInfo';
import { AccountService } from '../service/AccountService';
import { ModalService } from '../service/ModalService';

@Component({
  selector: 'UsersComponent',
  template: `
    <br>
    <div class="form-inline">
      <div class="form-group">
        <h4>アカウント一覧</h4>
        <table class="table table-bordered">
          <tr *ngFor="let accountInfo of accountInfos">
            <td>{{accountInfo.userId}}</td>
            <td class="text-center"><button *ngIf="!accountInfo.isAdmin" class="btn btn-default" (click)="deleteAccount(accountInfo)"><span class="glyphicon glyphicon-trash"></span></button></td>
          </tr>
          <tr>
            <td><input type="text" placeholder="ユーザID" [(ngModel)]="newUserId"></td>
            <td><button class="btn btn-default" (click)="addAccount()">ユーザー追加</button>
            </td>
          </tr>
        </table>
      </div>
  `
})
export class AccountComponent implements OnInit {
  accountInfos:Array<AccountInfo>
  newUserId:String

  constructor(
    public router:Router,
    public accountService:AccountService,
    public modalService:ModalService
  ) {}

  ngOnInit() {
    this.getAllAccounts();
  }

  getAllAccounts() {
    this.accountService.getAllAccounts()
      .then((accountInfos:Array<AccountInfo>) => {
        this.accountInfos = accountInfos;
      })
      .catch(e => this.modalService.alertError(e));
  }

  addAccount() {
    this.accountService.addAccount(this.newUserId)
      .then((accountInfo:AccountInfo) => {
        this.accountInfos.push(accountInfo);
        this.newUserId = '';
        this.modalService.alert('パスワードは<br>アカウント名と同じです');
        this.modalService.alertAdded();
      })
      .catch(e => this.modalService.alertError(e));
  }

  deleteAccount(accountInfo:AccountInfo) {
    this.accountService.deleteAccount(accountInfo.userId)
      .then(() => {
        this.accountInfos = this.accountInfos.filter(o => o.userId != accountInfo.userId);
        this.modalService.alertDeleted();
      })
      .catch(e => this.modalService.alertError(e));
  }
}
