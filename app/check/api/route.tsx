import AppRequest from "@/app/models/AppRequest";

/**
 * Webサイトの入り口その1
 * POSTリクエストが必要な場合はここを経由する。仕様は以下の通り
 * ・パス: /check/api
 * ・URLエンコードは必須
 * 
 * @param request 
 * @returns postデータをURLパラメータにしてcheckページにリダイレクトする
 */
export async function POST(request: Request) {

  // TODO リクエストをSJISで扱うパターンがよくあるのでその場合はここでSJIS→UTF8に変換する
  const body = await request.text();
  const params = new URLSearchParams(body);
  const param = params.get(AppRequest.paramName);
  const paramWithUrlEncode = encodeURIComponent(param || '');

  const redirectUrl = `/check?${AppRequest.paramName}=${paramWithUrlEncode}`;

  return new Response('', {
    status: 302,
    headers: {
      Location: redirectUrl,
    }
  });
}