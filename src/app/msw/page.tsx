'use client'

import { useState } from 'react'
import type { ClubDetailsData } from '@/features/clubs/types'

export default function MSWPage() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [details, setDetails] = useState<ClubDetailsData | null>(null)

  const fetchDetails = async () => {
    setLoading(true)
    setError(null)
    setDetails(null)
    try {
      const response = await fetch('/api/v1/clubs/1/details', {
        cache: 'no-store',
      })
      const json = await response.json()
      setDetails(json.data as ClubDetailsData)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[16px] row-start-2 items-center sm:items-start w-full max-w-xl">
        <h1 className="typo-main-title text-main-color-1">MSW 테스트</h1>
        <button
          className="px-4 py-2 rounded bg-black text-white disabled:opacity-50"
          onClick={fetchDetails}
          disabled={loading}
        >
          {loading ? '불러오는 중...' : '클럽 상세 요청 (ID: 1)'}
        </button>

        {error && <p className="text-red-600">에러: {error}</p>}
      </main>
    </div>
  )
}
