'use client'

import * as React from 'react'
import { useRouter } from 'next/navigation'
import type { ClubItem } from '@/features/explore/types'
import useMediaQuery from '@/shared/hooks/useMediaQuery'
import { Card } from '.'
import { MobileCard } from './MobileCard'

export interface CardOverlayProps {
  club: ClubItem
  isSubscribed: boolean
  onBookmarkClick: (
    e: React.MouseEvent<HTMLButtonElement>,
    clubId: number,
  ) => void
}

/**
 * Render a club card that navigates to the club detail page and exposes a bookmark control.
 *
 * Renders a desktop Card variant or a MobileCard based on viewport size. Displays the club's
 * image, name, description, categories, subscription state, and an optional recruiting badge.
 *
 * @param club - Club data used to populate the card (logo, name, description, categories, id, recruiting flag)
 * @param isSubscribed - Whether the current user is subscribed to the club
 * @param onBookmarkClick - Callback invoked with the bookmark click event and the club's id
 * @returns A React element representing the club card appropriate for the current viewport
 */
export default function CardOverlay({
  club,
  isSubscribed,
  onBookmarkClick,
}: CardOverlayProps) {
  const { isDesktop } = useMediaQuery()
  const router = useRouter()

  const handleClick = () => {
    router.push(`/club/${club.clubId}`)
  }

  const handleBookmarkClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onBookmarkClick(e, club.clubId)
  }

  if (isDesktop) {
    return (
      <Card
        size="col3Desktop"
        orientation="vertical"
        border={true}
        gap="12px"
        className="group cursor-pointer relative"
        onClick={handleClick}
      >
        <Card.Image
          logoUrl={club.logoUrl || '/images/default.svg'}
          alt={club.clubName}
          interactive
          className="transition-transform duration-300 ease-out"
        />
        <Card.Bookmark
          isSubscribed={isSubscribed}
          onClick={handleBookmarkClick}
        />
        <Card.Content className="px-[6px]">
          <Card.Title className="">{club.clubName}</Card.Title>
          <Card.Description>{club.description}</Card.Description>
          <Card.Meta part={club.categories.join(' · ')} />
        </Card.Content>
        {club.isRecruiting && (
          <div className="w-[61px] h-[29px] absolute top-[16px] left-[16px] bg-white text-grey-color-5 typo-caption-sb rounded-[73px] border border-light-color-3 z-10 px-3 py-1.5 text-center flex items-center justify-center leading-none">
            모집중
          </div>
        )}
      </Card>
    )
  }

  return (
    <div className="relative">
      <MobileCard
        logoUrl={club.logoUrl}
        alt={club.clubName}
        clubName={club.clubName}
        description={club.description}
        categories={club.categories}
        isSubscribed={isSubscribed}
        onBookmarkClick={handleBookmarkClick}
        onClick={handleClick}
      />
    </div>
  )
}