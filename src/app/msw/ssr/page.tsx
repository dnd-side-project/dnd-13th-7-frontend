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
        {details ? (
          <div className="mt-4 p-4 border rounded w-full">
            <h2 className="typo-title-2 mb-2">클럽 상세</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>이름: {details.name}</li>
              <li>슬로건: {details.slogan}</li>
              <li>설립연도: {details.establishment}</li>
              <li>모집여부: {details.recruiting ? '모집중' : '모집종료'}</li>
              <li>위치: {details.location}</li>
              <li>주소: {details.address}</li>
              <li>참여 인원: {details.total_participant}</li>
              <li>이미지: {details.imageUrl}</li>
            </ul>
          </div>
        ) : (
          <p>데이터가 없습니다.</p>
        )}
      </main>
    </div>
  )
}
