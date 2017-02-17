import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule, ApplicationRef } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

import { AppComponent } from './component/AppComponent';
import { LoginComponent } from './component/LoginComponent';
import { TimeTableInputComponent } from './component/TimeTableInputComponent';
import { TimeTableComponent } from './component/TimeTableComponent';
import { TimeRowSummaryPipe } from './pipe/TimeRowSummaryPipe';
import { PageNotFoundComponent } from './component/PageNotFoundComponent';

import { LoginService } from './service/LoginService';
import { TimeTableService } from './service/TimeTableService';

const appRoutes:Routes = [
  { path: 'Login', component: LoginComponent },
  { path: 'TimeTableInput/:userId/:month', component: TimeTableInputComponent },
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
      TimeTableInputComponent,
      TimeTableComponent,
      TimeRowSummaryPipe,
      PageNotFoundComponent
    ],
    providers: [
      LoginService,
      TimeTableService
    ],
    imports: [
      BrowserModule,
      FormsModule,
      HttpModule,
      RouterModule.forRoot(appRoutes),
      ModalModule.forRoot(),
      BootstrapModalModule
    ],
    bootstrap: [AppComponent]
})
class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
