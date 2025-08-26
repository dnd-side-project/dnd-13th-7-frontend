import BasicReview from '@/components/(pages)/club/basicReview/BasicReview'
import Detail from '@/components/(pages)/club/detail/Detail'
import DetailContent from '@/components/(pages)/club/detail/DetailContent'
import PremiumReview from '@/components/(pages)/club/premiumReview/PremiumReview'
import Recruit from '@/components/(pages)/club/recruit/Recruit'
import { UnderLineTab } from '@/components/atoms/UnderLineTab'
import { getClubRecruits } from '@/features/clubs/api'
import { ClubRecruitsData } from '@/features/clubs/types'

export default async function Page({
  params,
}: {
  params: Promise<{ clubId: string }>
}) {
  const { clubId } = await params

  let recruitsData: ClubRecruitsData | null = null
  try {
    recruitsData = await getClubRecruits(clubId)
  } catch (error) {
    console.error('Failed to fetch recruits data:', error)
  }

  return (
    <div className="flex justify-center py-15 w-full mx-auto max-w-[1440px]">
      <div className="w-180 max-w-[720px]">
        <Detail clubId={clubId} />
        <UnderLineTab
          className="px-5"
          defaultValue="상세 내용"
          tabs={[
            {
              value: '상세 내용',
              label: '상세 내용',
              content: <DetailContent />,
            },
            {
              value: '일반 후기',
              label: '일반 후기',
              content: <BasicReview recruitsData={recruitsData} />,
            },
            {
              value: '프리미엄 리뷰',
              label: '프리미엄 리뷰',
              content: <PremiumReview recruitsData={recruitsData} />,
            },
          ]}
        />
      </div>
      <Recruit clubId={clubId} className="max-w-[360px]" />
    </div>
  )
}
