'use client'

import React from 'react'
import { Form } from '@/components/molecules/Form'
import { ReviewFormHeader, StepNavigation } from '../../shared'
import PaperStep1 from './PaperStep1'
import PaperStep2 from './PaperStep2'
import { usePaperForm } from './usePaperForm'

export default function PaperForm() {
  const {
    form,
    currentStep,
    goToNextStep,
    goToPreviousStep,
    onSubmit,
    isSubmitting,
  } = usePaperForm()

  const watchedClubId = form.watch('clubId')

  return (
    <div className="bg-white-color rounded-2xl p-8 shadow-sm">
      {/* 제목 */}
      <h2 className="typo-title-1 text-black-color mb-8">서류 후기 작성</h2>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-12"
        >
          {/* 공통 헤더 - 동아리, 기수, 파트 */}
          <ReviewFormHeader
            control={form.control}
            selectedClubId={watchedClubId}
          />

          {/* Step 별 컨텐츠 */}
          {currentStep === 1 ? (
            <PaperStep1 form={form} />
          ) : (
            <PaperStep2 form={form} />
          )}

          {/* 네비게이션 버튼 */}
          <StepNavigation
            currentStep={currentStep}
            onPrevious={goToPreviousStep}
            onNext={goToNextStep}
            isSubmitting={isSubmitting}
          />
        </form>
      </Form>
    </div>
  )
}
