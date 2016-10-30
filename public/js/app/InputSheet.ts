import { Component } from '@angular/core';

@Component({
  selector: 'InputSheet',
  template: `
    <ul *ngFor="let timeRow of timeTable">
      <li>
        {{timeRow.date}}
        　{{timeRow.begin}}～{{timeRow.end}}
        　{{timeRow.rest}}
      </li>
    </ul>
  `
})
export class InputSheet {
  timeTable: Array<Object>
  constructor() {
    this.timeTable = [
      { date: 1 ,begin: '1000', end: '1800', rest: '0100' },
      { date: 2, begin: '1000', end: '1830', rest: '0100' },
    ];
  }
}
