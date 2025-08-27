import { Suspense } from 'react'
import { Explore } from '@/components/(pages)/club/explore/Explore'

export default function Page() {
  return (
    <Suspense fallback={null}>
      <Explore />
    </Suspense>
  )
}
