'use client'

import { useEffect } from 'react'
import * as Sentry from '@sentry/nextjs'
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
        <h1 className="typo-main-title text-black-color">문제가 발생했어요</h1>
        <p className="typo-body-1 text-grey-color-4">
          잠시 후 다시 시도해 주세요. 문제가 계속되면 새로고침하거나 홈으로
          이동해 주세요.
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
