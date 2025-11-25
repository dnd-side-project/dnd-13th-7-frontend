'use client'

import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { Textarea } from '@/components/atoms/Textarea'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/molecules/Form'
import { DynamicQASection } from '@/components/molecules/dynamicQaSection'
import { type PaperFormType } from './usePaperForm'

interface PaperStep2Props {
  form: UseFormReturn<PaperFormType>
}

export default function PaperStep2({ form }: PaperStep2Props) {
  return (
    <div className="flex flex-col gap-12">
      {/* 한줄평 */}
      <FormField
        control={form.control}
        name="oneLineComment"
        render={({ field }) => (
          <FormItem>
            <div className="flex items-center gap-1 mb-4">
              <FormLabel className="typo-body-1-b text-black-color">
                한줄평
              </FormLabel>
              <span className="text-primary-color">*</span>
            </div>
            <FormControl>
              <Textarea
                {...field}
                placeholder="서류 작성 시 느낀 가장 핵심적인 소감이나 느낌을 요약해 주세요."
                className="min-h-[60px]"
                maxLength={20}
              />
            </FormControl>
            <div className="text-right typo-caption-m text-grey-color-3">
              {field.value?.length || 0}/20
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* 서류에서 기억나는 항목과 답변 */}
      <DynamicQASection
        control={form.control}
        name="qaItems"
        title="서류에서 기억나는 항목과 답변"
        questionPlaceholder="기억나는 서류 항목을 작성해주세요."
        answerPlaceholder="항목에 대한 답변으로 어떤 경험이나, 요소를 어필했는지 공유해주세요."
      />

      {/* 다음 지원자들을 위한 서류 TIP */}
      <FormField
        control={form.control}
        name="tip"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="typo-body-1-b text-black-color mb-4">
              다음 지원자들을 위한 서류 TIP
            </FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="서류 작성시 합격을 결정했다고 생각하는 본인만의 전략이나 팁을 공유해 주세요."
                className="min-h-[120px]"
                maxLength={300}
              />
            </FormControl>
            <div className="text-right typo-caption-m text-grey-color-3">
              {field.value?.length || 0}/300
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* 자유 후기 */}
      <FormField
        control={form.control}
        name="freeReview"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="typo-body-1-b text-black-color mb-4">
              자유 후기
            </FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="공고 확인부터 서류 준비까지의 과정이나 서류 과정에서 참고했던 자료, 사이트는 무엇이었는지, 혹은 포트폴리오는 어떤 식으로 정리하고 요약했는지와 같은 정보를 공유해주세요."
                className="min-h-[120px]"
                maxLength={300}
              />
            </FormControl>
            <div className="text-right typo-caption-m text-grey-color-3">
              {field.value?.length || 0}/300
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
