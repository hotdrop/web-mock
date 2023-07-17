import { useSearchParams } from "next/navigation";
import AppRequest from "../models/AppRequest";
import { useEffect, useState } from "react";
import AppResponse from "../models/AppResponse";
import ResponseStatusEnum from "../models/ResponseStatusEnum";
import { AppDivider } from "../components/AppDivider";
import { AppTextArea } from "../components/AppTextArea";

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
          className={`px-6 py-2 border border-gray-200 rounded-l-lg ${tab === 'success' ? 'gb-green-400 text-white' : 'bg-white text-black'}`}
          onClick={() => setTab('success')} >
            成功
        </button>
        <button
          className={`px-6 py-2 border border-gray-200 ${tab === 'error' ? 'gb-red-400 text-white' : 'bg-white text-black'}`}
          onClick={() => setTab('error')} >
            エラー
        </button>
        <button
          className={`px-6 py-2 border border-gray-200 rounded-l-lg ${tab === 'suspend' ? 'gb-gray-400 text-white' : 'bg-white text-black'}`}
          onClick={() => setTab('suspend')} >
            中断
        </button>
      </div>
      <AppDivider />
      {tab === 'success' && (
        <div>
          <p className="font-bold pt-4">レスポンスを編集する</p>
          <p className="pt-4 break-wrods">
            [POST先のURL]<br />
            {postUrl}
          </p>
          <p className="pt-4">アプリコード</p>
          // TODO 入力
          <p className="pt-4">マルチバイト文字</p>
          // TODO 入力
        </div>
      )}
      {tab === 'error' && (
        <div></div>
      )}
      {tab === 'suspend' && (
        <div></div>
      )}
      <br />
      <AppDivider />
      <br />
      <AppTextArea title="レスポンスのパラメータ" label={`${appResponse.toShowString() || ''}`} />
      <br />
      // TODO 終了ボタン
    </main>
  );
}