'use client'

import { useEffect } from 'react'
import * as Sentry from '@sentry/nextjs'
import Image from 'next/image'
import { Button } from '@/components/atoms/Button'
import { buttonVariants } from '@/components/atoms/Button/button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="flex max-w-md flex-col items-center gap-4 text-center">
        <h1 className="typo-main-title text-black-color">
          내용을 불러오지 못했어요..
        </h1>
        <div className="relative h-[237px] w-[363.838px]">
          <Image
            src="/images/sorry.png"
            alt="에러"
            fill
            className="object-contain"
          />
        </div>
        <p className="typo-body-1 text-grey-color-4">
          다시 한번 시도하거나 새로고침을 진행해주세요
        </p>
        <div className="flex items-center gap-4">
          <Button onClick={() => reset()} size="medium" variant="solid">
            다시 시도
          </Button>
          <a
            href="/"
            className={buttonVariants({
              variant: 'outlined-secondary',
              size: 'medium',
            })}
          >
            홈으로
          </a>
        </div>
      </div>
    </div>
  )
}
