'use client'

import Link from 'next/link'
import { InstagramIcon } from '@/assets/icons'
import { MoyeoitFullLogo } from '@/assets/images'
import AppPath from '@/shared/configs/appPath'

export default function Footer() {
  return (
    <div className="w-full text-grey-color-5 border-t border-light-color-4">
      <footer className="mx-auto px-5 pt-10 pb-12 max-w-[1100px]">
        {/* Top brand + desc + email */}
        <div className="flex flex-col gap-5 desktop:gap-8">
          <div className="flex flex-col gap-5 desktop:flex-row desktop:justify-between">
            <MoyeoitFullLogo
              width={144}
              height={40}
              role="img"
              aria-label="logo"
            />
            <div className="flex flex-row gap-4 text-black-color typo-button-m desktop:typo-body-2-2-m">
              <Link href={AppPath.home()}>서비스 소개</Link>
              <Link href={AppPath.home()}>문의</Link>
              <Link href={AppPath.home()}>이용약관</Link>
              <Link href={AppPath.home()}>개인정보 처리방침</Link>
            </div>
          </div>
          <div className="flex flex-col gap-1 text-grey-color-4">
            <p className="typo-caption-m">
              IT 직군을 위한 실전 성장 플랫폼, 모여잇
            </p>
            <a
              href="mailto:ahdudlt@gmail.com"
              className="typo-caption-m hover:underline focus:underline"
            >
              AHDUDLT@GMAIL.COM
            </a>
          </div>
        </div>

        {/* Divider */}
        <hr className="w-full border-light-color-3 mt-8 mb-5" />

        {/* Bottom copyright + social */}
        <div className="flex items-center justify-between typo-caption-m text-grey-color-2">
          <p>©2025 MOYEOIT</p>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="instagram"
            className="inline-flex items-center justify-center"
          >
            <InstagramIcon
              width={32}
              height={32}
              role="img"
              aria-label="instagram"
            />
          </a>
        </div>
      </footer>
    </div>
  )
}
