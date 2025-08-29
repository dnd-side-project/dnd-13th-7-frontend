import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import z from 'zod'
import { useUploadFile } from '@/features/file'
import { usePostPremiumReview } from '@/features/review/mutations'
import {
  ReviewCategory,
  ReviewType,
  QuestionType,
  type PremiumReviewCreateRequest,
  type AnswerRequest,
  ResultType,
} from '@/features/review/types'
import AppPath from '@/shared/configs/appPath'
import { appValidation } from '@/shared/configs/appValidation'

// Q&A 질문 ID 정의
const QUESTION_IDS = {
  Q1_PREPARATION_BEFORE_START: 16,
  Q2_COLLABORATION_EXPERIENCE: 17,
  Q3_PERSONAL_GROWTH: 18,
  GROWTH_KEYWORDS: 21,
} as const

// 성장 키워드 옵션들
export const GROWTH_KEYWORD_OPTIONS = [
  { value: 'skill_improvement', label: '스킬 상승' },
  { value: 'job_study', label: '직무 공부' },
  { value: 'practical_experience', label: '실무 경험' },
  { value: 'portfolio', label: '포트폴리오' },
  { value: 'cross_team_collaboration', label: '타 직군 협업' },
  { value: 'networking', label: '네트워킹' },
] as const

const ActivityPremiumFormSchema = z.object({
  clubId: appValidation.requiredNumber('IT 동아리명을 선택해주세요'),
  generation: appValidation.requiredNumber('지원 기수를 선택해주세요'),
  jobId: appValidation.requiredNumber('지원 파트를 선택해주세요'),
  thumbnailImageUrl: z.string().optional(),
  title: appValidation.oneLineText(60, '제목을 입력해주세요'),
  preparationBeforeStart: appValidation.longText(10, 1200),
  collaborationExperience: appValidation.longText(10, 1200),
  personalGrowth: appValidation.longText(10, 1200),
  growthKeywords: z.string().min(1, '성장 키워드를 선택해주세요'),
})

export type ActivityPremiumFormType = z.infer<typeof ActivityPremiumFormSchema>

export const useActivityPremiumForm = () => {
  const router = useRouter()
  const uploadFileMutation = useUploadFile()
  const postPremiumReviewMutation = usePostPremiumReview()

  const form = useForm<ActivityPremiumFormType>({
    resolver: zodResolver(ActivityPremiumFormSchema),
    defaultValues: {
      clubId: undefined,
      generation: undefined,
      jobId: undefined,
      thumbnailImageUrl: '',
      title: '',
      preparationBeforeStart: '',
      collaborationExperience: '',
      personalGrowth: '',
      growthKeywords: '',
    },
    mode: 'onBlur',
  })

  // 이미지 업로드 핸들러
  const handleImageUpload = async (file: File | null) => {
    if (!file) {
      form.setValue('thumbnailImageUrl', '')
      return
    }

    try {
      const result = await uploadFileMutation.mutateAsync(file)
      form.setValue('thumbnailImageUrl', result.fileUrl)
    } catch (error) {
      console.error('Image upload failed:', error)
      // 에러 처리 (필요시 토스트 메시지 등 추가)
    }
  }

  // 폼 데이터를 API 요청 형식으로 변환
  const transformToApiRequest = (
    data: ActivityPremiumFormType,
  ): PremiumReviewCreateRequest => {
    const questions: AnswerRequest[] = [
      {
        questionId: QUESTION_IDS.Q1_PREPARATION_BEFORE_START,
        questionType: QuestionType.Subjective,
        value: data.preparationBeforeStart,
      },
      {
        questionId: QUESTION_IDS.Q2_COLLABORATION_EXPERIENCE,
        questionType: QuestionType.Subjective,
        value: data.collaborationExperience,
      },
      {
        questionId: QUESTION_IDS.Q3_PERSONAL_GROWTH,
        questionType: QuestionType.Subjective,
        value: data.personalGrowth,
      },
      // {
      //   questionId: QUESTION_IDS.GROWTH_KEYWORDS,
      //   questionType: QuestionType.SingleChoice,
      //   value: data.growthKeywords, // 단일 선택
      // },
    ]

    return {
      clubId: data.clubId,
      generation: data.generation,
      jobId: data.jobId,
      questions,
      reviewCategory: ReviewCategory.Activity, // 활동 전형
      reviewType: ReviewType.Premium, // 프리미엄 후기
      imageUrl: data.thumbnailImageUrl || '',
      title: data.title,
      resultType: ResultType.Ready,
    }
  }

  const onSubmit = async (data: ActivityPremiumFormType) => {
    try {
      const apiData = transformToApiRequest(data)

      const res = await postPremiumReviewMutation.mutateAsync(apiData)

      // savedReviewId를 URL 파라미터로 전달
      const url = res.savedReviewId
        ? `${AppPath.reviewSubmitted()}?reviewId=${res.savedReviewId}`
        : AppPath.reviewSubmitted()
      router.push(url)
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }

  return {
    form,
    onSubmit,
    isSubmitting: postPremiumReviewMutation.isPending,
    handleImageUpload,
    isUploading: uploadFileMutation.isPending,
  }
}
