import { Component } from '@angular/core';
import { InputSheet } from './InputSheet';

@Component({
  selector: 'my-app',
  template: `
    <h1>Alexandrite</h1>
    <InputSheet></InputSheet>
    `,
    directives: [InputSheet]
})
export class AppComponent { }
