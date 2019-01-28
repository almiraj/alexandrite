import * as moment from 'moment';
import * as JapaneseHolidays from 'japanese-holidays';

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
    public userConfig:UserConfig,
    public date:moment.Moment
  ) {}

  get dayOfJapan():string {
    return ['日', '月', '火', '水', '木', '金', '土'][this.date.weekday()];
  }
  get isToday():boolean {
    const now = moment();
    return this.date.year() == now.year()
      && this.date.month() == now.month()
      && this.date.date() == now.date();
  }
  get isSaturday():boolean {
    return this.date.weekday() == 6;
  }
  get isSunday():boolean {
    return this.date.weekday() == 0;
  }
  get isHoliday():boolean {
    return !!JapaneseHolidays.isHoliday(this.date.toDate());
  }
  get summary():string {
    // 何かしら未入力の時刻があればクリアする
    if (![this.endHour, this.endMinute, this.beginHour, this.beginMinute, this.breakHour, this.breakMinute].every($.isNumeric)) {
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

  isCareful():boolean {
    return !!this.paidOffType || !!this.remarks || !this.isDefaultBreakTime();
  }
  isDefaultBegin():boolean {
    if (![this.beginHour, this.beginMinute].every($.isNumeric)) {
      // 両方の開始時刻が入力されていない場合は、デフォルト休憩時間とみなす
      return true;
    }
    return this.beginHour == this.userConfig.beginHour && this.beginMinute == this.userConfig.beginMinute;
  }
  isDefaultBreakTime():boolean {
    const o = this.getDefaultBreakTime();
    if (!o) {
      // デフォルト休憩時間が算出できない状況の場合は、デフォルト休憩時間とみなす
      return true;
    }
    // デフォルト休憩時間が算出できるのに、休憩時間が選択されていなければ、デフォルト休憩時間ではないと見なす
    if (!$.isNumeric(this.breakHour) || !$.isNumeric(this.breakMinute)) {
      return false;
    }
    // デフォルト休憩時間と一致するものが選択されている場合は、デフォルト休憩時間と見なす
    return o.breakHour == this.breakHour && o.breakMinute == this.breakMinute;
  }
  hasSomeTimeSelection():boolean {
    return [this.beginHour, this.beginMinute, this.endHour, this.endMinute, this.breakHour, this.breakMinute, this.paidOffType].some($.isNumeric);
  }
  clearAnyTimeSelection():void {
    this.beginHour = this.beginMinute = this.endHour = this.endMinute = this.breakHour = this.breakMinute = this.paidOffType = undefined;
  }
  fillBeginAndEnd():void {
    this.beginHour = this.userConfig.beginHour;
    this.beginMinute = this.userConfig.beginMinute;
    if (this.isToday) {
      // 当日の場合だけ、現在時刻を加味して終了時刻を入力する
      const i = this.userConfig.minutesInterval;
      const now = new Date(); // ここはローカル時刻を使う
      this.endHour = now.getHours();
      this.endMinute = Math.floor(now.getMinutes() / i) * i; // 現在時刻に一番近いものを選択する
    } else {
      this.endHour = this.userConfig.endHour;
      this.endMinute = this.userConfig.endMinute;
    }
  }
  fillBreakTime():void {
    if (this.paidOffType == PaidOffType.ALL || this.paidOffType == PaidOffType.AM) {
      this.beginHour = this.userConfig.beginHour;
      this.beginMinute = this.userConfig.beginMinute;
    }
    if (this.paidOffType == PaidOffType.ALL || this.paidOffType == PaidOffType.PM) {
      this.endHour = this.userConfig.endHour;
      this.endMinute = this.userConfig.endMinute;
    }
    const o = this.getDefaultBreakTime();
    if (o) {
      this.breakHour = o.breakHour;
      this.breakMinute = o.breakMinute;
    } else {
      this.breakHour = this.breakMinute = undefined;
    }
  }

  private getDefaultBreakTime():any {
    // 何かしら未入力の時刻があれば、算出不能とする
    if (![this.endHour, this.endMinute, this.beginHour, this.beginMinute].every($.isNumeric)) {
      return null;
    }
    // 分情報に変換する
    const end = this.endHour * 60 + Number(this.endMinute);
    const begin = this.beginHour * 60 + Number(this.beginMinute);
    const lunchEnd = this.userConfig.lunchEndHour * 60 + Number(this.userConfig.lunchEndMinute);
    const lunchBegin = this.userConfig.lunchBeginHour * 60 + Number(this.userConfig.lunchBeginMinute);
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
