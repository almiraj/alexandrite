import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule, ApplicationRef, Injectable } from '@angular/core';
import { RouterModule, Routes, Router, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './component/AppComponent';
import { LoginComponent } from './component/LoginComponent';
import { TimeSheetInputComponent } from './component/TimeSheetInputComponent';
import { TimeSheetComponent } from './component/TimeSheetComponent';
import { PageNotFoundComponent } from './component/PageNotFoundComponent';

import { DateRowSummaryPipe } from './pipe/DateRowSummaryPipe';
import { FillZeroPipe } from './pipe/FillZeroPipe';

import { LoginService } from './service/LoginService';
import { HttpService } from './service/HttpService';
import { ModalService } from './service/ModalService';
import { UserInfoService } from './service/UserInfoService';

@Injectable()
class LoginResolver implements Resolve<void> {
  constructor(
    public router:Router,
    public loginService:LoginService
  ) {}

  resolve(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):Promise<void> {
    return this.loginService.checkToken()
      .then(loginInfo => {
        this.router.navigate(['/TimeSheetInput', loginInfo.loginId]);
      })
      .catch(e => {/*NOP*/});
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
  { path: 'TimeSheetInput/:userId', component: TimeSheetInputComponent },
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
      DateRowSummaryPipe,
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
      HttpModule,
      RouterModule.forRoot(appRoutes)
    ],
    bootstrap: [AppComponent]
})
class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
