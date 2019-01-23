import { NgModule, Injectable } from '@angular/core';
import { RouterModule, Routes, Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './component/AppComponent';
import { LoginComponent } from './component/LoginComponent';
import { TimeSheetInputComponent } from './component/TimeSheetInputComponent';
import { TimeSheetComponent } from './component/TimeSheetComponent';
import { PageNotFoundComponent } from './component/PageNotFoundComponent';

import { FillZeroPipe } from './pipe/FillZeroPipe';

import { LoginInfo } from './entity/LoginInfo';

import { LoginService } from './service/LoginService';
import { HttpService } from './service/HttpService';
import { ModalService } from './service/ModalService';
import { UserInfoService } from './service/UserInfoService';

@Injectable()
export class LoginResolver implements Resolve<void> {
  constructor(
    private router:Router
  ) {}

  resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot) {
    const loginInfo = LoginInfo.getLocal();
    if (loginInfo) {
      // トークン情報がある場合は、TimeSheetInput画面へ遷移する
      if (route.url.find(url => url.path == 'Login')) {
        this.router.navigate(['/TimeSheetInput', loginInfo.loginId]);
      }
    } else {
      // トークン認証がない場合で、Login画面以外の画面にいる場合は、Login画面へ遷移する
      if (!route.url.find(url => url.path == 'Login')) {
        this.router.navigate(['/Login']);
      }
    }
  }
}

const appRoutes:Routes = [
  {
    path: 'Login',
    component: LoginComponent,
    resolve: {
      void: LoginResolver
    }
  },
  {
    path: 'TimeSheetInput/:userId',
    component: TimeSheetInputComponent,
    resolve: {
      void: LoginResolver
    }
  },
  {
    path: '',
    redirectTo: '/Login',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    declarations: [
      AppComponent,
      LoginComponent,
      TimeSheetInputComponent,
      TimeSheetComponent,
      PageNotFoundComponent,
      FillZeroPipe
    ],
    providers: [
      LoginResolver,
      LoginService,
      HttpService,
      ModalService,
      UserInfoService
    ],
    imports: [
      BrowserModule,
      FormsModule,
      HttpClientModule,
      RouterModule.forRoot(appRoutes)
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
