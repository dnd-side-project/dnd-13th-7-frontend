'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/atoms/Button/button'
import { Card } from '@/components/molecules/card'
import { useUserSubscribes } from '@/features/subscribe'
import AppPath from '@/shared/configs/appPath'
import useMediaQuery from '@/shared/hooks/useMediaQuery'
import { useAuth } from '@/shared/providers/auth-provider'

export default function Subscribe() {
  const { isDesktop } = useMediaQuery()
  const { user, isLoading: isAuthLoading } = useAuth()
  const router = useRouter()

  const {
    data: subscribeData,
    isLoading: isSubscribeLoading,
    error,
  } = useUserSubscribes()

  // 인증되지 않은 사용자는 로그인 페이지로 리다이렉트
  if (!isAuthLoading && !user) {
    router.push(AppPath.login())
    return null
  }

  // 로딩 상태 처리
  if (isAuthLoading || isSubscribeLoading) {
    return (
      <div className="w-full h-full pt-8 pb-8 gap-12 px-5">
        <h1 className="typo-title-2 px-5">구독</h1>
        <div className="flex justify-center items-center p-2 mt-55">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-4 border-b-2 border-gray-900 rounded-full animate-spin"></div>
            <p className="text-gray-600">구독 목록을 불러오는 중...</p>
          </div>
        </div>
      </div>
    )
  }

  // 에러 상태 처리
  if (error) {
    return (
      <div className="w-full h-full pt-8 pb-8 gap-12 px-5">
        <h1 className="typo-title-2 px-5">구독</h1>
        <div className="flex justify-center items-center p-2 mt-55">
          <div className="text-center text-red-500">
            <p>구독 목록을 불러오는데 실패했습니다.</p>
            <p className="text-sm mt-2">잠시 후 다시 시도해주세요.</p>
          </div>
        </div>
      </div>
    )
  }

  const subscribes = subscribeData?.data?.content || []

  return (
    <div className="w-full h-full pt-8 pb-8 gap-12 px-5">
      <h1 className="typo-title-2 px-5">구독</h1>

      {subscribes.length === 0 ? (
        /* 구독목록 없을 때 */
        <div className="flex flex-col justify-center items-center p-2 mt-55">
          <h1 className="typo-title-1 text-[#00000080]">
            구독한 동아리가 없습니다
          </h1>
          <h3 className="mt-2 typo-body-1-3-m text-[#00000080]">
            관심있는 동아리를 구독하고, 새로운 소식을 가장 빠르게 확인해보세요
          </h3>
          <Button
            size="medium"
            className="w-76 h-12 mt-10"
            onClick={() => router.push(AppPath.clubExplore())}
          >
            동아리 찾아보기
          </Button>
        </div>
      ) : (
        /* 구독목록 있을 때 */
        <div className="max-w-[1100px] mx-auto grid grid-cols-2 desktop:grid-cols-4 px-5 mt-4 justify-items-center">
          {subscribes.map((subscribe) => (
            <Card
              key={subscribe.clubId}
              size={isDesktop ? 'col4Desktop' : 'col4Phone'}
              className={`${subscribe.isRecruiting ? 'relative' : ''} cursor-pointer`}
              onClick={() =>
                router.push(AppPath.clubDetail(subscribe.clubId.toString()))
              }
            >
              <Card.Image />
              {subscribe.isRecruiting && (
                <div className="w-[61px] h-[29px] absolute top-[16px] left-[16px] bg-white text-grey-color-5 typo-caption-sb rounded-[73px] border border-light-color-3 z-10 px-3 py-1.5 text-center">
                  모집중
                </div>
              )}
              <Card.Content className="px-1.5 mt-4">
                <div className="flex flex-col gap-1">
                  <Card.Title className="">{subscribe.clubName}</Card.Title>
                  <Card.Description className="">
                    {subscribe.description}
                  </Card.Description>
                </div>
                <Card.Meta
                  kind={subscribe.categories.join(' · ')}
                  className="mb-12"
                />
              </Card.Content>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
