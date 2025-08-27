import { Suspense } from 'react'
import HomePage from '@/components/(pages)/(home)/HomePage'
import { Footer } from '@/components/molecules/layout'

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
