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
import { ResultType } from '@/features/review/types'
import {
  usePaperNormalForm,
  APPEAL_AREA_OPTIONS,
  REFERENCE_MATERIAL_OPTIONS,
  ADDITIONAL_DOCUMENTS_OPTIONS,
} from './hooks/usePaperNormalForm'

export default function PaperNormalForm() {
  const router = useRouter()
  const { form, onSubmit, isSubmitting } = usePaperNormalForm()
  const { data: clubsData } = useClubsList({ size: 20 })

  // 추가 서류 체크박스 상태 관리
  const watchedAdditionalDocs = form.watch('additionalDocuments')

  const handleAdditionalDocChange = (docId: number, checked: boolean) => {
    const current = watchedAdditionalDocs || []
    if (checked) {
      form.setValue('additionalDocuments', [...current, docId])
    } else {
      form.setValue(
        'additionalDocuments',
        current.filter((id) => id !== docId),
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
                      value={field.value?.toString() || ''}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="선택하기" />
                      </SelectTrigger>
                      <SelectContent>
                        {clubsData.content.map((club) => (
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
                      value={field.value?.toString() || ''}
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
                      value={field.value?.toString() || ''}
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
                <div className="flex flex-row gap-2 items-center mb-4">
                  <FormLabel className="typo-body-1-b text-black-color">
                    지원 총평
                  </FormLabel>
                  <p className="typo-button-m text-grey-color-3">
                    서류 경험의 만족도는 몇 점인가요?
                  </p>
                </div>
                <FormControl className="w-full flex justify-center">
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
            <div className="flex flex-row gap-2 items-center mb-6">
              <h3 className="typo-body-1-b text-black-color">간단 Q&A</h3>
              <p className="typo-button-m text-grey-color-3">
                서류 작성 경험에 맞춰 자신에게 해당하는 선택지를 골라주세요
              </p>
            </div>

            <div className="flex flex-col gap-12">
              {/* Q1 */}
              <FormField
                control={form.control}
                name="appealArea"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="typo-body-2-sb text-black-color mb-4">
                      Q1. 이력서/자기소개서에서 가장 어필한 영역은 무엇인가요?
                    </FormLabel>
                    <FormControl>
                      <div className="flex gap-6">
                        {APPEAL_AREA_OPTIONS.map((option) => (
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
                name="referenceMaterial"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="typo-body-3-b text-black-color mb-4">
                      Q2. 이력서/자기소개서 작성 시 가장 참고한 자료는
                      무엇인가요?
                    </FormLabel>
                    <FormControl>
                      <div className="flex gap-6">
                        {REFERENCE_MATERIAL_OPTIONS.map((option) => (
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
                <FormLabel className="typo-body-3-b text-black-color mb-4">
                  Q3. 함께 제출한 추가 서류는 무엇인가요?
                  <span className="typo-caption-m text-grey-color-3">
                    (복수 선택 가능)
                  </span>
                </FormLabel>
                <div className="flex gap-6">
                  {ADDITIONAL_DOCUMENTS_OPTIONS.map((option) => (
                    <OptionButton
                      key={option.id}
                      selected={
                        watchedAdditionalDocs?.includes(option.id) || false
                      }
                      onClick={() =>
                        handleAdditionalDocChange(
                          option.id,
                          !watchedAdditionalDocs?.includes(option.id),
                        )
                      }
                      className="flex-1"
                    >
                      {option.label}
                    </OptionButton>
                  ))}
                </div>
                {form.formState.errors.additionalDocuments && (
                  <p className="text-failure-color typo-caption-m mt-1">
                    {form.formState.errors.additionalDocuments.message}
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
                <div className="flex flex-row gap-2 items-center mb-4">
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

          {/* 가장 인상깊었던 포인트 */}
          <FormField
            control={form.control}
            name="impressivePoint"
            render={({ field }) => (
              <FormItem>
                <div className="flex flex-row gap-2 items-center mb-4">
                  <FormLabel className="typo-body-1-b text-black-color">
                    가장 인상깊었던 포인트
                  </FormLabel>
                  <p className="typo-button-m text-grey-color-3">
                    서류 경험에서 기억에 남거나, 공유하고 싶은 순간을 자세히
                    적어주세요
                  </p>
                </div>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="ex. 포트폴리오를 따로 올리지 않고 자기소개서 5문항으로만 진행해서 특이했어요."
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

          {/* 결과 상태 */}
          <FormField
            control={form.control}
            name="resultType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="mb-4 typo-body-1-b text-black-color">
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
