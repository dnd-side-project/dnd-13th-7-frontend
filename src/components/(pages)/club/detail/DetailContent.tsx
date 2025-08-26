import { Button, Tag } from '@/components/atoms'
import { Card } from '@/components/molecules/card'

export default function DetailContent() {
  return (
    <div className="mt-12 w-full">
      {/* 동아리 소개  */}
      <div className="mb-20">
        <div className="typo-title-3 mb-4">동아리 소개</div>
        <div className="typo-body-3-3-r">내용</div>
      </div>

      {/* 히스토리 */}
      <div className="mb-20">
        <div className="typo-title-3 mb-4">히스토리</div>
        <div className="mb-4 typo-body-3-3-r">내용</div>
        <div className="flex flex-row gap-4 mb-20">
          <div className="flex flex-col justify-center items-center w-full px-12 py-6 bg-white rounded-[16px]">
            <div className="typo-caption-m">설립 연도</div>
            <div className="typo-body-1-b">2019년</div>
          </div>
          <div className="flex flex-col justify-center items-center w-full px-12 py-6 bg-white rounded-[16px]">
            <div className="typo-caption-m">총 참가자 수</div>
            <div className="typo-body-1-b">100명</div>
          </div>
          <div className="flex flex-col justify-center items-center w-full px-12 py-6 bg-white rounded-[16px]">
            <div className="typo-caption-m">운영 기수</div>
            <div className="typo-body-1-b">13기</div>
          </div>
        </div>
      </div>

      {/* 주요 활동 내용 */}
      <div className="mb-20">
        <div className="typo-title-3 mb-4">
          주요 활동 내용 (활동 수 제한은 없습니다)
        </div>
        <div className="flex flex-col gap-8">
          {/* 임시 데이터 - 나중에 API 데이터로 교체 */}
          {[
            {
              id: 1,
              title: '활동 제목 1',
              description:
                '활동에 대한 상세한 설명이 들어갑니다. 이 활동은 동아리의 핵심 활동 중 하나로, 멤버들이 실제로 참여하게 되는 주요 활동입니다.',
              image: '/images/default.svg',
              hashtags: ['예시', '활동', '프로젝트'],
            },
            {
              id: 2,
              title: '활동 제목 2',
              description:
                '두 번째 활동에 대한 상세한 설명입니다. 이 활동도 동아리의 중요한 활동 중 하나입니다.',
              image: '/images/default.svg',
              hashtags: ['예시', '워크샵'],
            },
            {
              id: 3,
              title: '활동 제목 3',
              description:
                '세 번째 활동에 대한 설명입니다. 다양한 활동을 통해 멤버들이 성장할 수 있습니다.',
              image: '/images/default.svg',
              hashtags: ['예시', '스터디', '발표'],
            },
          ].map((activity) => (
            <Card
              key={activity.id}
              size="col3Desktop"
              orientation="horizontal"
              className="h-37"
            >
              <Card.Image
                logoUrl={activity.image}
                alt={`${activity.title} 이미지`}
                className="w-56 h-37 mr-4"
              />
              <Card.Content className="py-2 h-37">
                <div className="flex flex-wrap gap-2 mb-1">
                  {activity.hashtags.map((tag, index) => (
                    <span
                      key={index}
                      className="typo-button-m text-main-color-1"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <Card.Title className="typo-body-1-b mb-2">
                  {activity.title}
                </Card.Title>
                <Card.Description className="typo-body-3-3-r text-black-color line-clamp-4">
                  {activity.description}
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
          <div className="mb-6 flex items-center">
            <Tag
              kind="clubDetail"
              size="none"
              color="white"
              label="오프라인"
              className="w-20 h-8 px-3 py-1 mr-4 rounded-full typo-body-3-b"
            />
            <div className="typo-body-3-3-r">오프라인 내용</div>
          </div>
          <div className="mb-6 flex items-center">
            <Tag
              kind="clubDetail"
              size="none"
              color="white"
              label="온라인"
              className="w-20 h-8 px-3 py-1 mr-4 rounded-full typo-body-3-b"
            />
            <div className="typo-body-3-3-r">온라인 내용</div>
          </div>
        </div>
      </div>

      {/* 활동 일정 */}
      <div className="mb-20">
        <div className="typo-title-3 mb-4">활동 일정</div>
        <div>
          {/* 임시 데이터 - 나중에 API 데이터로 교체 */}
          {[
            { week: '공통', content: '공통 내용' },
            { week: '1', content: '1주차 내용' },
            { week: '2', content: '2주차 내용' },
            { week: '3', content: '3주차 내용' },
            { week: '4', content: '4주차 내용' },
          ].map((schedule, index) => (
            <div key={index} className="mb-6 flex items-center">
              <Tag
                kind="clubDetail"
                size="none"
                color={schedule.week === '공통' ? 'purple' : 'lightPurple'}
                label={
                  schedule.week === '공통' ? '공통' : `${schedule.week}주차`
                }
                className="w-16 h-8 px-3 py-1 mr-4 rounded-full typo-body-3-b"
              />
              <div className="typo-body-3-3-r">{schedule.content}</div>
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
              <div className="typo-button-m">장소설명</div>
            </div>
            <div className="flex items-center">
              <div className="typo-button-b mr-4">주소</div>
              <div className="typo-button-m">주소설명</div>
            </div>
          </div>
        </div>
      </div>

      {/* 지원 과정 */}
      <div className="mb-36">
        <div className="typo-title-3 mb-4">지원 과정</div>
        {/* 임시 데이터 - 나중에 API 데이터로 교체 */}
        {[
          { round: '1', content: '1차 내용' },
          { round: '2', content: '2차 내용' },
          { round: '3', content: '3차 내용' },
        ].map((process, index) => (
          <div key={index} className="mb-6 flex items-center">
            <Tag
              kind="clubDetail"
              size="none"
              color="white"
              label={`${process.round}차`}
              className="w-16 h-8 px-3 py-1 mr-4 rounded-full typo-body-3-b"
            />
            <div className="typo-body-3-3-r">{process.content}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
