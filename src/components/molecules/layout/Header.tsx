'use client'

import * as React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ProfileIcon, SearchIcon } from '@/assets/icons'
import { MoyeoitFullLogo } from '@/assets/images'
import { Button } from '@/components/atoms/Button'
import { useUserProfile } from '@/features/user'
import AppPath from '@/shared/configs/appPath'
import useSearchUrlState from '@/shared/hooks/useSearchUrlState'
import { useAuth } from '@/shared/providers/auth-provider'
import { ReviewWriteDropdown } from './sections'

export default function Header() {
  const router = useRouter()
  const { setOpen } = useSearchUrlState()
  const { user } = useAuth()
  const { data: profile } = useUserProfile()

  return (
    <div className="w-full text-grey-color-5 max-desktop:hidden">
      <header className="mx-auto px-4 py-3 z-20 relative">
        <h1 className="sr-only">moyeoit 모여잇</h1>
        <div className="h-14 w-full bg-white rounded-full flex items-center justify-between px-6 shadow-sm ">
          {/* Left: Logo placeholder */}
          <div className="flex items-center gap-14">
            <Link href={AppPath.home()} className="block">
              <MoyeoitFullLogo
                width={132}
                height={20}
                role="img"
                aria-label="moyeoit logo"
              />
            </Link>

            <nav className="flex items-center gap-10 typo-body-3-b text-black-color">
              <Link
                href={AppPath.clubExplore()}
                className="hover:text-main-color-1 focus:text-main-color-1 transition-colors"
              >
                탐색하기
              </Link>
              <span className="text-light-color-4">비교 노트</span>
              <span className="text-light-color-4">지원 준비</span>
              <Link
                href={AppPath.reviewExplore()}
                className="hover:text-main-color-1 focus:text-main-color-1 transition-colors"
              >
                후기
              </Link>
            </nav>
          </div>
          {/* Right: search, profile, cta */}
          <div className="flex items-center gap-4">
            <Button
              variant="none"
              size="none"
              aria-label="search"
              className="w-full h-full rounded-full grid place-items-center transition-colors hover:opacity-50 focus:opacity-50"
              onClick={() => setOpen(true)}
            >
              <SearchIcon
                width={24}
                height={24}
                role="img"
                aria-label="search"
              />
            </Button>
            {user ? (
              <Button
                variant="none"
                size="none"
                aria-label="profile"
                className="w-full h-full rounded-full grid place-items-center transition-colors hover:opacity-50 focus:opacity-50"
                onClick={() => router.push(AppPath.myPage())}
              >
                {profile?.profileImageUrl ? (
                  <Image
                    src={profile.profileImageUrl}
                    alt="profile"
                    className="w-full h-full object-cover rounded-full"
                    width={40}
                    height={40}
                  />
                ) : (
                  <ProfileIcon
                    width={40}
                    height={40}
                    role="img"
                    aria-label="profile"
                  />
                )}
              </Button>
            ) : (
              <Link
                href={AppPath.login()}
                className="typo-caption-m text-main-color-1 whitespace-nowrap hover:underline focus:underline"
              >
                회원가입/로그인
              </Link>
            )}
            <ReviewWriteDropdown />
          </div>
        </div>
      </header>
    </div>
  )
}
