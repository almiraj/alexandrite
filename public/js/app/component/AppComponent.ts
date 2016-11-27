import { Component } from '@angular/core';
import { TimeTableInputComponent } from '../component/TimeTableInputComponent';

@Component({
  selector: 'my-app',
  template: `
    <div class="container">
      <h1>Alexandrite <small>- worksheet system -</small></h1>
      <TimeTableInputComponent></TimeTableInputComponent>
    </div>
    `,
    directives: [TimeTableInputComponent]
})
export class AppComponent { }
