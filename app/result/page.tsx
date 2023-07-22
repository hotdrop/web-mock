'use client'

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import AppResponse from "../models/AppResponse";
import ResponseStatusEnum from "../models/ResponseStatusEnum";
import AppRequest from "../models/AppRequest";
import { AppDivider } from "../components/AppDivider";
import { AppTextArea } from "../components/AppTextArea";
import { AppTextField } from "../components/AppTextField";

export default function Result() {
  const searchParams = useSearchParams();
  const param = searchParams.get(AppRequest.paramName);
  const appRequest = new AppRequest(param || '');
  const [appResponse, setAppResponse] = useState(new AppResponse(appRequest));

  const [tab, setTab] = useState('success');
  const [postUrl, setPostUrl] = useState(AppResponse.successPostUrl);

  // TODO アプリコード入力のハンドラ
  // TODO マルチバイト入力のハンドラ

  useEffect(() => {
    const [newPostUrl, newStatus] = (tab === 'success') ? 
          [AppResponse.successPostUrl, ResponseStatusEnum.Success] : (tab === 'error') ? 
              [AppResponse.errorPostUrl, ResponseStatusEnum.Error] : [AppResponse.suspendPostUrl, ResponseStatusEnum.Suspend];
    const response = appResponse.copyWith({status: newStatus});
    setAppResponse(response);
    setPostUrl(newPostUrl);
  }, [tab]);

  return (
    <main className="flex flex-col min-h-screen m-4">
      <p className='text-2xl text-center'>結果確認</p>
      <p className='text-sm text-center'>
        モックサイトはここで終了です。レスポンスの種類を選択してボタンを押してください。
      </p>
      <div className="text-center m-4">
        <button
          className={`px-6 py-2 border border-gray-200 rounded-l-lg ${tab === 'success' ? 'bg-blue-400 text-white' : 'bg-white text-black'}`}
          onClick={() => setTab('success')} >
            成功
        </button>
        <button
          className={`px-6 py-2 border border-gray-200 ${tab === 'error' ? 'bg-red-400 text-white' : 'bg-white text-black'}`}
          onClick={() => setTab('error')} >
            エラー
        </button>
        <button
          className={`px-6 py-2 border border-gray-200 rounded-r-lg ${tab === 'suspend' ? 'bg-gray-400 text-white' : 'bg-white text-black'}`}
          onClick={() => setTab('suspend')} >
            中断
        </button>
      </div>
      <AppDivider />
      {tab === 'success' && (
        <div>
          <p className="font-bold pt-4 pb-4 text-blue-700">レスポンスを編集する</p>
          <AppTextField label="POST先のURL" initValue={postUrl} color="blue"/>
          <br />
          <AppTextField label="テストコード" initValue={`${appResponse.appCode}`} color="blue" />
          <br />
          <AppTextField label="テストネーム" initValue={`${appResponse.appName}`} color="blue" />
        </div>
      )}
      {tab === 'error' && (
        <div>
          <p className="font-bold pt-4 pb-4 text-red-700">レスポンスを編集する</p>
          <AppTextField label="POST先のURL" initValue={postUrl} color="red" />
          <br />
          <AppTextField label="テストコード" initValue={`${appResponse.appCode}`} color="red" />
          <br />
          <AppTextField label="テストネーム" initValue={`${appResponse.appName}`} color="red" />
        </div>
      )}
      {tab === 'suspend' && (
        <div>
          <p className="font-bold pt-4 pb-4 text-gray-400">レスポンスを編集する</p>
          <AppTextField label="POST先のURL" initValue={postUrl} color="gray" />
          <br />
          <AppTextField label="テストコード" initValue={`${appResponse.appCode}`} color="gray" />
          <br />
          <AppTextField label="テストネーム" initValue={`${appResponse.appName}`} color="gray" />
        </div>
      )}
      <br />
      <AppTextArea title="レスポンスのパラメータ" label={`${appResponse.toShowString() || ''}`} />
      <br />
      // TODO 終了ボタン
    </main>
  );
}