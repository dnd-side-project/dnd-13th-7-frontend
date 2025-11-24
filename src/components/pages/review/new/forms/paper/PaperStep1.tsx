'use client'

import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import { OptionButton } from '@/components/atoms/OptionButton'
import { StarRating } from '@/components/atoms/StarRating'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/molecules/Form'
import {
  type PaperFormType,
  PAPER_RESULT_OPTIONS,
  Q1_IMPORTANT_APPEAL_OPTIONS,
  Q2_REFERENCE_INFO_OPTIONS,
  Q3_TECH_DESCRIPTION_OPTIONS,
} from './usePaperForm'

interface PaperStep1Props {
  form: UseFormReturn<PaperFormType>
}

export default function PaperStep1({ form }: PaperStep1Props) {
  const watchedQ1 = form.watch('q1ImportantAppeal') || []

  const handleQ1Change = (optionId: number) => {
    const current = watchedQ1
    if (current.includes(optionId)) {
      form.setValue(
        'q1ImportantAppeal',
        current.filter((id) => id !== optionId),
      )
    } else if (current.length < 4) {
      form.setValue('q1ImportantAppeal', [...current, optionId])
    }
  }

  return (
    <div className="flex flex-col gap-12">
      {/* 서류 결과 */}
      <FormField
        control={form.control}
        name="resultType"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="typo-body-1-b text-black-color mb-4">
              서류 결과
            </FormLabel>
            <FormControl>
              <div className="flex flex-col desktop:flex-row gap-3 desktop:flex-wrap">
                {PAPER_RESULT_OPTIONS.map((option) => (
                  <OptionButton
                    key={option.id}
                    selected={field.value === option.id}
                    onClick={() => field.onChange(option.id)}
                    className="w-full desktop:w-auto"
                  >
                    {option.label}
                  </OptionButton>
                ))}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* 서류 총평 */}
      <FormField
        control={form.control}
        name="rate"
        render={({ field }) => (
          <FormItem>
            <div className="flex flex-row gap-2 items-center mb-4">
              <FormLabel className="typo-body-1-b text-black-color">
                서류 총평
              </FormLabel>
              <p className="typo-button-m text-grey-color-3">
                전반적인 서류 작성 난이도는 어떻게 느꼈는지 알려주세요
              </p>
            </div>
            <FormControl>
              <StarRating
                value={field.value || 0}
                onChange={field.onChange}
                maxStars={5}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* 서류 경험 */}
      <div className="space-y-8">
        <h3 className="typo-body-1-b text-black-color">서류 경험</h3>

        {/* Q1 */}
        <FormItem>
          <FormLabel className="typo-body-2-sb text-black-color mb-4">
            Q1. 지원서 작성에 있어 가장 중요하게 어필한 것은 무엇이었나요?
            <span className="typo-caption-m text-grey-color-3 ml-2">
              (최대 4개)
            </span>
          </FormLabel>
          <div className="flex flex-col desktop:flex-row gap-3 desktop:flex-wrap">
            {Q1_IMPORTANT_APPEAL_OPTIONS.map((option) => (
              <OptionButton
                key={option.id}
                selected={watchedQ1.includes(option.id)}
                onClick={() => handleQ1Change(option.id)}
                className="w-full desktop:w-auto"
              >
                {option.label}
              </OptionButton>
            ))}
          </div>
          {form.formState.errors.q1ImportantAppeal && (
            <p className="text-failure-color typo-caption-m mt-1">
              {form.formState.errors.q1ImportantAppeal.message}
            </p>
          )}
        </FormItem>

        {/* Q2 */}
        <FormField
          control={form.control}
          name="q2ReferenceInfo"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="typo-body-2-sb text-black-color mb-4">
                Q2. 지원서 작성 시 가장 참고한 정보는 무엇이었나요?
              </FormLabel>
              <FormControl>
                <div className="flex flex-col desktop:flex-row gap-3 desktop:flex-wrap">
                  {Q2_REFERENCE_INFO_OPTIONS.map((option) => (
                    <OptionButton
                      key={option.id}
                      selected={field.value === option.id}
                      onClick={() => field.onChange(option.id)}
                      className="w-full desktop:w-auto"
                    >
                      {option.label}
                    </OptionButton>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Q3 */}
        <FormField
          control={form.control}
          name="q3TechDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="typo-body-2-sb text-black-color mb-4">
                Q3. 지원서 혹은 포트폴리오 제작 시 기술 역량에 대한 서술은 어떤
                방식으로 작성하셨나요?
              </FormLabel>
              <FormControl>
                <div className="flex flex-col desktop:flex-row gap-3 desktop:flex-wrap">
                  {Q3_TECH_DESCRIPTION_OPTIONS.map((option) => (
                    <OptionButton
                      key={option.id}
                      selected={field.value === option.id}
                      onClick={() => field.onChange(option.id)}
                      className="w-full desktop:w-auto"
                    >
                      {option.label}
                    </OptionButton>
                  ))}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}
