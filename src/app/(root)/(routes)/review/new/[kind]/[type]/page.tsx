'use client'

import { Suspense, useEffect, useState } from 'react'
import { notFound } from 'next/navigation'
import ReviewCardTemplate from '@/components/pages/review/new/ReviewCardTemplate'
import {
  FormFactory,
  isValidFormCombination,
  type FormKind,
  type FormType,
} from '@/components/pages/review/new/forms'

interface PageProps {
  params: Promise<{ kind: string; type: string }>
}

export default function Page({ params }: PageProps) {
  const [formParams, setFormParams] = useState<{
    kind: string
    type: string
  } | null>(null)

  useEffect(() => {
    async function loadParams() {
      const { kind, type } = await params

      if (!isValidFormCombination(kind, type)) {
        notFound()
      }

      setFormParams({ kind, type })
    }

    loadParams()
  }, [params])

  const getKindDisplayName = (kind: string) => {
    switch (kind) {
      case 'paper':
        return '서류'
      case 'interview':
        return '인터뷰/면접'
      case 'activity':
        return '활동'
      default:
        return kind
    }
  }

  const getTypeDisplayName = (type: string) => {
    switch (type) {
      case 'normal':
        return '일반 후기'
      case 'premium':
        return '프리미엄 후기'
      default:
        return type
    }
  }

  if (!formParams) {
    return (
      <main className="">
        <div className="max-w-[800px] mx-auto pt-20">
          <div className="text-center">
            <p className="typo-body-2-r text-grey-color-4">로딩 중...</p>
          </div>
        </div>
      </main>
    )
  }

  const { kind, type } = formParams

  return (
    <main className="">
      <Suspense>
        <div className="max-w-[800px] mx-auto pt-20">
          <div className="mb-8">
            <ReviewCardTemplate
              typeText={getTypeDisplayName(type)}
              kindText={getKindDisplayName(kind)}
            >
              <FormFactory kind={kind as FormKind} type={type as FormType} />
            </ReviewCardTemplate>
          </div>
        </div>
      </Suspense>
    </main>
  )
}
