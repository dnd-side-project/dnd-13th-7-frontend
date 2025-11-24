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
  type ActivityFormType,
  ACTIVITY_STATUS_OPTIONS,
  Q1_WEEKLY_HOURS_OPTIONS,
  Q2_DIFFICULTY_OPTIONS,
  Q3_SATISFACTION_OPTIONS,
} from './useActivityForm'

interface ActivityStep1Props {
  form: UseFormReturn<ActivityFormType>
}

export default function ActivityStep1({ form }: ActivityStep1Props) {
  const watchedQ3 = form.watch('q3Satisfaction') || []

  const handleQ3Change = (optionId: number) => {
    const current = watchedQ3
    if (current.includes(optionId)) {
      form.setValue(
        'q3Satisfaction',
        current.filter((id) => id !== optionId),
      )
    } else if (current.length < 4) {
      form.setValue('q3Satisfaction', [...current, optionId])
    }
  }

  return (
    <div className="flex flex-col gap-12">
      {/* 활동 여부 */}
      <FormField
        control={form.control}
        name="activityStatus"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="typo-body-1-b text-black-color mb-4">
              활동 여부
            </FormLabel>
            <FormControl>
              <div className="flex flex-col desktop:flex-row gap-3 desktop:flex-wrap">
                {ACTIVITY_STATUS_OPTIONS.map((option) => (
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

      {/* 활동 총평 */}
      <FormField
        control={form.control}
        name="rate"
        render={({ field }) => (
          <FormItem>
            <div className="flex flex-row gap-2 items-center mb-4">
              <FormLabel className="typo-body-1-b text-black-color">
                활동 총평
              </FormLabel>
              <p className="typo-button-m text-grey-color-3">
                전반적인 활동 난이도는 어떻게 느꼈는지 알려주세요
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

      {/* 활동 경험 */}
      <div className="space-y-8">
        <h3 className="typo-body-1-b text-black-color">활동 경험</h3>

        {/* Q1 */}
        <FormField
          control={form.control}
          name="q1WeeklyHours"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="typo-body-2-sb text-black-color mb-4">
                Q1. 활동 목표를 달성하기 위해 실제로 투입해야했던 주간 평균
                시간은 어느정도였나요?
              </FormLabel>
              <FormControl>
                <div className="flex flex-col desktop:flex-row gap-3 desktop:flex-wrap">
                  {Q1_WEEKLY_HOURS_OPTIONS.map((option) => (
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

        {/* Q2 */}
        <FormField
          control={form.control}
          name="q2Difficulty"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="typo-body-2-sb text-black-color mb-4">
                Q2. 활동 난이도의 수준은 어느정도였나요?
              </FormLabel>
              <FormControl>
                <div className="flex flex-col desktop:flex-row gap-3 desktop:flex-wrap">
                  {Q2_DIFFICULTY_OPTIONS.map((option) => (
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
        <FormItem>
          <FormLabel className="typo-body-2-sb text-black-color mb-4">
            Q3. 참여하신 활동 중 가장 큰 만족감을 느꼈던 부분은 무엇이었나요?
            <span className="typo-caption-m text-grey-color-3 ml-2">
              (최대 4개)
            </span>
          </FormLabel>
          <div className="flex flex-col desktop:flex-row gap-3 desktop:flex-wrap">
            {Q3_SATISFACTION_OPTIONS.map((option) => (
              <OptionButton
                key={option.id}
                selected={watchedQ3.includes(option.id)}
                onClick={() => handleQ3Change(option.id)}
                className="w-full desktop:w-auto"
              >
                {option.label}
              </OptionButton>
            ))}
          </div>
          {form.formState.errors.q3Satisfaction && (
            <p className="text-failure-color typo-caption-m mt-1">
              {form.formState.errors.q3Satisfaction.message}
            </p>
          )}
        </FormItem>
      </div>
    </div>
  )
}
