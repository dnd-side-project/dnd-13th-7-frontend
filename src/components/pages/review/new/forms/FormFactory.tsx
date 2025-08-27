'use client'

import React from 'react'
import {
  PaperNormalForm,
  PaperPremiumForm,
  InterviewNormalForm,
  InterviewPremiumForm,
  ActivityNormalForm,
  ActivityPremiumForm,
} from './index'

export type FormKind = 'paper' | 'interview' | 'activity'
export type FormType = 'normal' | 'premium'

interface FormFactoryProps {
  kind: FormKind
  type: FormType
}

export default function FormFactory({ kind, type }: FormFactoryProps) {
  const getFormComponent = () => {
    const formKey = `${kind}-${type}` as const

    switch (formKey) {
      case 'paper-normal':
        return <PaperNormalForm />
      case 'paper-premium':
        return <PaperPremiumForm />
      case 'interview-normal':
        return <InterviewNormalForm />
      case 'interview-premium':
        return <InterviewPremiumForm />
      case 'activity-normal':
        return <ActivityNormalForm />
      case 'activity-premium':
        return <ActivityPremiumForm />
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

  return <>{getFormComponent()}</>
}

// 유틸리티 함수: 유효한 kind/type 조합인지 확인
export const isValidFormCombination = (kind: string, type: string): boolean => {
  const validKinds: FormKind[] = ['paper', 'interview', 'activity']
  const validTypes: FormType[] = ['normal', 'premium']

  return (
    validKinds.includes(kind as FormKind) &&
    validTypes.includes(type as FormType)
  )
}

// 유틸리티 함수: 폼 타입별 설명 문구 반환
export const getFormDescription = (kind: FormKind, type: FormType): string => {
  const descriptions = {
    'paper-normal': '간단하게 서류 전형 경험을 공유해주세요',
    'paper-premium': '상세한 서류 전형 가이드를 작성하고 혜택을 받아보세요',
    'interview-normal': '간단하게 면접 경험을 공유해주세요',
    'interview-premium': '상세한 면접 가이드를 작성하고 혜택을 받아보세요',
    'activity-normal': '간단하게 동아리 활동 경험을 공유해주세요',
    'activity-premium': '상세한 활동 가이드를 작성하고 혜택을 받아보세요',
  }

  return descriptions[`${kind}-${type}` as keyof typeof descriptions] || ''
}
