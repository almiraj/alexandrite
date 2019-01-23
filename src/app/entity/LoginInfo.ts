export class LoginInfo {
  static NO_TOKEN_ERROR:string = 'ログインしていません'
  loginId:string
  loginToken:string

  static getLocal():LoginInfo {
    const loginId = localStorage.getItem('loginId');
    const loginToken = localStorage.getItem('loginToken');
    if (!loginId || !loginToken) {
      return null;
    }
    const loginInfo:LoginInfo = new LoginInfo();
    loginInfo.loginId = loginId;
    loginInfo.loginToken = loginToken;
    return loginInfo;
  }
  static clearLocal():void {
    localStorage.removeItem('loginId');
    localStorage.removeItem('loginToken');
  }
  saveToLocal():void {
    localStorage.setItem('loginId', this.loginId);
    localStorage.setItem('loginToken', this.loginToken);
  }
}
