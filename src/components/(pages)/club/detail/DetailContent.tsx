'use client'

import { Tag } from '@/components/atoms'
import { Card } from '@/components/molecules/card'
import { useClubDetails } from '@/features/clubs/queries'

interface DetailContentProps {
  clubId: number
}

export default function DetailContent({ clubId }: DetailContentProps) {
  const { data: clubDetails, isLoading, error } = useClubDetails(Number(clubId))

  if (isLoading) {
    return (
      <div className="mt-12 w-full">
        <div className="text-center py-20">로딩 중...</div>
      </div>
    )
  }

  if (error || !clubDetails) {
    return (
      <div className="mt-12 w-full">
        <div className="text-center py-20 text-red-500">
          데이터를 불러오는데 실패했습니다.
        </div>
      </div>
    )
  }

  return (
    <div className="mt-12 w-full">
      {/* 동아리 소개  */}
      <div className="mb-20">
        <div className="typo-title-3 mb-4">동아리 소개</div>
        <div className="typo-body-3-3-r">{clubDetails.club.bio}</div>
      </div>

      {/* 히스토리 */}
      <div className="mb-20">
        <div className="typo-title-3 mb-4">히스토리</div>
        <div className="mb-4 typo-body-3-3-r">{clubDetails.club.slogan}</div>
        <div className="flex flex-row gap-4 mb-20">
          <div className="flex flex-col justify-center items-center w-full px-12 py-6 bg-white rounded-[16px]">
            <div className="typo-caption-m">설립 연도</div>
            <div className="typo-body-1-b">
              {clubDetails.club.establishment}년
            </div>
          </div>
          <div className="flex flex-col justify-center items-center w-full px-12 py-6 bg-white rounded-[16px]">
            <div className="typo-caption-m">총 참가자 수</div>
            <div className="typo-body-1-b">
              {clubDetails.club.totalParticipant}명
            </div>
          </div>
          <div className="flex flex-col justify-center items-center w-full px-12 py-6 bg-white rounded-[16px]">
            <div className="typo-caption-m">운영 기수</div>
            <div className="typo-body-1-b">{clubDetails.club.operation}기</div>
          </div>
        </div>
      </div>

      {/* 주요 활동 내용 */}
      <div className="mb-20">
        <div className="typo-title-3 mb-4">
          주요 활동 내용 (활동 수 제한은 없습니다)
        </div>
        <div className="flex flex-col gap-8">
          {clubDetails.activities?.map((activity, index) => (
            <Card
              key={activity.activityOrder || index}
              size="col3Desktop"
              orientation="horizontal"
              className="h-37"
            >
              <Card.Image
                logoUrl={activity.imageUrl}
                alt={`${activity.activityName} 이미지`}
                className="w-56 h-37 mr-4"
              />
              <Card.Content className="py-2 h-37">
                <div className="flex flex-wrap gap-2 mb-1">
                  <span className="typo-button-m text-main-color-1">
                    {activity.hashtag}
                  </span>
                </div>
                <Card.Title className="typo-body-1-b mb-2">
                  {activity.activityName}
                </Card.Title>
                <Card.Description className="typo-body-3-3-r text-black-color line-clamp-4">
                  {activity.activityDescribe}
                </Card.Description>
              </Card.Content>
            </Card>
          ))}
        </div>
      </div>

      {/* 활동 방식 */}
      <div className="mb-20">
        <div className="typo-title-3 mb-4">활동 방식</div>
        <div>
          {clubDetails.club.offline && (
            <div className="mb-6 flex items-center">
              <Tag
                kind="clubDetail"
                size="none"
                color="white"
                label="오프라인"
                className="w-20 h-8 px-3 py-1 mr-4 rounded-full typo-body-3-b"
              />
              <div className="typo-body-3-3-r">{clubDetails.club.offline}</div>
            </div>
          )}
          {clubDetails.club.online && (
            <div className="mb-6 flex items-center">
              <Tag
                kind="clubDetail"
                size="none"
                color="white"
                label="온라인"
                className="w-20 h-8 px-3 py-1 mr-4 rounded-full typo-body-3-b"
              />
              <div className="typo-body-3-3-r">{clubDetails.club.online}</div>
            </div>
          )}
        </div>
      </div>

      {/* 활동 일정 */}
      <div className="mb-20">
        <div className="typo-title-3 mb-4">활동 일정</div>
        <div>
          {clubDetails.clubSchedules?.map((schedule, index) => (
            <div key={index} className="mb-6 flex items-center">
              <Tag
                kind="clubDetail"
                size="none"
                color={schedule.period === '공통' ? 'purple' : 'lightPurple'}
                label={schedule.period}
                className="w-16 h-8 px-3 py-1 mr-4 rounded-full typo-body-3-b"
              />
              <div className="typo-body-3-3-r">{schedule.activity}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 활동 장소  */}
      <div className="mb-20">
        <div className="typo-title-3 mb-4">활동 장소</div>
        <div className="mb-4 typo-body-3-3-r">설명부분 (선택)</div>

        <div className="flex flex-col">
          <div className="flex flex-col w-full bg-white rounded-[16px] px-8 py-4 gap-1">
            <div className="flex items-center">
              <div className="typo-button-b mr-4">장소</div>
              <div className="typo-button-m">{clubDetails.club.location}</div>
            </div>
            <div className="flex items-center">
              <div className="typo-button-b mr-4">주소</div>
              <div className="typo-button-m">{clubDetails.club.address}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 지원 과정 */}
      <div className="mb-36">
        <div className="typo-title-3 mb-4">지원 과정</div>
        {clubDetails.club.process?.map((processStep, index) => (
          <div key={index} className="mb-6 flex items-center">
            <Tag
              kind="clubDetail"
              size="none"
              color="white"
              label={`${index + 1}차`}
              className="w-16 h-8 px-3 py-1 mr-4 rounded-full typo-body-3-b"
            />
            <div className="typo-body-3-3-r">{processStep}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
