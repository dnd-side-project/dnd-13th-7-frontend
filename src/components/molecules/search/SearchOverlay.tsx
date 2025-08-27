'use client'

import * as React from 'react'
import useMediaQuery from '@/shared/hooks/useMediaQuery'
import useSearchUrlState from '@/shared/hooks/useSearchUrlState'
import DesktopSearchModal from './DesktopSearchModal'
import MobileSearchSheet from './MobileSearchSheet'

export default function SearchOverlay() {
  const { isOpen, setOpen } = useSearchUrlState()
  const { isDesktop } = useMediaQuery()
  return (
    <>
      {isDesktop ? (
        <DesktopSearchModal open={isOpen} onOpenChange={setOpen} />
      ) : (
        <MobileSearchSheet open={isOpen} onOpenChange={setOpen} />
      )}
    </>
  )
}
