'use client'

import * as React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { SideBar, type SideOption } from '@/components/atoms/sideBar/Sidebar'
import { Card } from '@/components/molecules/card'
import {
  MultiDropDown,
  type Group,
} from '@/components/molecules/multiDropDown/MultiDropDown'
import { Tab, type TabOption } from '@/components/molecules/tab/Tab'
import { useClubsList } from '@/features/clubs/queries'
import useQueryState from '@/shared/hooks/useQueryState'

const CATEGORY_OPTIONS: SideOption[] = [
  { label: '전체', value: 'all' },
  { label: '기획', value: '기획' },
  { label: '디자인', value: '디자인' },
  { label: '개발', value: '개발' },
]

const SORT_OPTIONS: TabOption[] = [
  { label: '모집중', value: 'recruit' },
  { label: '이름순', value: 'name' },
  { label: '인기순', value: 'popular' },
]

const PART_OPTIONS: Group[] = [
  {
    title: '전체',
    options: [{ label: '전체', value: 'all' }],
  },
  {
    title: '기획',
    options: [{ label: 'PM/PO', value: 'pmpo' }],
  },
  {
    title: '디자인',
    options: [{ label: '프로덕트 디자이너', value: 'designer' }],
  },
  {
    title: '개발',
    options: [
      { label: '백엔드 개발자', value: 'backend' },
      { label: '프론트엔드 개발자', value: 'frontend' },
      { label: '안드로이드 개발자', value: 'android' },
      { label: 'iOS 개발자', value: 'ios' },
    ],
  },
]

const WAY_OPTIONS: Group[] = [
  {
    title: '활동 방식',
    options: [
      { label: '전체', value: 'all' },
      { label: '온라인', value: 'online' },
      { label: '오프라인', value: 'offline' },
    ],
  },
]

const TARGET_OPTIONS: Group[] = [
  {
    title: '모집 대상',
    options: [
      { label: '전체', value: 'all' },
      { label: '대학생', value: 'student' },
      { label: '직장인', value: 'worker' },
    ],
  },
]

