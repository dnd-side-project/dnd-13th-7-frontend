import { Suspense } from 'react'
import Subscribe from '@/components/(pages)/subscribe/Subscribe'

export default function Page() {
  return (
    <Suspense fallback={null}>
      <Subscribe />
    </Suspense>
  )
}
