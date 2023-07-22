import AppRequest from "./AppRequest";
import ResponseStatusEnum from "./ResponseStatusEnum";

class AppResponse {
  // レスポンスコード。固定値
  private responseCode: string = '12345';
  // Requestと同じ値
  appCode: string;
  // Requestと同じ値
  appName: string;
  // 返却時の日時
  private dateTimeStr: string;
  // 返却時のステータス
  private status: ResponseStatusEnum;

  static successPostUrl: string = 'https://hotdrop.sample.test.jp/dummy/success';
  static errorPostUrl: string = 'https://hotdrop.sample.test.jp/dummy/error';
  static suspendPostUrl: string = 'https://hotdrop.sample.test.jp/dummy/suspend';

  constructor(
    appRequest?: AppRequest, 
    appCode?: string, 
    appName?: string, 
    dateTimeStr?: string,
    status: ResponseStatusEnum = ResponseStatusEnum.Success
  ) {
    this.appCode = appCode ?? appRequest!.appCode;
    this.appName = appName ?? appRequest!.appName;
    this.dateTimeStr = dateTimeStr ?? this.getNowDateTimeString();
    this.status =status ?? ResponseStatusEnum.Success;
  }

  toShowString(): string {
    const str = this.toStringQuery();
    return str + "\n\n" + `レスポンス長=${str.length}`
  }

  toParamString(): string {
    return this.toStringQuery();
  }

  private toStringQuery(): string {
    // ここでレスポンスの文字列を生成する
    const concatStr1 = this.responseCode + this.appCode;
    const concatStr2 = this.padForChar(this.appName, 15);
    const concatStr3 = this.dateTimeStr + this.status;
    return concatStr1 + concatStr2 + concatStr3;
  }


  /**
   * 現在時刻をyyyyMMddHHmmssの文字列形式で取得する
   */
  private getNowDateTimeString(): string {
    const now = new Date();

    const year = now.getFullYear();
    const monthNum = now.getMonth() + 1;
    const month = this.padForNum(monthNum.toString(), 2);
    const day = this.padForNum(now.getDay().toString(), 2);
    const hour = this.padForNum(now.getHours().toString(), 2);
    const minutes = this.padForNum(now.getMinutes().toString(), 2);
    const second = this.padForNum(now.getSeconds().toString(), 2);

    return `${year}${month}${day}${hour}${minutes}${second}`;
  }

  /**
   * 左に0埋めする
   * padForNum('2', 3) -> '002'
   */
  private padForNum(str: string, length: number) {
    return str.padStart(length, '0');
  }

  /**
   * 半角スペースを左埋めする
   * padForChar('test', 6) -> 'test  '
   */
  private padForChar(str: string, length: number) {
    return str.padEnd(length, ' ');
  }

  copyWith({appCode, appName: multiByteText, status} : {
    appCode?: string;
    appName?: string;
    status?: ResponseStatusEnum
  }) {
    return new AppResponse(
      undefined,
      appCode ?? this.appCode,
      multiByteText ?? this.appName,
      this.dateTimeStr,
      status ?? this.status
    );
  }
}

export default AppResponse;