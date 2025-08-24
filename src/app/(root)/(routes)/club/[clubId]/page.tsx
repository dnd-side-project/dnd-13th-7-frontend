import Recruit from '@/components/(pages)/club/recruit/Recruit'
import { UnderLineTab } from '@/components/atoms/UnderLineTab'

export default async function Page({
  params,
}: {
  params: Promise<{ clubId: string }>
}) {
  const { clubId } = await params
  return (
    <main className="p-6">
      <p className="mt-2 text-sm text-gray-600">clubId: {clubId}</p>
      <UnderLineTab
        defaultValue="상세 내용"
        tabs={[
          {
            value: '상세 내용',
            label: '상세 내용',
            content: <div>상세임</div>,
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
      <Recruit clubId={clubId} />
    </main>
  )
}
