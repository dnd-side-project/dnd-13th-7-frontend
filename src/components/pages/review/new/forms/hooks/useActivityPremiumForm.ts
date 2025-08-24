import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import z from 'zod'
import {
  ReviewCategory,
  ReviewType,
  QuestionType,
  type PremiumReviewCreateRequest,
  type AnswerRequest,
} from '@/features/review/types'
import AppPath from '@/shared/configs/appPath'
import { appValidation } from '@/shared/configs/appValidation'

// Q&A 질문 ID 정의
const QUESTION_IDS = {
  Q1_PREPARATION_BEFORE_START: 30,
  Q2_COLLABORATION_EXPERIENCE: 31,
  Q3_PERSONAL_GROWTH: 32,
  TITLE: 33,
  GROWTH_KEYWORDS: 34,
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
  thumbnailImage: z.instanceof(File).optional(),
  title: appValidation.oneLineText(60, '제목을 입력해주세요'),
  preparationBeforeStart: appValidation.longText(10, 1200),
  collaborationExperience: appValidation.longText(10, 1200),
  personalGrowth: appValidation.longText(10, 1200),
  growthKeywords: z.string().min(1, '성장 키워드를 선택해주세요'),
})

export type ActivityPremiumFormType = z.infer<typeof ActivityPremiumFormSchema>

export const useActivityPremiumForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const form = useForm<ActivityPremiumFormType>({
    resolver: zodResolver(ActivityPremiumFormSchema),
    defaultValues: {
      clubId: undefined,
      generation: undefined,
      jobId: undefined,
      thumbnailImage: undefined,
      title: '',
      preparationBeforeStart: '',
      collaborationExperience: '',
      personalGrowth: '',
      growthKeywords: '',
    },
    mode: 'onBlur',
  })

  // 폼 데이터를 API 요청 형식으로 변환
  const transformToApiRequest = (
    data: ActivityPremiumFormType,
  ): Partial<PremiumReviewCreateRequest> => {
    const questions: AnswerRequest[] = [
      {
        questionId: QUESTION_IDS.TITLE,
        questionType: QuestionType.Subjective,
        value: data.title,
      },
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
      {
        questionId: QUESTION_IDS.GROWTH_KEYWORDS,
        questionType: QuestionType.MultipleChoice,
        value: data.growthKeywords, // 단일 선택
      },
    ]

    return {
      clubId: data.clubId,
      generation: data.generation,
      jobId: data.jobId,
      questions,
      // Note: Activity Premium에는 resultType이 없음
      reviewCategory: ReviewCategory.Activity, // 활동 전형
      reviewType: ReviewType.Premium, // 프리미엄 후기
      imageUrl: '', // TODO: 이미지 업로드 후 URL로 변경
      title: data.title,
      // resultType은 Activity Premium에는 없음
    }
  }

  const onSubmit = async (data: ActivityPremiumFormType) => {
    setIsSubmitting(true)
    try {
      const apiData = transformToApiRequest(data)
      console.log('Form submitted:', data)
      console.log('Form submitted:', apiData)
      // TODO: API 호출
      // await postPremiumReview(apiData)
      router.push(AppPath.reviewSubmitted())
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    form,
    onSubmit,
    isSubmitting,
  }
}
