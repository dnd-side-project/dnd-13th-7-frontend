'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ProfileIcon, SearchIcon, BellIcon, ThumbsUpIcon } from '@/assets/icons'
import { MoyeoitFullLogo } from '@/assets/images'
import { Button } from '@/components/atoms/Button'
import { Input } from '@/components/atoms/Input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/atoms/Select'

export default function MyPage() {
  return (
    <div className="min-h-screen bg-light-color-2">
      {/* Hero Section */}
      <div className="bg-main-color-2 pt-20 pb-18 px-5 h-[390px] -mt-20">
        <div className="max-w-[1100px] mx-auto px-5 h-full flex items-end">
          <h1 className="typo-main-title text-white-color">마이 페이지</h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex justify-center">
        <div className="flex gap-5 max-w-[1100px] w-full px-5 pt-14">
          <div className="w-52 flex-shrink-0">
            <div className="flex flex-col gap-2.5">
              <div className="bg-white rounded-lg px-5 py-3">
                <span className="typo-body-1-2-sb text-black-color">
                  프로필
                </span>
              </div>
              {/* <div className="rounded-lg px-5 py-3">
                <span className="typo-body-1-2-sb text-black-color">후기</span>
              </div>
              <div className="rounded-lg px-5 py-3">
                <span className="typo-body-1-2-sb text-grey-color-1">
                  로그아웃
                </span>
              </div> */}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 pb-8">
            {/* 관심 활동 섹션 */}
            <div className="bg-white rounded-3xl p-8 mb-6">
              <div className="flex flex-col gap-12">
                <div className="flex flex-col gap-1">
                  <h2 className="typo-title-3 text-black-color">관심 활동</h2>
                  <p className="typo-body-3-3-r text-grey-color-1">
                    관심 활동을 설정해두면 가장 빠르게 소식을 얻을 수 있어요.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="flex-1 bg-light-color-1 rounded-2xl p-5 border border-light-color-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="typo-body-3-b text-grey-color-4">
                        공고 구독
                      </span>
                      <div className="w-6 h-6">
                        <Image
                          src={BellIcon}
                          alt="bell"
                          width={24}
                          height={24}
                          className="text-grey-color-4"
                        />
                      </div>
                    </div>
                    <div className="typo-title-1 text-black-color">0</div>
                  </div>
                  <div className="flex-1 bg-light-color-1 rounded-2xl p-5 border border-light-color-2">
                    <div className="flex items-center justify-between mb-2">
                      <span className="typo-body-3-b text-grey-color-4">
                        추천 후기
                      </span>
                      <div className="w-6 h-6">
                        <Image
                          src={ThumbsUpIcon}
                          alt="thumbs up"
                          width={24}
                          height={24}
                          className="text-grey-color-4"
                        />
                      </div>
                    </div>
                    <div className="typo-title-1 text-black-color">100</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 내 정보 섹션 */}
            <div className="bg-white rounded-3xl p-8">
              <div className="flex flex-col gap-12">
                <div className="flex flex-col gap-1">
                  <h2 className="typo-title-3 text-black-color">내 정보</h2>
                  <p className="typo-body-3-3-r text-grey-color-1">
                    모여잇에서 제공되는 맞춤 콘텐츠 및 후기 정보의 기본 데이터로
                    활용돼요.
                  </p>
                </div>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-4">
                    {/* 프로필 사진 */}
                    <div className="flex gap-12 items-center">
                      <label className="typo-body-3-b text-black-color w-40">
                        프로필 사진
                      </label>
                      <div className="flex items-center gap-4">
                        <div className="w-[120px] h-[120px] bg-light-color-2 rounded-2xl flex items-center justify-center">
                          <Image
                            src={ProfileIcon}
                            alt="profile"
                            width={48}
                            height={48}
                          />
                        </div>
                        <Button variant="outlined-primary" size="small">
                          변경
                        </Button>
                      </div>
                    </div>

                    {/* 이름 */}
                    <div className="flex gap-12 items-center">
                      <label className="typo-body-3-b text-black-color w-40">
                        이름
                      </label>
                      <div className="flex-1">
                        <Input type="text" value="김모여" className="h-12" />
                      </div>
                    </div>

                    {/* 분야 */}
                    <div className="flex gap-12 items-center">
                      <label className="typo-body-3-b text-black-color w-40">
                        분야
                      </label>
                      <div className="flex-1">
                        <Select defaultValue="design">
                          <SelectTrigger className="h-12">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="design">디자인</SelectItem>
                            <SelectItem value="development">개발</SelectItem>
                            <SelectItem value="marketing">마케팅</SelectItem>
                            <SelectItem value="planning">기획</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* 상태 */}
                    <div className="flex gap-12 items-center">
                      <label className="typo-body-3-b text-black-color w-40">
                        상태
                      </label>
                      <div className="flex-1">
                        <Select>
                          <SelectTrigger className="h-12">
                            <SelectValue placeholder="현재 상태를 선택해주세요" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="student">학생</SelectItem>
                            <SelectItem value="job-seeker">구직자</SelectItem>
                            <SelectItem value="employed">재직자</SelectItem>
                            <SelectItem value="freelancer">프리랜서</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
