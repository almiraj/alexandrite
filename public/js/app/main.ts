import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './component/AppComponent';
import { TimeTableInputComponent } from './component/TimeTableInputComponent';
import { TimeTableComponent } from './component/TimeTableComponent';
import { TimeRowSummaryPipe } from './pipe/TimeRowSummaryPipe';

@NgModule({
    declarations: [
      AppComponent,
      TimeTableInputComponent,
      TimeTableComponent,
      TimeRowSummaryPipe
    ],
    imports: [
      BrowserModule,
      FormsModule,
      HttpModule
    ],
    bootstrap: [AppComponent]
})
class AppModule {
}

platformBrowserDynamic().bootstrapModule(AppModule);
