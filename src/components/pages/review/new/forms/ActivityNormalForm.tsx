'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/atoms/Button'
import { OptionButton } from '@/components/atoms/OptionButton'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/atoms/Select'
import { StarRating } from '@/components/atoms/StarRating'
import { Textarea } from '@/components/atoms/Textarea'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/molecules/Form'
import { useClubsList } from '@/features/clubs/queries'
import {
  useActivityNormalForm,
  ACTIVITY_DURATION_OPTIONS,
  SATISFACTION_SYSTEM_OPTIONS,
  RECOMMENDATION_TARGET_OPTIONS,
} from './hooks/useActivityNormalForm'

export default function ActivityNormalForm() {
  const router = useRouter()
  const { form, onSubmit, isSubmitting } = useActivityNormalForm()
  const { data: clubsData } = useClubsList({ size: 20 })

  // 추천 대상 체크박스 상태 관리
  const watchedRecommendationTarget = form.watch('recommendationTarget')

  const handleRecommendationTargetChange = (
    targetId: number,
    checked: boolean,
  ) => {
    const current = watchedRecommendationTarget || []
    if (checked) {
      form.setValue('recommendationTarget', [...current, targetId])
    } else {
      form.setValue(
        'recommendationTarget',
        current.filter((id) => id !== targetId),
      )
    }
  }

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-16"
        >
          {/* 기본 정보 */}
          <div className="flex flex-row gap-4">
            {/* 프로필 아이콘*/}
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-grey-color-1" />
            </div>
            {/* IT 동아리명 */}
            <FormField
              control={form.control}
              name="clubId"
              render={({ field }) => (
                <FormItem className="flex-1 gap-[6px]">
                  <FormLabel className="typo-button-m text-grey-color-4">
                    IT 동아리명
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value?.toString()}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="선택하기" />
                      </SelectTrigger>
                      <SelectContent>
                        {clubsData?.content.map((club) => (
                          <SelectItem
                            key={club.clubId}
                            value={club.clubId.toString()}
                          >
                            {club.clubName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 활동 기수 */}
            <FormField
              control={form.control}
              name="generation"
              render={({ field }) => (
                <FormItem className="flex-1 gap-[6px]">
                  <FormLabel className="typo-button-m text-grey-color-4">
                    활동 기수
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value?.toString()}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="선택하기" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 30 }, (_, i) => i + 1).map(
                          (gen) => (
                            <SelectItem key={gen} value={gen.toString()}>
                              {gen}기
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 활동 파트 */}
            <FormField
              control={form.control}
              name="jobId"
              render={({ field }) => (
                <FormItem className="flex-1 gap-[6px]">
                  <FormLabel className="typo-button-m text-grey-color-4">
                    활동 파트
                  </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value?.toString()}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="선택하기" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">PM/PO</SelectItem>
                        <SelectItem value="2">프로덕트 디자이너</SelectItem>
                        <SelectItem value="3">프론트엔드 개발자</SelectItem>
                        <SelectItem value="4">백엔드 개발자</SelectItem>
                        <SelectItem value="5">iOS 개발자</SelectItem>
                        <SelectItem value="6">안드로이드 개발자</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* 지원 총평 */}
          <FormField
            control={form.control}
            name="rate"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row items-center gap-2 mb-4">
                  <FormLabel className="typo-body-1-b text-black-color">
                    지원 총평
                  </FormLabel>
                  <p className="typo-button-m text-grey-color-3">
                    활동 경험의 만족도는 몇 점인가요?
                  </p>
                </div>
                <FormControl className="flex justify-center w-full">
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

          {/* 간단 Q&A */}
          <div className="space-y-6">
            <div className="flex flex-row items-center gap-2 mb-6">
              <h3 className="typo-body-1-b text-black-color">간단 Q&A</h3>
              <p className="typo-button-m text-grey-color-3">
                활동 경험에 맞춰 자신에게 해당하는 선택지를 골라주세요
              </p>
            </div>

            <div className="flex flex-col gap-12">
              {/* Q1 */}
              <FormField
                control={form.control}
                name="activityDuration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-4 typo-body-3-b text-black-color">
                      Q1. 하루 평균 활동 시간은 얼마나 되었나요?
                    </FormLabel>
                    <FormControl>
                      <div className="flex gap-6">
                        {ACTIVITY_DURATION_OPTIONS.map((option) => (
                          <OptionButton
                            key={option.id}
                            selected={field.value === option.id}
                            onClick={() => field.onChange(option.id)}
                            className="flex-1"
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
                name="satisfactionSystem"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="mb-4 typo-body-3-b text-black-color">
                      Q2. 동아리 시스템 중 가장 만족스러웠던 부분은 무엇인가요?
                    </FormLabel>
                    <FormControl>
                      <div className="flex gap-6">
                        {SATISFACTION_SYSTEM_OPTIONS.map((option) => (
                          <OptionButton
                            key={option.id}
                            selected={field.value === option.id}
                            onClick={() => field.onChange(option.id)}
                            className="flex-1"
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
                <FormLabel className="mb-4 typo-body-3-b text-black-color">
                  Q3. 이 동아리를 어떤 목적을 가진 사람에게 추천하면 좋을까요?{' '}
                  <span className="typo-caption-m text-grey-color-3">
                    (중복선택)
                  </span>
                </FormLabel>
                <div className="flex gap-6">
                  {RECOMMENDATION_TARGET_OPTIONS.map((option) => (
                    <OptionButton
                      key={option.id}
                      selected={
                        watchedRecommendationTarget?.includes(option.id) ||
                        false
                      }
                      onClick={() =>
                        handleRecommendationTargetChange(
                          option.id,
                          !watchedRecommendationTarget?.includes(option.id),
                        )
                      }
                      className="flex-1"
                    >
                      {option.label}
                    </OptionButton>
                  ))}
                </div>
                {form.formState.errors.recommendationTarget && (
                  <p className="mt-1 text-failure-color typo-caption-m">
                    {form.formState.errors.recommendationTarget.message}
                  </p>
                )}
              </FormItem>
            </div>
          </div>

          {/* 한줄 요약 후기 */}
          <FormField
            control={form.control}
            name="oneLineComment"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row items-center gap-2 mb-4">
                  <FormLabel className="typo-body-1-b text-black-color">
                    한줄 요약 후기
                  </FormLabel>
                  <p className="typo-button-m text-grey-color-3">
                    전반적인 서류 경험의 핵심을 간단하게 표현해주세요
                  </p>
                </div>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="ex. 포트폴리오 프로젝트를 잘 기억하면 좋은 결과로 남을 면접"
                    className="min-h-[60px]"
                    maxLength={60}
                  />
                </FormControl>
                <div className="text-right typo-caption-m text-grey-color-3">
                  {field.value?.length || 0}/60
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 가장 인상깊었던 포인트 */}
          <FormField
            control={form.control}
            name="impressivePoint"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="typo-body-1-b text-black-color">
                  가장 인상깊었던 포인트
                </FormLabel>
                <div className="mb-4 typo-body-2-r text-grey-color-4">
                  활동 중 기억에 남거나, 공유하고 싶은 순간을 자세히 적어주세요
                </div>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="ex. 다른 직군과 함께하는 프로젝트에 관한 질문이 오래 진행되어서 협업에 대해 어필했었던 기억이 있습니다."
                    className="min-h-[176px]"
                    maxLength={1200}
                  />
                </FormControl>
                <div className="text-right typo-caption-m text-grey-color-3">
                  {field.value?.length || 0}/1200
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 제출 버튼 - 결과 상태 제외 */}
          <div className="flex justify-between gap-4 pt-6">
            <Button
              type="button"
              variant="outlined-secondary"
              size="large"
              className="flex-1"
              onClick={() => router.back()}
            >
              취소
            </Button>
            <Button
              type="submit"
              size="large"
              className="flex-1"
              disabled={isSubmitting}
            >
              완료
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
