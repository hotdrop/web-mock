import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <p className='text-2xl text-center'>モックWebサイトです</p>
      <p className='text-sm text-center'>
        このWebサイトは、よくある外部サイトへの連携で自由に試験環境が使えない場合のモックです。
      </p>
      <br />
      <Link href={{pathname: '/check'}} className='link-button'>
        チェック処理に進む
      </Link>
    </main>
  )
}
