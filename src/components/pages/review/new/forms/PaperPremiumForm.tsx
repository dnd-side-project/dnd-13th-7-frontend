'use client'

import React from 'react'
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
import { ResultType } from '@/features/review/types'
import { usePaperPremiumForm } from './hooks/usePaperPremiumForm'

export default function PaperPremiumForm() {
  const { form, onSubmit, isSubmitting } = usePaperPremiumForm()
  const { data: clubsData } = useClubsList()

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
              <div className="w-16 h-16 bg-grey-color-1 rounded-full flex-shrink-0" />
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
            name="thumbnailImage"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="typo-body-1-b text-black-color mb-4">
                  대표 이미지
                </FormLabel>
                <FormControl>
                  <ImageUpload
                    onFileChange={field.onChange}
                    height="h-32"
                    error={form.formState.errors.thumbnailImage?.message}
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
                  <div className="flex flex-row gap-4 items-center mb-4">
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

            {/* Q1. 서류를 작성할 때 가장 어려웠던 부분은 무엇이었나요? */}
            <FormField
              control={form.control}
              name="difficultPart"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="typo-body-1-b text-black-color mb-4">
                    Q1. 서류를 작성할 때 가장 어려웠던 부분은 무엇이었나요?
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="ex. 제한된 분량 안에서 저의 다양한 경험 중 어떤 것을 선택할지 결정하는 것이 가장 어려웠습니다. 특히 지원 직무와 연관성을 고려하면서도 차별화된 스토리를 만들어내는 과정에서 많은 고민이 있었어요"
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

            {/* Q2. 본인의 경험이나 역량을 어떤 방식으로 표현했나요? */}
            <FormField
              control={form.control}
              name="expressionMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="typo-body-1-b text-black-color mb-4">
                    Q2. 본인의 경험이나 역량을 어떤 방식으로 표현했나요?
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="ex. 순한 나열보다는 구체적인 수치와 성과 중심으로 표현했습니다. '팀워크가 좋다'라고 쓰는 대신 '15명 팀 프로젝트에서 소통 담당자 역할을 맡아 주 2회 정기 회의를 진행하며 프로젝트를 성공적으로 완수했다'는 식으로 작성했어요"
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

            {/* Q3. 서류 제출 전에 가장 신경 쓴 부분은 무엇이었나요? */}
            <FormField
              control={form.control}
              name="finalCheck"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="typo-body-1-b text-black-color mb-4">
                    Q3. 서류 제출 전에 가장 신경 쓴 부분은 무엇이었나요?
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="ex.오타나 맞춤법 검토는 기본이고, 문장이 자연스럽게 읽히는지 소리 내어 확인했습니다. 또한 선배나 친구들에게 객관적인 시각에서 피드백을 받아서 2-3차례 수정 과정을 거쳤어요."
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
          </div>

          {/* 결과 상태 */}
          <FormField
            control={form.control}
            name="resultType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="typo-body-1-b text-black-color mb-4">
                  결과 상태
                </FormLabel>
                <FormControl>
                  <div className="flex gap-2">
                    <OptionButton
                      selected={field.value === ResultType.Pass}
                      onClick={() => field.onChange(ResultType.Pass)}
                      size="small"
                    >
                      합격
                    </OptionButton>
                    <OptionButton
                      selected={field.value === ResultType.Fail}
                      onClick={() => field.onChange(ResultType.Fail)}
                      size="small"
                    >
                      불합격
                    </OptionButton>
                    <OptionButton
                      selected={field.value === ResultType.Ready}
                      onClick={() => field.onChange(ResultType.Ready)}
                      size="small"
                    >
                      결과 대기중
                    </OptionButton>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 제출 버튼 */}
          <div className="flex justify-between gap-4 pt-6">
            <Button
              type="button"
              variant="outlined-secondary"
              size="large"
              className="flex-1"
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
