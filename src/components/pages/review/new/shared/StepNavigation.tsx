'use client'

import React from 'react'
import { Button } from '@/components/atoms/Button'

interface StepNavigationProps {
  currentStep: 1 | 2
  onPrevious: () => void
  onNext: () => void
  isSubmitting?: boolean
  isNextDisabled?: boolean
}

export default function StepNavigation({
  currentStep,
  onPrevious,
  onNext,
  isSubmitting = false,
  isNextDisabled = false,
}: StepNavigationProps) {
  return (
    <div className="flex flex-col-reverse desktop:flex-row justify-between gap-4 pt-6">
      <Button
        type="button"
        variant="outlined-secondary"
        size="large"
        className="flex-1"
        onClick={onPrevious}
        disabled={isSubmitting}
      >
        {currentStep === 1 ? '취소' : '이전으로'}
      </Button>
      <Button
        type={currentStep === 2 ? 'submit' : 'button'}
        size="large"
        className="flex-1"
        onClick={currentStep === 1 ? onNext : undefined}
        disabled={isSubmitting || isNextDisabled}
      >
        {currentStep === 2 ? '완료' : '다음'}
      </Button>
    </div>
  )
}
