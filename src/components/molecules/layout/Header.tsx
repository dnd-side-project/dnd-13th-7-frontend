'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ProfileIcon, SearchIcon } from '@/assets/icons'
import { MoyeoitFullLogo } from '@/assets/images'
import { Button } from '@/components/atoms/Button'

const IS_LOGIN = true

export default function Header() {
  const router = useRouter()
  return (
    <div className="w-full text-grey-color-5 max-desktop:hidden">
      <header className="mx-auto px-4 py-3 ">
        <h1 className="sr-only">moyeoit 모여잇</h1>
        <div className="h-14 w-full bg-white rounded-full flex items-center justify-between px-6 shadow-sm ">
          {/* Left: Logo placeholder */}
          <div className="flex items-center gap-14">
            <Link href="/" className="block">
              <Image
                src={MoyeoitFullLogo}
                alt="moyeoit logo"
                width={132}
                height={20}
              />
            </Link>

            <nav className="flex items-center gap-10 typo-body-3-b text-black-color">
              <Link
                href="/club/explore"
                className="hover:text-main-color-1 focus:text-main-color-1 transition-colors"
              >
                탐색하기
              </Link>
              <span className="text-light-color-4">비교 노트</span>
              <span className="text-light-color-4">지원 준비</span>
              <Link
                href="/review/explore"
                className="hover:text-main-color-1 focus:text-main-color-1 transition-colors"
              >
                후기
              </Link>
            </nav>
          </div>
          {/* Right: search, profile, cta */}
          <div className="flex items-center gap-2">
            <Button
              variant="none"
              size="none"
              aria-label="search"
              className="w-full h-full rounded-full grid place-items-center transition-colors hover:opacity-50 focus:opacity-50"
            >
              <Image src={SearchIcon} alt="search" width={24} height={24} />
            </Button>
            {IS_LOGIN ? (
              <Button
                variant="none"
                size="none"
                aria-label="profile"
                className="w-full h-full rounded-full grid place-items-center transition-colors hover:opacity-50 focus:opacity-50"
              >
                <Image src={ProfileIcon} alt="profile" width={48} height={48} />
              </Button>
            ) : (
              <Link
                href="/login"
                className="typo-caption-m text-main-color-1 hover:underline focus:underline"
              >
                회원가입/로그인
              </Link>
            )}
            <Button
              size="small"
              variant="solid"
              onClick={() => router.push('/review/new')}
              className="typo-button"
            >
              후기 작성
            </Button>
          </div>
        </div>
      </header>
    </div>
  )
}
