'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { MoyeoitLogo } from '@/assets/images'
import { Button } from '@/components/atoms/Button'

export default function Header() {
  const router = useRouter()
  return (
    <div className="w-full text-grey-color-5">
      <header className="mx-auto max-w-screen-xl px-4 py-3">
        <h1 className="sr-only">moyeoit 모여잇</h1>
        <div className="h-14 w-full bg-white rounded-full flex items-center justify-between px-6">
          {/* Left: Logo placeholder */}
          <Link href="/" className="block">
            <Image
              src={MoyeoitLogo}
              alt="moyeoit logo"
              width={132}
              height={20}
            />
          </Link>

          {/* Center: Nav */}
          <nav className="flex items-center gap-10 text-sm">
            <Link href="/club/explore" className="text-gray-900 font-semibold">
              탐색하기
            </Link>
            <span className="text-gray-300">비교 노트</span>
            <span className="text-gray-300">지원 준비</span>
            <Link
              href="/review/explore"
              className="text-gray-900 font-semibold"
            >
              후기
            </Link>
          </nav>

          {/* Right: search, profile, cta */}
          <div className="flex items-center gap-3">
            <button
              aria-label="search"
              className="w-8 h-8 rounded-full border border-gray-200 grid place-items-center text-gray-500"
            >
              <span className="i">🔍</span>
            </button>
            <button
              aria-label="profile"
              className="w-8 h-8 rounded-full border border-gray-200 grid place-items-center text-gray-500"
            >
              <span className="i">👤</span>
            </button>
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
