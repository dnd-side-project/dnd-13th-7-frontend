import { Suspense } from 'react'
import type { Metadata } from 'next'
import HomePage from '@/components/(pages)/(home)/HomePage'
import { Footer } from '@/components/molecules/layout'

export const metadata: Metadata = {
  title: '홈',
  description:
    'IT 동아리 탐색부터 솔직한 후기까지! 기획자, 디자이너, 개발자를 위한 실전 성장 플랫폼 모여잇에서 나와 잘 맞는 IT 활동을 찾아보세요.',
  openGraph: {
    title: '모여잇 - IT 직군을 위한 실전 성장 플랫폼',
    description:
      'IT 동아리 탐색부터 솔직한 후기까지! 기획자, 디자이너, 개발자를 위한 실전 성장 플랫폼',
  },
}

export default function Home() {
  return (
    <div>
      <Suspense fallback={null}>
        <HomePage />
      </Suspense>
      <Footer />
    </div>
  )
}
