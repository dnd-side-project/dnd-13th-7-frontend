import { GoogleAnalytics } from '@next/third-parties/google'
import type { Metadata } from 'next'
import { AuthProvider } from '@/shared/providers/auth-provider'
import MSWProvider from '@/shared/providers/msw-provider'
import ReactQueryProvider from '@/shared/providers/react-query-provider'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: {
    default: '모여잇 - IT 직군을 위한 실전 성장 플랫폼',
    template: '%s | 모여잇',
  },
  description:
    'IT 동아리 탐색부터 솔직한 후기까지! 기획자, 디자이너, 개발자를 위한 실전 성장 플랫폼 모여잇에서 나와 잘 맞는 IT 활동을 찾아보세요.',
  keywords: [
    'IT 동아리',
    '기획자',
    '디자이너',
    '개발자',
    '프로젝트',
    '성장',
    '커리어',
    'PM',
    'PO',
    '프론트엔드',
    '백엔드',
    '안드로이드',
    'iOS',
  ],
  authors: [{ name: '모여잇' }],
  creator: '모여잇',
  publisher: '모여잇',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://moyeoit.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://moyeoit.com',
    title: '모여잇 - IT 직군을 위한 실전 성장 플랫폼',
    description:
      'IT 동아리 탐색부터 솔직한 후기까지! 기획자, 디자이너, 개발자를 위한 실전 성장 플랫폼',
    siteName: '모여잇',
  },
  twitter: {
    card: 'summary',
    title: '모여잇 - IT 직군을 위한 실전 성장 플랫폼',
    description:
      'IT 동아리 탐색부터 솔직한 후기까지! 기획자, 디자이너, 개발자를 위한 실전 성장 플랫폼',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <MSWProvider>
          <ReactQueryProvider>
            <AuthProvider>{children}</AuthProvider>
          </ReactQueryProvider>
        </MSWProvider>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  )
}
