'use client'

import * as React from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

/**
 * Centralized search overlay state synced with URL query params.
 * - `search=1` indicates the overlay is open
 * - `q` holds the current keyword
 */
export default function useSearchUrlState() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const isOpen = searchParams?.get('search') === '1'
  const keyword = searchParams?.get('q') ?? ''

  const updateParams = React.useCallback(
    (updater: (params: URLSearchParams) => void) => {
      const next = new URLSearchParams(searchParams?.toString())
      updater(next)
      const query = next.toString()
      const href = query ? `${pathname}?${query}` : pathname
      router.replace(href || '', { scroll: false })
    },
    [router, pathname, searchParams],
  )

  const open = React.useCallback(() => {
    updateParams((p) => p.set('search', '1'))
  }, [updateParams])

  const close = React.useCallback(() => {
    updateParams((p) => p.delete('search'))
  }, [updateParams])

  const setOpen = React.useCallback(
    (openState: boolean) => {
      updateParams((p) => {
        if (openState) p.set('search', '1')
        else p.delete('search')
      })
    },
    [updateParams],
  )

  const setKeyword = React.useCallback(
    (value: string) => {
      updateParams((p) => {
        if (value && value.trim().length > 0) p.set('q', value)
        else p.delete('q')
      })
    },
    [updateParams],
  )

  const clearKeyword = React.useCallback(() => setKeyword(''), [setKeyword])

  return {
    isOpen,
    open,
    close,
    setOpen,
    keyword,
    setKeyword,
    clearKeyword,
  }
}
