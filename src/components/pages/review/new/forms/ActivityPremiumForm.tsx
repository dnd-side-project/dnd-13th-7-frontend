'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/atoms'
import { Button } from '@/components/atoms/Button'
import { ImageUpload } from '@/components/atoms/ImageUpload'
import { OptionButton } from '@/components/atoms/OptionButton'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/atoms/Select'
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
  useActivityPremiumForm,
  GROWTH_KEYWORD_OPTIONS,
} from './hooks/useActivityPremiumForm'

export default function ActivityPremiumForm() {
  const router = useRouter()
  const { form, onSubmit, isSubmitting, handleImageUpload, isUploading } =
    useActivityPremiumForm()
  const { data: clubsData } = useClubsList({ size: 20 })

  // 성장 키워드 단일 선택 핸들러
  const handleGrowthKeywordChange = (value: string) => {
    form.setValue('growthKeywords', value)
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

            {/* 지원 기수 */}
            <FormField
              control={form.control}
              name="generation"
              render={({ field }) => (
                <FormItem className="flex-1 gap-[6px]">
                  <FormLabel className="typo-button-m text-grey-color-4">
                    지원 기수
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

            {/* 지원 파트 */}
            <FormField
              control={form.control}
              name="jobId"
              render={({ field }) => (
                <FormItem className="flex-1 gap-[6px]">
                  <FormLabel className="typo-button-m text-grey-color-4">
                    지원 파트
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
                        <SelectItem value="1">기획</SelectItem>
                        <SelectItem value="2">디자인</SelectItem>
                        <SelectItem value="3">개발</SelectItem>
                        <SelectItem value="4">마케팅</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* 대표 이미지 */}
          <FormField
            control={form.control}
            name="thumbnailImageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-4 typo-body-1-b text-black-color">
                  대표 이미지
                </FormLabel>
                <FormControl>
                  <ImageUpload
                    onFileChange={handleImageUpload}
                    defaultImageUrl={field.value}
                    disabled={isUploading}
                    height="h-32"
                    error={form.formState.errors.thumbnailImageUrl?.message}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col gap-8">
            {/* 제목 */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-row items-center gap-4 mb-4">
                    <FormLabel className="typo-body-1-b text-black-color">
                      제목
                    </FormLabel>
                    <p className="typo-button-m text-grey-color-3">
                      전반적인 서류 경험의 핵심을 간단하게 표현해주세요
                    </p>
                  </div>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="ex. 포트폴리오보다 이력서를 많이 보는 동아리"
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

            {/* Q1. 동아리 활동을 시작하기 전에 어떤 준비를 했나요? */}
            <FormField
              control={form.control}
              name="preparationBeforeStart"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-4 typo-body-1-b text-black-color">
                    Q1. 동아리 활동을 시작하기 전에 어떤 준비를 했나요?
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="ex. 동아리 홈페이지와 SNS를 통해 이전 프로젝트들을 자세히 찾아봤습니다. 특히 지난 2-3년간 진행했던 캠페인 사례들을 분석하며 어떤 방식으로 기획하고 실행하는지 파악했어요."
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

            {/* Q2. 동료들과 협업하면서 기억에 남거나, 좋았던 경험이 있나요? */}
            <FormField
              control={form.control}
              name="collaborationExperience"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-4 typo-body-1-b text-black-color">
                    Q2. 동료들과 협업하면서 기억에 남거나, 좋았던 경험이 있나요?
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="ex. 프로젝트 진행 방향을 놓고 팀원과 의견 충돌이 있었던 경험이 기억납니다. 저는 안정적인 방법을, 동료는 좀 더 창의적인 접근을 원했는데요.결국 두 방법을 절충한 새로운 아이디어가 나왔고, 그 결과가 예상보다 훨씬 좋았어요. 갈등도 건설적으로 해결하면 더 나은 결과를 만들 수 있다는 걸 배웠습니다."
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

            {/* Q3. 동아리 활동을 하면서 본인에게 생긴 변화가 있다면 무엇인가요? */}
            <FormField
              control={form.control}
              name="personalGrowth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-4 typo-body-1-b text-black-color">
                    Q3. 동아리 활동을 하면서 본인에게 생긴 변화가 있다면
                    무엇인가요?
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="ex.예전에는 회의에서 아이디어가 있어도 '괜찮을까?' 하며 망설였는데, 동아리에서 다양한 프로젝트를 경험하면서 실패해도 괜찮다는 마음가짐을 갖게 됐어요. 또한 다른 사람의 의견을 듣고 조율하는 능력도 많이 향상됐습니다"
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

            {/* 성장 키워드 */}
            <FormField
              control={form.control}
              name="growthKeywords"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-row items-center gap-4 mb-4">
                    <FormLabel className="typo-body-1-b text-black-color">
                      성장 키워드
                    </FormLabel>
                    <div className="typo-button-m text-grey-color-3">
                      지원부터 활동까지의 과정에서 얻은 가장 큰 가치는
                      무엇이었나요?
                    </div>
                  </div>
                  <FormControl>
                    <div className="flex flex-wrap gap-2">
                      {GROWTH_KEYWORD_OPTIONS.map((option) => (
                        <OptionButton
                          key={option.value}
                          selected={field.value === option.value}
                          onClick={() =>
                            handleGrowthKeywordChange(option.value)
                          }
                          size="small"
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

          {/* 제출 버튼 */}
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
