import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule, ApplicationRef } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

import { AppComponent } from './component/AppComponent';
import { TimeTableInputComponent } from './component/TimeTableInputComponent';
import { TimeTableComponent } from './component/TimeTableComponent';
import { TimeRowSummaryPipe } from './pipe/TimeRowSummaryPipe';
import { PageNotFoundComponent } from './component/PageNotFoundComponent';

const appRoutes:Routes = [
  { path: 'timetableinput', component: TimeTableInputComponent },
  {
    path: '',
    redirectTo: '/timetableinput',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    declarations: [
      AppComponent,
      TimeTableInputComponent,
      TimeTableComponent,
      TimeRowSummaryPipe,
      PageNotFoundComponent
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
