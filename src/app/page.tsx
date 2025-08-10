import { CheckItem } from '@/components/atoms/CheckItem'

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="typo-main-title text-main-color-1">Hello World</h1>
        <h2 className="typo-title-1 text-grey-color-1">Hello World</h2>
        <h3 className="typo-title-2">Hello World</h3>
        <h4 className="typo-title-3">Hello World</h4>
        <p className="typo-body-1-r">Hello World</p>
        <p className="typo-body-1-sb">Hello World</p>
        <p className="typo-body-1-m">Hello World</p>
        <p className="typo-body-2-sb">Hello World</p>
        <CheckItem className="typo-button-m" label="전체" />
        <CheckItem className="typo-button-m" label="PM/PO" />
        <CheckItem className="typo-button-m" label="프론트 개발자" />
        <CheckItem className="typo-button-m" label="백엔드 개발자" />
      </main>
    </div>
  )
}
