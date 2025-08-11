'use client'

import { useState } from 'react'
import { MultiDropDown } from '@/components/molecules/multiDropDown/multiDropDown'
import type { Group } from '@/components/molecules/multiDropDown/multiDropDown'

export default function Home() {
  // 직무 선택 상태
  const [selectedJobs, setSelectedJobs] = useState<string[]>(['pmpo'])

  // 기술 스택 선택 상태
  const [selectedTechs, setSelectedTechs] = useState<string[]>([
    'react',
    'typescript',
  ])

  // 지역 선택 상태
  const [selectedRegions, setSelectedRegions] = useState<string[]>([])

  // 직무 그룹
  const jobGroups: Group[] = [
    {
      title: '기획/디자인',
      options: [
        { label: 'PM/PO', value: 'pmpo' },
        { label: '프로덕트 디자이너', value: 'productdesigner' },
      ],
    },
    {
      title: '개발',
      options: [
        { label: '백엔드 개발자', value: 'backend' },
        { label: '프론트엔드 개발자', value: 'frontend' },
        { label: '안드로이드 개발자', value: 'android' },
        { label: 'IOS 개발자', value: 'ios' },
      ],
    },
  ]

  // 기술 스택 그룹
  const techGroups: Group[] = [
    {
      title: '프론트엔드',
      options: [
        { label: 'React', value: 'react' },
        { label: 'Vue.js', value: 'vue' },
        { label: 'Angular', value: 'angular' },
        { label: 'TypeScript', value: 'typescript' },
        { label: 'JavaScript', value: 'javascript' },
      ],
    },
    {
      title: '백엔드',
      options: [
        { label: 'Node.js', value: 'nodejs' },
        { label: 'Python', value: 'python' },
        { label: 'Java', value: 'java' },
        { label: 'Go', value: 'go' },
        { label: 'PHP', value: 'php' },
      ],
    },
    {
      title: '데이터베이스',
      options: [
        { label: 'MySQL', value: 'mysql' },
        { label: 'PostgreSQL', value: 'postgresql' },
        { label: 'MongoDB', value: 'mongodb' },
        { label: 'Redis', value: 'redis' },
      ],
    },
  ]

  // 지역 그룹
  const regionGroups: Group[] = [
    {
      title: '서울',
      options: [
        { label: '강남구', value: 'gangnam' },
        { label: '서초구', value: 'seocho' },
        { label: '마포구', value: 'mapo' },
        { label: '종로구', value: 'jongno' },
      ],
    },
    {
      title: '경기',
      options: [
        { label: '성남시', value: 'seongnam' },
        { label: '수원시', value: 'suwon' },
        { label: '용인시', value: 'yongin' },
        { label: '고양시', value: 'goyang' },
      ],
    },
  ]

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="typo-main-title text-main-color-1">Hello World</h1>
        <h2 className="typo-title-1 text-grey-color-1">Hello World</h2>
        <h3 className="typo-title-2">Hello World</h3>
        <h4 className="typo-title-3">Hello World</h4>
        <p className="typo-body-1-r">Hello World</p>
        <p className="typo-body-1-sb">Hello World</p>
        <p className="typo-body-1-m">Hello World</p>
        <p className="typo-body-2-sb">Hello World</p>

        {/* 직무 선택 */}
        <div className="space-y-2">
          <h3 className="typo-title-3">직무 선택</h3>
          <MultiDropDown
            groups={jobGroups}
            value={selectedJobs}
            onChange={setSelectedJobs}
            placeholder="파트"
            maxSummary={2}
          />
        </div>

        {/* 기술 스택 선택 */}
        <div className="space-y-2">
          <h3 className="typo-title-3">기술 스택 선택</h3>
          <MultiDropDown
            groups={techGroups}
            value={selectedTechs}
            onChange={setSelectedTechs}
            placeholder="기술 스택을 선택하세요"
            maxSummary={3}
          />
        </div>

        {/* 지역 선택 */}
        <div className="space-y-2">
          <h3 className="typo-title-3">지역 선택</h3>
          <MultiDropDown
            groups={regionGroups}
            value={selectedRegions}
            onChange={setSelectedRegions}
            placeholder="지역을 선택하세요"
            maxSummary={1}
          />
        </div>

        {/* 제어되지 않는 예시 */}
        <div className="space-y-2">
          <h3 className="typo-title-3">기본값이 있는 예시</h3>
          <MultiDropDown
            groups={jobGroups}
            defaultValue={['frontend', 'backend']}
            placeholder="기본값이 있는 드롭다운"
          />
        </div>
      </main>
    </div>
  )
}
