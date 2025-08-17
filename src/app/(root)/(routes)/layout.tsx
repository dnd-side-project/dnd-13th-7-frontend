import type { ReactNode } from 'react'
import { Footer, Header, MobileHeader } from '@/components/molecules/layout'

export default function RoutesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <MobileHeader />
      <Header />
      <div className="flex-1 w-full">{children}</div>
      <Footer />
    </div>
  )
}
