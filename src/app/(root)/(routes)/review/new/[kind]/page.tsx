'use client'

import { Suspense, useEffect, useState } from 'react'
import { notFound, redirect } from 'next/navigation'
import {
  FormFactory,
  isValidFormKind,
  type FormKind,
} from '@/components/pages/review/new/forms'
import AppPath from '@/shared/configs/appPath'
import { useAuth } from '@/shared/providers/auth-provider'

interface PageProps {
  params: Promise<{ kind: string }>
}

export default function Page({ params }: PageProps) {
  const { user, isLoading } = useAuth()
  const [formKind, setFormKind] = useState<FormKind | null>(null)

  useEffect(() => {
    async function loadParams() {
      const { kind } = await params

      if (!isValidFormKind(kind)) {
        notFound()
      }

      setFormKind(kind as FormKind)
    }

    loadParams()
  }, [params])

  useEffect(() => {
    if (!isLoading && !user) {
      redirect(AppPath.login())
    }
  }, [user, isLoading])

  if (isLoading || !user) {
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

  if (!formKind) {
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

  return (
    <main className="">
      <Suspense>
        <div className="max-w-[800px] mx-auto pt-20 pb-20">
          <FormFactory kind={formKind} />
        </div>
      </Suspense>
    </main>
  )
}
