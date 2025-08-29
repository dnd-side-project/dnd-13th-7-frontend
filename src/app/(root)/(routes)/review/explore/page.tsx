import type { Metadata } from 'next'
import { ConstructionPage } from '@/components/pages/common'

export const metadata: Metadata = {
  title: '후기 탐색',
  description:
    'IT 동아리의 솔직한 후기를 확인해보세요. 서류 전형, 면접, 활동 경험 등 다양한 후기를 통해 동아리 선택에 도움을 받을 수 있습니다.',
  keywords: [
    'IT 동아리 후기',
    '동아리 면접 후기',
    '동아리 서류 후기',
    '동아리 활동 후기',
    '동아리 경험담',
  ],
  openGraph: {
    title: '후기 탐색 | 모여잇',
    description:
      'IT 동아리의 솔직한 후기를 확인해보세요. 서류 전형, 면접, 활동 경험 등 다양한 후기를 통해 동아리 선택에 도움을 받을 수 있습니다.',
  },
}

export default function Page() {
  return <ConstructionPage />
}
