'use client'

import Link from 'next/link'
import { QuickButton } from '@/components/atoms/quickButton'
import { Card } from '@/components/molecules/card'
import { usePopularClubs } from '@/features/clubs/queries'
import { premiumReviews } from '@/mocks/mockData/mockPremiumReview'
import useMediaQuery from '@/shared/hooks/useMediaQuery'

export default function HomePage() {
  const { isDesktop } = useMediaQuery()
  const { data: popularClubs, isLoading: isPopularClubsLoading } =
    usePopularClubs()

  return (
    <div>
      <div className="bg-grey-color-5 text-white h-64 lg:h-100 flex items-end justify-center px-5 py-14 lg:py-18 -mt-20">
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
            {isPopularClubsLoading
              ? // 로딩 상태
                Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className={`${isDesktop ? 'w-full' : 'w-40'} h-48 bg-gray-200 rounded-lg animate-pulse`}
                  />
                ))
              : popularClubs?.content
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
                          <Card.Description>
                            {club.description}
                          </Card.Description>
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
            {premiumReviews.map((review) => (
              <Card
                key={review.id}
                size={isDesktop ? 'col3Desktop' : 'homeReviewPhone'}
                orientation="horizontal"
                border={true}
                gap="12px"
                className="group cursor-pointer relative"
              >
                <Card.Image
                  alt={review.meta[0]}
                  interactive
                  className="transition-transform duration-300 ease-out"
                />
                <Card.Content className="px-[6px]">
                  <Card.Title>{review.title}</Card.Title>
                  <Card.Description>{review.description}</Card.Description>
                  <Card.Meta part={review.meta.join(' · ')} />
                  <Card.Stats likes={review.likes} comments={review.comments} />
                </Card.Content>
              </Card>
            ))}
          </div>
        </div>

        {/* 하단 광고 배너 */}
        <div className="mx-5 mb-12">
          <div
            className={`w-full ${isDesktop ? 'h-66' : 'h-44'} bg-[#5846CB] rounded-[24px] p-6 flex items-center justify-between`}
          />
        </div>
      </div>
    </div>
  )
}
