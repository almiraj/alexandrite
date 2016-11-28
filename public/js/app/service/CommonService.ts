export class CommonService {
  expand4digit(num:Number):String {
    const str = String(num);
    if (str.length >= 4) {
        return str;
    }
    return ('0000' + str).slice(-4);
  }
}
