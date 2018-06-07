import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'my-app',
  template: `
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
}
