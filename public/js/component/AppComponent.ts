import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'my-app',
  template: `
    <div class="container">
      <h1 id="title" (click)="toTopPage()">Alexandrite <small>- worksheet system -</small></h1>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: ['#title {cursor:pointer;}', '#title small {white-space:nowrap;}']
})
export class AppComponent {
  constructor(
    public router:Router
  ) {}

  toTopPage() {
    this.router.navigate(['/']);
  }
}
