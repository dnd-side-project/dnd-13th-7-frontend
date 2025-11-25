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
import { type ActivityFormType } from './useActivityForm'

interface ActivityStep2Props {
  form: UseFormReturn<ActivityFormType>
}

export default function ActivityStep2({ form }: ActivityStep2Props) {
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
                placeholder="활동을 하며 느낀 가장 핵심적인 소감이나 느낌을 요약해 주세요."
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

      {/* 활동 중 기억나는 경험 */}
      <DynamicQASection
        control={form.control}
        name="qaItems"
        title="활동 중 기억나는 경험"
        questionPlaceholder="기억나는 활동 세션, 이벤트 등을 작성해주세요."
        answerPlaceholder="활동에 대한 설명과, 과정 중에 배운 것, 느낀것을 공유 해주세요."
      />

      {/* 다음 지원자들을 위한 활동 TIP */}
      <FormField
        control={form.control}
        name="tip"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="typo-body-1-b text-black-color mb-4">
              다음 지원자들을 위한 활동 TIP
            </FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="동아리 활동을 더욱 알차게 만드는, 다음 기수 지원자들의 준비에 참고가 될 수 있는 조언들을 작성해주세요."
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
                placeholder="활동 소감, 배우고 느낀 점, 솔직한 소감, 개선 희망 사항 등을 자유롭게 적어주세요."
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
