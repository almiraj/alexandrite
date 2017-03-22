import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <span defaultOverlayTarget></span>
    <div class="container">
      <h1>Alexandrite <small>- worksheet system -</small></h1>
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent { }
