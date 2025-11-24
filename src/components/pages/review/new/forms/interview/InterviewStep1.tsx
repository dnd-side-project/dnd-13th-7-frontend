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
  type InterviewFormType,
  INTERVIEW_RESULT_OPTIONS,
  Q1_QUESTION_TYPE_OPTIONS,
  Q2_INTERVIEWER_ATTITUDE_OPTIONS,
  Q3_MAIN_TOPIC_OPTIONS,
  Q4_EMPHASIZED_SKILL_OPTIONS,
} from './useInterviewForm'

interface InterviewStep1Props {
  form: UseFormReturn<InterviewFormType>
}

export default function InterviewStep1({ form }: InterviewStep1Props) {
  const watchedQ1 = form.watch('q1QuestionType') || []

  const handleQ1Change = (optionId: number) => {
    const current = watchedQ1
    if (current.includes(optionId)) {
      form.setValue(
        'q1QuestionType',
        current.filter((id) => id !== optionId),
      )
    } else {
      form.setValue('q1QuestionType', [...current, optionId])
    }
  }

  return (
    <div className="flex flex-col gap-12">
      {/* 면접 결과 */}
      <FormField
        control={form.control}
        name="resultType"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="typo-body-1-b text-black-color mb-4">
              면접 결과
            </FormLabel>
            <FormControl>
              <div className="flex flex-col desktop:flex-row gap-3 desktop:flex-wrap">
                {INTERVIEW_RESULT_OPTIONS.map((option) => (
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

      {/* 면접 총평 */}
      <FormField
        control={form.control}
        name="rate"
        render={({ field }) => (
          <FormItem>
            <div className="flex flex-row gap-2 items-center mb-4">
              <FormLabel className="typo-body-1-b text-black-color">
                면접 총평
              </FormLabel>
              <p className="typo-button-m text-grey-color-3">
                전반적인 면접 난이도는 어떻게 느꼈는지 알려주세요
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

      {/* 면접 경험 */}
      <div className="space-y-8">
        <h3 className="typo-body-1-b text-black-color">면접 경험</h3>

        {/* Q1 */}
        <FormItem>
          <FormLabel className="typo-body-2-sb text-black-color mb-4">
            Q1. 면접에서 어떤 유형의 질문을 받으셨나요?
            <span className="typo-caption-m text-grey-color-3 ml-2">
              (복수 선택)
            </span>
          </FormLabel>
          <div className="flex flex-col desktop:flex-row gap-3 desktop:flex-wrap">
            {Q1_QUESTION_TYPE_OPTIONS.map((option) => (
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
          {form.formState.errors.q1QuestionType && (
            <p className="text-failure-color typo-caption-m mt-1">
              {form.formState.errors.q1QuestionType.message}
            </p>
          )}
        </FormItem>

        {/* Q2 */}
        <FormField
          control={form.control}
          name="q2InterviewerAttitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="typo-body-2-sb text-black-color mb-4">
                Q2. 면접관들의 가장 일반적인 태도는 어떻게 보였나요?
              </FormLabel>
              <FormControl>
                <div className="flex flex-col desktop:flex-row gap-3 desktop:flex-wrap">
                  {Q2_INTERVIEWER_ATTITUDE_OPTIONS.map((option) => (
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
          name="q3MainTopic"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="typo-body-2-sb text-black-color mb-4">
                Q3. 면접에서 가장 큰 시간 비중을 차지한, 논의 주제는
                무엇이었나요?
              </FormLabel>
              <FormControl>
                <div className="flex flex-col desktop:flex-row gap-3 desktop:flex-wrap">
                  {Q3_MAIN_TOPIC_OPTIONS.map((option) => (
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

        {/* Q4 */}
        <FormField
          control={form.control}
          name="q4EmphasizedSkill"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="typo-body-2-sb text-black-color mb-4">
                Q4. 면접시 중점적으로 어필한 역량은 무엇이었나요?
              </FormLabel>
              <FormControl>
                <div className="flex flex-col desktop:flex-row gap-3 desktop:flex-wrap">
                  {Q4_EMPHASIZED_SKILL_OPTIONS.map((option) => (
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
