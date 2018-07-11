import { isHoliday } from 'japanese-holidays';

import { PaidOffType } from '../constant/PaidOffType';
import { UserConfig } from '../entity/UserConfig';

export class DateRow {
  beginHour:number
  beginMinute:number
  endHour:number
  endMinute:number
  breakHour:number
  breakMinute:number
  paidOffType:PaidOffType
  remarks:string

  constructor(
    public date:Date
  ) {}

  get dayOfJapan():string {
    return ['日', '月', '火', '水', '木', '金', '土'][this.date.getDay()];
  }
  get isToday():boolean {
    const now = new Date();
    return this.date.getFullYear() == now.getFullYear()
      && this.date.getMonth() == now.getMonth()
      && this.date.getDate() == now.getDate();
  }
  get isSaturday():boolean {
    return this.date.getDay() == 6;
  }
  get isSunday():boolean {
    return this.date.getDay() == 0;
  }
  get isHoliday():boolean {
    return !!isHoliday(this.date);
  }
  get summary():string {
    // 何かしら未入力の時刻があればクリアする
    if (this.endHour === undefined || String(this.endHour) == ''
        || this.endMinute === undefined || String(this.endMinute) == ''
        || this.beginHour === undefined || String(this.beginHour) == ''
        || this.beginMinute === undefined || String(this.beginMinute) == ''
        || this.breakHour === undefined || String(this.breakHour) == ''
        || this.breakMinute === undefined || String(this.breakMinute) == ''
    ) {
      return '';
    }
    // 分情報に変換する
    const end = this.endHour * 60 + Number(this.endMinute);
    const begin = this.beginHour * 60 + Number(this.beginMinute);
    const breakTime = this.breakHour * 60 + Number(this.breakMinute);
    // 差分を計算する (マイナスの場合はクリア)
    const sum = end - begin - breakTime;
    if (sum < 0) {
      return '';
    }
    // 計算結果を表示用の情報に書き換える
    const sumHour = Math.floor(sum / 60);
    const sumMinute = Math.floor(sum % 60);
    return ('0000' + sumHour).slice(-2) + ':' + ('0000' + sumMinute).slice(-2);
  }

  isNotDefaultInterval(userConfig:UserConfig):boolean {
    const o = this.getDefaultBreakTime(userConfig);
    return (this.breakHour != o.breakHour || this.breakMinute != o.breakMinute);
  }
  setDefaultBreakTime(userConfig:UserConfig):void {
    const o = this.getDefaultBreakTime(userConfig);
    this.breakHour = o.breakHour;
    this.breakMinute = o.breakMinute;
  }
  getDefaultBreakTime(userConfig:UserConfig):any {
    // 何かしら未入力の時刻があればクリアする
    if (this.endHour === undefined || String(this.endHour) == ''
        || this.endMinute === undefined || String(this.endMinute) == ''
        || this.beginHour === undefined || String(this.beginHour) == ''
        || this.beginMinute === undefined || String(this.beginMinute) == ''
        || this.breakHour === undefined || String(this.breakHour) == ''
        || this.breakMinute === undefined || String(this.breakMinute) == ''
        || userConfig.lunchEndHour === undefined || String(userConfig.lunchEndHour) == ''
        || userConfig.lunchEndMinute === undefined || String(userConfig.lunchEndMinute) == ''
        || userConfig.lunchBeginHour === undefined || String(userConfig.lunchBeginHour) == ''
        || userConfig.lunchBeginMinute === undefined || String(userConfig.lunchBeginMinute) == ''
    ) {
      return '';
    }
    // 分情報に変換する
    const end = this.endHour * 60 + Number(this.endMinute);
    const begin = this.beginHour * 60 + Number(this.beginMinute);
    const lunchEnd = userConfig.lunchEndHour * 60 + Number(userConfig.lunchEndMinute);
    const lunchBegin = userConfig.lunchBeginHour * 60 + Number(userConfig.lunchBeginMinute);
    // 差分を計算する (マイナスの場合は0扱い)
    const breakTime = Math.min(end, lunchEnd) - Math.max(begin, lunchBegin);
    if (breakTime < 0) {
      return {
        breakHour: 0,
        breakMinute: 0
      };
    }
    // console.log('end:' + end);
    // console.log('begin:' + begin);
    // console.log('lunchEnd:' + lunchEnd);
    // console.log('lunchBegin:' + lunchBegin);
    // console.log('Math.min(end, lunchEnd):' + Math.min(end, lunchEnd));
    // console.log('Math.max(begin, lunchBegin):' + Math.max(begin, lunchBegin));
    // console.log('breakTime:' + breakTime);
    // console.log('Math.floor(breakTime / 60):' + Math.floor(breakTime / 60));
    // console.log('Math.floor(breakTime % 60):' + Math.floor(breakTime % 60));
    // 計算結果を表示用の情報に書き換える
    return {
      breakHour: Math.floor(breakTime / 60),
      breakMinute: Math.floor(breakTime % 60)
    };
  }
}
