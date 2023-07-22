class AppRequest {
  // 英数字 10桁
  appCode: string;
  // 全角 15文字
  appName: string; 
  // 数字のみ 5桁
  appNumber: string; 
  // 年月日 8桁
  appDate: string;
  // 時刻 6桁
  appTime: string;
  // 1か9のみ許容
  appPattern: string;

  // 分割する前の元のリクエストパラメータ
  originalParamStr: string;
  // リクエストの長さチェック
  overviewMessage: string;
  
  static paramName = "param";
  private readonly paramLength = 45;
  // サンプルのパラメータ。モックWebアプリの動作確認をする場合などpostデータを使わない用のダミーパラメータ
  private readonly dummyMockParam = 'code123456マルチバイトテキスト　　　　　99999202307161250349'

  constructor(argParam: string = '') {
    let param = ''
    if (argParam.length === this.paramLength) {
      this.originalParamStr = argParam;
      this.overviewMessage = `正しいパラメータ長で受信しました。パラメータ長=${argParam.length}`;
      param = argParam;
    } else if (argParam.length === 0) {
      this.originalParamStr = this.dummyMockParam;
      this.overviewMessage = 'パラメータが空なのでサンプルパラメータを設定します。';
      param = this.dummyMockParam;
    } else {
      this.originalParamStr = argParam;
      this.overviewMessage = `受信したパラメータ長が正しくありません。パラメータ長=${argParam.length}`;
      this.appCode = '';
      this.appName = '';
      this.appNumber = '';
      this.appDate = '';
      this.appTime = '';
      this.appPattern = '';
      return;
    }

    this.appCode = param.substring(0, 10);
    this.appName = param.substring(10, 25);
    this.appNumber = param.substring(25, 30);
    this.appDate = param.substring(30, 38);
    this.appTime = param.substring(38, 44);
    this.appPattern = param.substring(44, 45);
  }

  toQuery() {
    return {
      [AppRequest.paramName]: this.toBody(),
    }
  }

  checkAppCode(): [boolean, string] {
    if (this.isAlphaNumeric(this.appCode)) {
      return [true, 'チェックOK(半角英数字)'];
    } else {
      return [false, `アプリコードは半角英数字のみ許容されています。value=${this.appCode}`];
    }
  }

  checkAppName(): [boolean, string] {
    // TODO ここSJISのカナをチェックするのであれば工夫が必要
    return [true, 'チェックOK(全角カナで全角スペース埋め)']
  }

  checkAppNumber(): [boolean, string] {
    if (this.isNumeric(this.appNumber)) {
      return [true, 'チェックOK(数字のみ)'];
    } else {
      return [false, `番号は数字のみ許容されています。value=${this.appNumber}`];
    }
  }

  checkAppDate(): [boolean, string] {
    if (!this.isNumeric(this.appDate)) {
      return [false, `年月日が数値ではありません。value={this.appDate}`];
    }

    const dateNum = parseInt(this.appDate);
    if (dateNum > 19700101 && dateNum < 21001231) {
      return [true, 'チェックOK(取り扱い可能な年月日か)']
    } else {
      return [false, `取り扱い可能な年月日ではありません。value=${this.appDate}`]
    }
  }

  checkAppTime(): [boolean, string] {
    if (!this.isNumeric(this.appTime)) {
      return [false, `時刻が数値ではありません。value={this.appTime}`];
    }

    const timeNum = parseInt(this.appTime);
    if (timeNum > 0 && timeNum < 235959) {
      return [true, 'チェックOK(取り扱い可能な時刻か)']
    } else {
      return [false, `取り扱い可能な時刻ではありません。value=${this.appTime}`]
    }
  }

  checkAppPattern(): [boolean, string] {
    if (this.appPattern === "1" || this.appPattern === "9") {
      return [true, 'チェックOK(1または9)']
    } else {
      return [false, `パターンが1または9ではありません。value=${this.appPattern}`]
    }
  }

  private toBody(): string {
    return this.appCode + this.appName + this.appNumber + this.appDate + this.appTime + this.appPattern;
  }

  private isAlphaNumeric(str: string): boolean {
    const regexp = new RegExp('^[0-9A-Za-z]+$');
    return regexp.test(str);
  }

  private isNumeric(str: string): boolean {
    return !isNaN(parseInt(str)) && isFinite(str as any);
  }
}

export default AppRequest;