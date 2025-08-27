import { GoogleAnalytics } from '@next/third-parties/google'
import type { Metadata } from 'next'
import { AuthProvider } from '@/shared/providers/auth-provider'
import MSWProvider from '@/shared/providers/msw-provider'
import ReactQueryProvider from '@/shared/providers/react-query-provider'
import '@/styles/globals.css'

export const metadata: Metadata = {
  title: 'Moyeoit',
  description: 'Moyeoit',
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
