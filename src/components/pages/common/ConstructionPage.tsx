import Image from 'next/image'

export default function ConstructionPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="flex max-w-md flex-col items-center gap-4 text-center">
        <h1 className="typo-main-title text-black-color">
          컨텐츠 준비중 입니다
        </h1>
        <div className="relative h-[252px] w-[454.759px]">
          <Image
            src="/images/construction.svg"
            alt="작업 중"
            fill
            className="object-contain"
          />
        </div>
        <p className="typo-body-1 text-grey-color-4">
          더 많은 동아리와의 기회를 연결하기 위해
          <br />
          모여잇이 열심히 준비하고 있어요.
        </p>
      </div>
    </div>
  )
}
