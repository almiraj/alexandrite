import { Component } from '@angular/core';
import { TimeTableInput } from './TimeTableInput';

@Component({
  selector: 'my-app',
  template: `
    <div class="container">
      <h1>Alexandrite <small>- worksheet system -</small></h1>
      <TimeTableInput></TimeTableInput>
    </div>
    `,
    directives: [TimeTableInput]
})
export class AppComponent { }
