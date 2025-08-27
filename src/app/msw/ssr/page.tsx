import type { ClubDetailsData } from '@/features/clubs/types'

export default async function MSWSSRPage() {
  const response = await fetch('http://localhost:8080/api/v1/clubs/1/details', {
    cache: 'no-store',
  })

  if (!response.ok) {
    console.log('응답 실패:', response.status, response.statusText)
    return <p>데이터가 없습니다.</p>
  }

  const payload = (await response.json()) as { data?: ClubDetailsData }
  const details = payload?.data

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[16px] row-start-2 items-center sm:items-start w-full max-w-xl">
        <h1 className="typo-main-title text-main-color-1">MSW SSR 테스트</h1>
      </main>
    </div>
  )
}
