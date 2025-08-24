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
import { useInterviewPremiumForm } from './hooks/useInterviewPremiumForm'

export default function InterviewPremiumForm() {
  const { form, onSubmit, isSubmitting } = useInterviewPremiumForm()
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
                      전반적인 인터뷰/면접 경험의 핵심을 간단하게 표현해주세요
                    </p>
                  </div>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="ex. 완벽한 답변보다 솔직하고 구체적인 경험담이 더 효과적"
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

            {/* Q1. 인터뷰/면접장 분위기와 면접관들은 어땠나요? */}
            <FormField
              control={form.control}
              name="atmosphereAndInterviewers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="typo-body-1-b text-black-color mb-4">
                    Q1. 인터뷰/면접장 분위기와 면접관들은 어땠나요?
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="ex. 생각보다 화기애애한 분위기였습니다. 면접관 두 분 모두 따뜻한 미소로 맞아주셨고, 긴장한 저를 배려해 가벼운 인사와 함께 시작해주셔서 마음이 놓였어요"
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

            {/* Q2. 기억에 남는 질문이나 대답하기 어려웠던 질문이 있나요? */}
            <FormField
              control={form.control}
              name="memorableQuestions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="typo-body-1-b text-black-color mb-4">
                    Q2. 기억에 남는 질문이나 대답하기 어려웠던 질문이 있나요?
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="ex. 지금까지 살면서 가장 실패했던 경험과 그로부터 배운 점'에 대한 질문이 가장 어려웠습니다. 미리 준비했던 질문이었는데도 막상 답변할 때 실패 경험을 솔직히 털어놓는 것이 부담스러웠어요. "
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

            {/* Q3. 인터뷰/면접을 하며 느낀 점이나 아쉬웠던 부분이 있나요? */}
            <FormField
              control={form.control}
              name="feelingsAndRegrets"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="typo-body-1-b text-black-color mb-4">
                    Q3. 인터뷰/면접을 하며 느낀 점이나 아쉬웠던 부분이 있나요?
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="ex.준비했던 내용을 다 말하지 못한 아쉬움이 있었습니다. 특히 마지막 질문 시간에 제가 궁금했던 동아리 문화에 대해 더 깊이 물어보지 못한 것이 아쉬워요. 다음에는 시간 배분을 더 잘 고려해서 쌍방향 소통을 늘려야겠다고 생각했습니다"
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