export function Explore() {
  const router = useRouter()
  const [field, setField] = useQueryState('field')
  const [sort, setSort] = useQueryState('sort')
  const [part, setPart] = useQueryState('part')
  const [way, setWay] = useQueryState('way')
  const [target, setTarget] = useQueryState('target')

  const currentField = React.useMemo(() => field || 'all', [field])
  const currentSort = React.useMemo(() => sort || 'popular', [sort])

  const partArray = React.useMemo(
    () => (part ? part.split(',').filter(Boolean) : []),
    [part],
  )
  const wayArray = React.useMemo(
    () => (way ? way.split(',').filter(Boolean) : []),
    [way],
  )
  const targetArray = React.useMemo(
    () => (target ? target.split(',').filter(Boolean) : []),
    [target],
  )

  const handlePartChange = React.useCallback(
    (values: string[]) => {
      setPart(values.length > 0 ? values.join(',') : null)
    },
    [setPart],
  )

  const handleWayChange = React.useCallback(
    (values: string[]) => {
      setWay(values.length > 0 ? values.join(',') : null)
    },
    [setWay],
  )

  const handleTargetChange = React.useCallback(
    (values: string[]) => {
      setTarget(values.length > 0 ? values.join(',') : null)
    },
    [setTarget],
  )

  const resetFilters = React.useCallback(() => {
    router.push('/club/explore')
  }, [router])

  const {
    data: clubsData,
    isLoading: loading,
    error: queryError,
  } = useClubsList({
    page: 0,
    size: 10,
    field: currentField !== 'all' ? currentField : undefined,
    part: partArray.length > 0 ? partArray.join(',') : undefined,
    way: wayArray.length > 0 ? wayArray.join(',') : undefined,
    target: targetArray.length > 0 ? targetArray.join(',') : undefined,
    sort: currentSort,
  })

  const clubs = clubsData?.content || []
  const error = queryError ? '동아리를 불러오는데 실패했습니다.' : null

  const fieldLabel = currentField === 'all' ? '전체' : currentField

  return (
    <div className="min-h-screen bg-[var(--moyeoit-light-1)]">
      {/* 히어로 섹션 */}
      <div className="bg-[#5846CB] text-white h-[200px] lg:h-100 flex items-end justify-center px-5 py-18 -mt-20">
        <div className="max-w-7xl w-full relative z-10">
          <h1 className="text-[22px] lg:text-4xl font-bold text-left uppercase">
            {fieldLabel}
          </h1>
        </div>
      </div>

      {/* 메인 컨텐츠  */}
      <div className="max-w-[1440px] w-full mx-auto flex justify-center py-14">
        {/* 사이드바 */}
        <div className="hidden lg:block w-54 flex-shrink-0 px-5 py-16">
          <SideBar
            options={CATEGORY_OPTIONS}
            value={currentField}
            onChange={(value) => setField(value === 'all' ? null : value)}
            className="w-full h-full"
          />
        </div>

        <div className="flex-1">
          {/* 컨테이너 */}
          <div className="max-w-[920px] px-5">
            {/* 필터 섹션 */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
              <div className="flex flex-wrap items-center gap-2">
                <MultiDropDown
                  groups={PART_OPTIONS}
                  value={partArray}
                  onChange={handlePartChange}
                  placeholder="파트"
                  maxSummary={1}
                  className="w-auto"
                />
                <MultiDropDown
                  groups={WAY_OPTIONS}
                  value={wayArray}
                  onChange={handleWayChange}
                  placeholder="방식"
                  maxSummary={1}
                  className="w-auto"
                />
                <MultiDropDown
                  groups={TARGET_OPTIONS}
                  value={targetArray}
                  onChange={handleTargetChange}
                  placeholder="모집 대상"
                  maxSummary={1}
                  className="w-auto"
                />
                <button
                  onClick={() => resetFilters()}
                  className="flex items-center gap-1 px-3 py-2  text-grey-color-2 typo-button-m h-[32px]"
                >
                  <Image
                    src="/icons/reset.svg"
                    alt="reset"
                    width={20}
                    height={20}
                  />
                  초기화
                </button>
              </div>

              <div className="flex">
                <Tab
                  options={SORT_OPTIONS}
                  value={currentSort as 'recruit' | 'name' | 'popular'}
                  onChange={(value) => setSort(value)}
                />
              </div>
            </div>

            {/* 동아리 목록 섹션 */}
            <div className="pt-12">
              {loading && (
                <div className="text-center py-20">
                  <div className="w-8 h-8 border-4 border-[var(--moyeoit-main-1)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-[var(--moyeoit-grey-2)]">
                    동아리를 불러오는 중...
                  </p>
                </div>
              )}

              {error && (
                <div className="text-center py-20">
                  <div className="w-16 h-16 bg-[var(--moyeoit-light-2)] rounded-full flex items-center justify-center mx-auto mb-4"></div>
                  <h3 className="text-lg font-semibold mb-2">
                    오류가 발생했습니다
                  </h3>
                  <p className="text-[var(--moyeoit-grey-2)]">{error}</p>
                </div>
              )}

              {!loading && !error && (
                <div className="grid grid-cols-2 sm:grid-cols-3 pt-0 pb-12 gap-4 sm:gap-8">
                  {/* 동아리 카드 그리드 */}
                  {clubs.map((club) => (
                    <React.Fragment key={club.clubId}>
                      <div className="sm:hidden">
                        <Card
                          size="col4Phone"
                          orientation="vertical"
                          border={true}
                          gap="12px"
                          className="group cursor-pointer relative"
                          onClick={() => router.push(`/club/${club.clubId}`)}
                        >
                          <Card.Image
                            coverSrc={club.logoUrl || '/images/default.svg'}
                            alt={club.clubName}
                            interactive
                            className="transition-transform duration-300 ease-out"
                          />
                          <Card.Content className="px-[6px]">
                            <Card.Title className="">
                              {club.clubName}
                            </Card.Title>
                            <Card.Description>
                              {club.description}
                            </Card.Description>
                            <Card.Meta part={club.categories.join(' · ')} />
                          </Card.Content>
                          {club.isRecruiting && (
                            <div className="w-[61px] h-[29px] absolute top-[16px] left-[16px] bg-white text-grey-color-5 typo-caption-sb px-3 py-1.5 rounded-[73px] border border-light-color-3 z-10 flex items-center justify-center">
                              모집중
                            </div>
                          )}
                        </Card>
                      </div>

                      {/* 카드 목록 */}
                      <div className="hidden sm:block">
                        <Card
                          size="col3Desktop"
                          orientation="vertical"
                          border={true}
                          gap="12px"
                          className="group cursor-pointer relative"
                          onClick={() => router.push(`/club/${club.clubId}`)}
                        >
                          <Card.Image
                            coverSrc={club.logoUrl || '/images/default.svg'}
                            alt={club.clubName}
                            interactive
                            className="transition-transform duration-300 ease-out"
                          />
                          <Card.Content className="px-[6px]">
                            <Card.Title className="">
                              {club.clubName}
                            </Card.Title>
                            <Card.Description>
                              {club.description}
                            </Card.Description>
                            <Card.Meta part={club.categories.join(' · ')} />
                          </Card.Content>
                          {club.isRecruiting && (
                            <div className="w-[61px] h-[29px] absolute top-[16px] left-[16px] bg-white text-grey-color-5 typo-caption-sb px-3 py-1.5 rounded-[73px] border border-light-color-3 z-10 flex items-center justify-center">
                              모집중
                            </div>
                          )}
                        </Card>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              )}

              {/* 빈 상태 표시 */}
              {!loading && !error && clubs.length === 0 && (
                <div className="text-center py-20">
                  <div className="w-16 h-16 bg-[var(--moyeoit-light-2)] rounded-full flex items-center justify-center mx-auto mb-4"></div>
                  <h3 className="text-lg font-semibold mb-2">
                    {currentField === 'all'
                      ? '동아리를 찾을 수 없습니다'
                      : `${fieldLabel} 카테고리의 동아리가 없습니다`}
                  </h3>
                  <p className="text-[var(--moyeoit-grey-2)]">
                    {currentField === 'all'
                      ? '다른 필터를 시도해보세요.'
                      : '다른 카테고리를 선택해보세요.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
