'use client'

import Image from 'next/image'
import Link from 'next/link'
import { QuickButton } from '@/components/atoms/quickButton'
import { Card } from '@/components/molecules/card'
import { usePopularClubs } from '@/features/clubs/queries'
import { usePopularPremiumReviews } from '@/features/review/queries'
import useMediaQuery from '@/shared/hooks/useMediaQuery'

export default function HomePage() {
  const { isDesktop } = useMediaQuery()
  const { data: popularClubs } = usePopularClubs()
  const { data: popularPremiumReviews } = usePopularPremiumReviews()

  return (
    <div>
      <div className="h-64 lg:h-100 flex items-end justify-center px-5 py-14 lg:py-18 -mt-20 relative">
        <Image
          src="/images/mainBanner.gif"
          alt="메인 배너"
          width={1200}
          height={400}
          unoptimized
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="max-w-7xl w-full relative z-10"></div>
      </div>

      {/* 하단 푸터 제외한 컨테이너 내용물 전체 */}
      <div className=" py-8 max-w-[1100px] w-full mx-auto">
        {/* 상단 버튼 2개  */}
        <div className="flex flex-row gap-4 justify-center items-center p-6">
          <QuickButton
            icon="/icons/subscribe.svg"
            title="구독"
            description="구독한 IT 활동 모아보기"
            href="/subscribe"
          />
          <QuickButton
            icon="/icons/clubMatching.svg"
            title="동아리 매칭"
            description="아직 준비중이에요"
            href="/"
            onClick={() => alert('준비중인 기능입니다')}
          />
        </div>

        {/* 인기 IT 동아리  */}
        <div className={`${isDesktop ? 'mt-12' : 'mt-8'} px-5 pb-4`}>
          <div className="flex flex-row justify-between items-center">
            <h2 className="typo-title-2">인기 IT 동아리</h2>
            <Link href="/club/explore">
              <div className="typo-button-m text-grey-color-3 cursor-pointer">
                전체보기
              </div>
            </Link>
          </div>

          <div
            className={`grid ${isDesktop ? 'grid-cols-4 gap-4 gap-y-4' : 'grid-cols-2 gap-3 gap-y-6'} mt-6 ${!isDesktop ? 'justify-items-center' : ''}`}
          >
            {popularClubs?.content
              ? popularClubs.content.map((club) => (
                  <Link key={club.clubId} href={`/club/${club.clubId}`}>
                    <Card
                      size={isDesktop ? 'col4Desktop' : 'col4Phone'}
                      orientation="vertical"
                      border={true}
                      gap="12px"
                      className="group cursor-pointer relative"
                    >
                      <Card.Image
                        logoUrl={club.logoUrl}
                        alt={club.clubName}
                        interactive
                        className="transition-transform duration-300 ease-out"
                      />
                      <Card.Content className="px-[6px]">
                        <Card.Title>{club.clubName}</Card.Title>
                        <Card.Description>{club.description}</Card.Description>
                        <Card.Meta part={club.categories.join(' · ')} />
                      </Card.Content>
                      {club.isRecruiting && (
                        <div className="w-[61px] h-[29px] absolute top-[16px] left-[16px] bg-white text-grey-color-5 typo-caption-sb rounded-[73px] border border-light-color-3 z-10 px-3 py-1.5 text-center flex items-center justify-center leading-none">
                          모집중
                        </div>
                      )}
                    </Card>
                  </Link>
                ))
              : null}
          </div>
        </div>
        {/* IT 동아리 프리미엄 후기 */}
        <div className={`${isDesktop ? 'mt-16' : 'mt-12'} px-5`}>
          <div>
            <h2 className="typo-title-2">IT 동아리 프리미엄 후기</h2>
          </div>

          <div
            className={`grid ${isDesktop ? 'grid-cols-2 gap-6' : 'grid-cols-1 gap-4'} mt-6 ${isDesktop ? 'mb-16' : 'mb-12'}`}
          >
            {popularPremiumReviews?.content
              ? popularPremiumReviews.content.map((review) => (
                  <Link
                    key={review.reviewId}
                    href={`/review/${review.reviewId}`}
                  >
                    <Card
                      size={isDesktop ? 'col3Desktop' : 'homeReviewPhone'}
                      orientation="horizontal"
                      border={true}
                      gap="12px"
                      className="group cursor-pointer relative"
                    >
                      <Card.Image
                        alt={review.title}
                        interactive
                        className="transition-transform duration-300 ease-out"
                      />
                      <Card.Content className="px-[6px]">
                        <Card.Title>{review.title}</Card.Title>
                        <Card.Description>{review.headLine}</Card.Description>
                        <Card.Meta part={review.identifier.join(' · ')} />
                        <Card.Stats
                          likes={review.likeCount}
                          comments={review.commentCount}
                        />
                      </Card.Content>
                    </Card>
                  </Link>
                ))
              : null}
          </div>
        </div>

        {/* 하단 광고 배너 */}
        <div className="mx-5 mb-12">
          <div>
            <img
              src="/icons/main.svg"
              alt="main"
              className={`w-full ${isDesktop ? 'h-66' : 'h-44'} rounded-[24px] p-6 flex items-center justify-between`}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
