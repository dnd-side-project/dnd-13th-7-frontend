import Detail from '@/components/(pages)/club/detail/Detail'
import DetailContent from '@/components/(pages)/club/detail/DetailContent'
import Recruit from '@/components/(pages)/club/recruit/Recruit'
import { UnderLineTab } from '@/components/atoms/UnderLineTab'

export default async function Page({
  params,
}: {
  params: Promise<{ clubId: string }>
}) {
  const { clubId } = await params

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
              content: <div>일반 후기임</div>,
            },
            {
              value: '프리미엄 리뷰',
              label: '프리미엄 리뷰',
              content: <div>프리미엄 리뷰임</div>,
            },
          ]}
        />
      </div>
      <Recruit clubId={clubId} className="max-w-[360px]" />
    </div>
  )
}
