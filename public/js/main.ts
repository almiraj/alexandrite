import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule, ApplicationRef } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './component/AppComponent';
import { LoginComponent } from './component/LoginComponent';
import { AccountComponent } from './component/AccountComponent';
import { TimeSheetInputComponent } from './component/TimeSheetInputComponent';
import { TimeSheetComponent } from './component/TimeSheetComponent';
import { PageNotFoundComponent } from './component/PageNotFoundComponent';

import { DateRowSummaryPipe } from './pipe/DateRowSummaryPipe';
import { FillZeroPipe } from './pipe/FillZeroPipe';
import { ReversePipe } from './pipe/ReversePipe';

import { AccountService } from './service/AccountService';
import { HttpService } from './service/HttpService';
import { ModalService } from './service/ModalService';
import { SetupService } from './service/SetupService';
import { TimeSheetService } from './service/TimeSheetService';

const appRoutes:Routes = [
  { path: 'Login', component: LoginComponent },
  { path: 'Account', component: AccountComponent },
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
      AccountComponent,
      TimeSheetInputComponent,
      TimeSheetComponent,
      PageNotFoundComponent,
      DateRowSummaryPipe,
      FillZeroPipe,
      ReversePipe
    ],
    providers: [
      AccountService,
      HttpService,
      ModalService,
      SetupService,
      TimeSheetService
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
