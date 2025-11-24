'use client'

import React from 'react'
import ActivityForm from './activity'
import InterviewForm from './interview'
import PaperForm from './paper'

export type FormKind = 'paper' | 'interview' | 'activity'

interface FormFactoryProps {
  kind: FormKind
}

export default function FormFactory({ kind }: FormFactoryProps) {
  switch (kind) {
    case 'paper':
      return <PaperForm />
    case 'interview':
      return <InterviewForm />
    case 'activity':
      return <ActivityForm />
    default:
      return (
        <div className="text-center p-8">
          <p className="typo-body-2-r text-grey-color-4">
            지원하지 않는 폼 타입입니다.
          </p>
        </div>
      )
  }
}

// 유틸리티 함수: 유효한 kind인지 확인
export const isValidFormKind = (kind: string): kind is FormKind => {
  const validKinds: FormKind[] = ['paper', 'interview', 'activity']
  return validKinds.includes(kind as FormKind)
}

// 유틸리티 함수: kind별 설명 문구 반환
export const getFormDescription = (kind: FormKind): string => {
  const descriptions = {
    paper: '서류 전형 경험을 공유해주세요',
    interview: '면접 전형 경험을 공유해주세요',
    activity: '동아리 활동 경험을 공유해주세요',
  }

  return descriptions[kind] || ''
}

// 유틸리티 함수: kind별 제목 반환
export const getFormTitle = (kind: FormKind): string => {
  const titles = {
    paper: '서류 후기 작성',
    interview: '면접 후기 작성',
    activity: '활동 후기 작성',
  }

  return titles[kind] || '후기 작성'
}
