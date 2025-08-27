'use client'

import { ReactNode, useEffect, useState } from 'react'

export default function MSWProvider({ children }: { children: ReactNode }) {
  const isMockEnabled = process.env.NEXT_PUBLIC_API_MOCKING === 'enabled'
  const [isMockingReady, setIsMockingReady] = useState(!isMockEnabled)

  useEffect(() => {
    async function enableMocking() {
      if (!isMockEnabled) return
      if (typeof window === 'undefined') return
      const { default: worker } = await import('@/mocks/browser')
      await worker.start()
      setIsMockingReady(true)
    }

    enableMocking()
  }, [isMockEnabled])

  if (!isMockingReady) {
    return <div>로딩 중...</div>
  }

  return <div>{children}</div>
}
