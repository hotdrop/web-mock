'use client'

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import AppResponse from "../models/AppResponse";
import ResponseStatusEnum from "../models/ResponseStatusEnum";
import AppRequest from "../models/AppRequest";
import { AppDivider } from "../components/AppDivider";
import { AppTextArea } from "../components/AppTextArea";
import { AppTextField } from "../components/AppTextField";
import { PostButton } from "../components/PostButton";

export default function Result() {
  const searchParams = useSearchParams();
  const param = searchParams.get(AppRequest.paramName);
  const appRequest = new AppRequest(param || '');
  const [appResponse, setAppResponse] = useState(new AppResponse(appRequest));

  const [tab, setTab] = useState('success');
  const [postUrl, setPostUrl] = useState(AppResponse.successPostUrl);

  const handleInputPostUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPostUrl(event.target.value);
  }

  const handleInputAppCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRes = appResponse.copyWith({appCode: event.target.value});
    setAppResponse(newRes);
  }

  const handleInputAppNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newRes = appResponse.copyWith({appName: event.target.value});
    setAppResponse(newRes);
  }

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
          <AppTextField label="POST先のURL" initValue={postUrl} color="blue" onChange={handleInputPostUrlChange}/>
          <br />
          <AppTextField label="テストコード" initValue={`${appResponse.appCode}`} color="blue" onChange={handleInputAppCodeChange} />
          <br />
          <AppTextField label="テストネーム" initValue={`${appResponse.appName}`} color="blue" onChange={handleInputAppNameChange} />
        </div>
      )}
      {tab === 'error' && (
        <div>
          <p className="font-bold pt-4 pb-4 text-red-700">レスポンスを編集する</p>
          <AppTextField label="POST先のURL" initValue={postUrl} color="red" onChange={handleInputPostUrlChange} />
          <br />
          <AppTextField label="テストコード" initValue={`${appResponse.appCode}`} color="red" onChange={handleInputAppCodeChange} />
          <br />
          <AppTextField label="テストネーム" initValue={`${appResponse.appName}`} color="red" onChange={handleInputAppNameChange}/>
        </div>
      )}
      {tab === 'suspend' && (
        <div>
          <p className="font-bold pt-4 pb-4 text-gray-400">レスポンスを編集する</p>
          <AppTextField label="POST先のURL" initValue={postUrl} color="gray" onChange={handleInputPostUrlChange} />
          <br />
          <AppTextField label="テストコード" initValue={`${appResponse.appCode}`} color="gray" onChange={handleInputAppCodeChange}/>
          <br />
          <AppTextField label="テストネーム" initValue={`${appResponse.appName}`} color="gray" onChange={handleInputAppNameChange} />
        </div>
      )}
      <br />
      <AppTextArea title="レスポンスのパラメータ" label={`${appResponse.toShowString() || ''}`} />
      <br />
      <div className="text-center">
        <PostButton label="終了する" postUrl={postUrl} paramStr={appResponse.toParamString()} />
      </div>
    </main>
  );
}