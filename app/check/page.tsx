'use client'

import { useSearchParams } from "next/navigation";
import { useRef } from "react";
import Link from "next/link";
import { AppTextArea } from "../components/AppTextArea";
import { AppDivider } from "../components/AppDivider";
import { ParamCheckItem } from "../components/ParamCheckItem";
import AppRequest from "../models/AppRequest";

export default function Check() {
  const searchParams = useSearchParams();
  const param = searchParams.get(AppRequest.paramName);
  const appRequest = useRef(new AppRequest(param || ''));

  return (
    <main className="flex flex-col min-h-screen m-4">
      <div>
        <p className="text-2xl text-center">パラメータチェック</p>
        <p className="text-sm text-center pb-4">※本チェックでエラーになった場合、画面にその旨表示します。</p>
        <AppTextArea title="リクエストパラメータ" label={`${appRequest.current.originalParamStr || ''}`} />
      </div>
      <p>{appRequest.current.overviewMessage}</p>
      <div className="py-2">
        <ParamCheckItem label="テストコード" checkResult={appRequest.current.checkAppCode()} />
        <ParamCheckItem label="テストネーム" checkResult={appRequest.current.checkAppName()} />
        <ParamCheckItem label="番号" checkResult={appRequest.current.checkAppNumber()} />
        <ParamCheckItem label="年月日" checkResult={appRequest.current.checkAppDate()} />
        <ParamCheckItem label="時刻" checkResult={appRequest.current.checkAppTime()} />
        <ParamCheckItem label="パターン" checkResult={appRequest.current.checkAppPattern()} />
      </div>
      <AppDivider />
      <div className="m-4 text-center">
        <br />
        <Link
          className='link-button'
          href={{pathname: '/result', query: appRequest.current.toQuery()}}>
          次に進む
        </Link>
      </div>
    </main>
  );
}