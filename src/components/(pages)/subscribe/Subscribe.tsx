'use client'

import { Button } from '@/components/atoms/Button/button'
import { Card } from '@/components/molecules/card'
import { clubs } from '@/mocks/mockData/mockClubs'
import useMediaQuery from '@/shared/hooks/useMediaQuery'

export default function Subscribe() {
  const { isDesktop } = useMediaQuery()

  return (
    <div className=" w-full h-full pt-8 pb-8 gap-12 px-5 ">
      <h1 className="typo-title-2 px-5">구독</h1>

      {clubs.length === 0 ? (
        /* 구독목록 없을 때 */
        <div className=" flex flex-col justify-center items-center p-2 mt-55">
          <h1 className="typo-title-1 text-[#00000080]">
            구독한 동아리가 없습니다
          </h1>
          <h3 className="mt-2  typo-body-1-3-m text-[#00000080]">
            관심있는 동아리를 구독하고, 새로운 소식을 가장 빠르게 확인해보세요
          </h3>
          <Button size="medium" className="w-76 h-12 mt-10">
            동아리 찾아보기
          </Button>
        </div>
      ) : (
        /* 구독목록 있을 때 */
        <div className="max-w-[1100px] mx-auto grid grid-cols-2 desktop:grid-cols-4 px-5 mt-4 justify-items-center">
          {clubs.map((club) => (
            <Card
              key={club.clubId}
              size={isDesktop ? 'col4Desktop' : 'col4Phone'}
              className={`${club.isRecruiting ? 'relative' : ''}`}
            >
              <Card.Image />
              {club.isRecruiting && (
                <div className="w-[61px] h-[29px] absolute top-[16px] left-[16px] bg-white text-grey-color-5 typo-caption-sb rounded-[73px] border border-light-color-3 z-10 px-3 py-1.5 text-center">
                  모집중
                </div>
              )}
              <Card.Content className="px-1.5 mt-4">
                <div className="flex flex-col gap-1">
                  <Card.Title className="">{club.clubName}</Card.Title>
                  <Card.Description className="">
                    {club.description}
                  </Card.Description>
                </div>
                <Card.Meta
                  kind={club.categories.join(' · ')}
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
