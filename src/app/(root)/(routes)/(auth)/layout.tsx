import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '로그인',
  description:
    '모여잇에 로그인하고 IT 동아리 탐색, 후기 작성, 구독 서비스를 이용해보세요. 카카오 또는 구글 계정으로 간편하게 로그인할 수 있습니다.',
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: '로그인 | 모여잇',
    description:
      '모여잇에 로그인하고 IT 동아리 탐색, 후기 작성, 구독 서비스를 이용해보세요.',
  },
}

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
