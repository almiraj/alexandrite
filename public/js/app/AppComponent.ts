import { Component } from '@angular/core';
import { TimeTableInput } from './TimeTableInput';

@Component({
  selector: 'my-app',
  template: `
    <h1>Alexandrite</h1>
    <TimeTableInput></TimeTableInput>
    `,
    directives: [TimeTableInput]
})
export class AppComponent { }
