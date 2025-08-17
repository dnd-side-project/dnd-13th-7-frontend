'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { MenuIcon, SearchIcon } from '@/assets/icons'
import { MoyeoitMiniLogo } from '@/assets/images'
import { Button } from '@/components/atoms/Button'
import AppPath from '@/shared/configs/appPath'

const IS_LOGIN = false

export default function MobileHeader() {
  const router = useRouter()
  return (
    <div className="w-full text-grey-color-5 min-w-[320px] desktop:hidden">
      <header className="mx-auto px-4 py-3 ">
        <h1 className="sr-only">moyeoit 모여잇</h1>
        <div className="h-14 w-full bg-white rounded-full flex items-center justify-between px-6 shadow-sm ">
          {/* Left: Logo placeholder */}
          <div className="flex items-center gap-14">
            <Link href={AppPath.home()} className="block">
              <Image
                src={MoyeoitMiniLogo}
                alt="moyeoit logo"
                width={24}
                height={25}
              />
            </Link>
          </div>
          {/* Right: search, profile, cta */}
          <div className="flex items-center gap-4">
            {!IS_LOGIN && (
              <Link
                href={AppPath.login()}
                className="typo-caption-m text-main-color-1 whitespace-nowrap hover:underline focus:underline"
              >
                회원가입/로그인
              </Link>
            )}
            <Button
              variant="none"
              size="none"
              className="w-full h-full rounded-full grid place-items-center transition-colors hover:opacity-50 focus:opacity-50"
              onClick={() => router.push('/review/new')}
            >
              <Image src={SearchIcon} alt="search" width={24} height={24} />
            </Button>
            <Button
              variant="none"
              aria-label="menu"
              size="none"
              className="w-full h-full rounded-full grid place-items-center transition-colors hover:opacity-50 focus:opacity-50"
            >
              <Image src={MenuIcon} alt="menu" width={24} height={24} />
            </Button>
          </div>
        </div>
      </header>
    </div>
  )
}
