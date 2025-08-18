import type { ReactNode } from 'react'
import { Header, MobileHeader } from '@/components/molecules/layout'
import SearchOverlay from '@/components/molecules/search/SearchOverlay'

export default function RoutesLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col w-full">
      <MobileHeader />
      <Header />
      <div className="flex-1 w-full">{children}</div>
      <SearchOverlay />
    </div>
  )
}
