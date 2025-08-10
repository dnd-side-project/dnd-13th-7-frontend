import { GoogleAnalytics } from '@next/third-parties/google'
import type { Metadata } from 'next'
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
        <ReactQueryProvider>{children}</ReactQueryProvider>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  )
}
