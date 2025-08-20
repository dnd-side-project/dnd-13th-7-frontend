'use client'

import { useCallback } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function useQueryState(key: string, defaultValue?: string) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const value = searchParams.get(key) ?? defaultValue ?? null

  const setValue = useCallback(
    (
      next: string | null,
      options?: { scroll?: boolean; replace?: boolean },
    ) => {
      const params = new URLSearchParams(searchParams.toString())
      if (next == null || next === '') params.delete(key)
      else params.set(key, next)

      const url = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname

      if (options?.replace ?? true)
        router.replace(url, { scroll: options?.scroll ?? false })
      else router.push(url, { scroll: options?.scroll ?? false })
    },
    [router, pathname, searchParams, key],
  )

  return [value, setValue] as const
}
