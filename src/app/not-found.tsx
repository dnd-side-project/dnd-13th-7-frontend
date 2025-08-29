import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/atoms/Button'
import { buttonVariants } from '@/components/atoms/Button/button'

export const metadata: Metadata = {
  title: '페이지를 찾을 수 없습니다',
  description:
    '요청하신 페이지를 찾을 수 없습니다. 홈으로 돌아가서 모여잇의 다양한 서비스를 이용해보세요.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="flex max-w-md flex-col items-center gap-4 text-center">
        <h1 className="typo-main-title text-black-color">
          페이지를 찾을 수 없어요
        </h1>
        <div className="relative h-[237px] w-[363.838px]">
          <Image
            src="/images/sorry.png"
            alt="페이지를 찾을 수 없음"
            fill
            className="object-contain"
          />
        </div>
        <p className="typo-body-1 text-grey-color-4">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다
        </p>
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button size="medium" variant="solid">
              홈으로
            </Button>
          </Link>
          <Link
            href="/club/explore"
            className={buttonVariants({
              variant: 'outlined-secondary',
              size: 'medium',
            })}
          >
            동아리 탐색
          </Link>
        </div>
      </div>
    </div>
  )
}
