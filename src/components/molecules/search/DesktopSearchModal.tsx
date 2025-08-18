'use client'

import * as React from 'react'
import VisuallyHidden from '@/components/molecules/a11y/VisuallyHidden'
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/molecules/dialog'
import useSearchUrlState from '@/shared/hooks/useSearchUrlState'
import SearchCore from './SearchCore'

export interface DesktopSearchModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DesktopSearchModal({
  open,
  onOpenChange,
}: DesktopSearchModalProps) {
  const { keyword, setKeyword } = useSearchUrlState()
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={true}
        className="w-full rounded-2xl border border-light-color-4 bg-white-color py-14 shadow-lg top-24 translate-y-0"
      >
        <VisuallyHidden>
          <DialogTitle>검색</DialogTitle>
        </VisuallyHidden>
        <SearchCore
          autoFocus
          placeholder="검색어를 입력해주세요"
          keyword={keyword}
          onKeywordChange={setKeyword}
        />
      </DialogContent>
    </Dialog>
  )
}

export default DesktopSearchModal
