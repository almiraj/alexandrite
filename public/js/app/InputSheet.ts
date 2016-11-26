import { Component } from '@angular/core';

@Component({
  selector: 'InputSheet',
  template: `
    <table>
      <tr id="timeHead">
        <th>日付</th>
        <th>開始</th>
        <th></th>
        <th>終了</th>
      </tr>
      <tr *ngFor="let timeRow of timeTable; let i = index" id="{{'timeRow' + i}}">
        <td id="{{'timeRow' + i + 'date'}}">
          {{i + 1}}
        </td>
        <td>
          <input id="{{'timeRow' + i + 'begin'}}" value="{{timeRow.begin}}">
        </td>
        <td>
          ～
        </td>
        <td>
          <input id="{{'timeRow' + i + 'end'}}" value="{{timeRow.end}}">
        </td>
      </tr>
    </table>
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
