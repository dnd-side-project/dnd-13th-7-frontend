import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import z from 'zod'
import {
  ReviewCategory,
  ReviewType,
  QuestionType,
  type BasicReviewCreateRequest,
  type AnswerRequest,
  ResultType,
} from '@/features/review/types'
import AppPath from '@/shared/configs/appPath'
import { appValidation } from '@/shared/configs/appValidation'

// Q&A 질문 ID 정의
const QUESTION_IDS = {
  Q1_ACTIVITY_DURATION: 11,
  Q2_SATISFACTION_SYSTEM: 12,
  Q3_RECOMMENDATION_TARGET: 13,
} as const

// 선택지 데이터
export const ACTIVITY_DURATION_OPTIONS = [
  { id: 1, label: '1시간 이하' },
  { id: 2, label: '2-3시간' },
  { id: 3, label: '4시간 이상' },
]

export const SATISFACTION_SYSTEM_OPTIONS = [
  { id: 1, label: '체계적인 커리큘럼' },
  { id: 2, label: '정기 피드백 및 멘토링' },
  { id: 3, label: '활발한 네트워킹' },
]

export const RECOMMENDATION_TARGET_OPTIONS = [
  { id: 1, label: '학습 및 스킬 상승' },
  { id: 2, label: '실무 경험 획득' },
  { id: 3, label: '네트워킹 및 협업' },
]

const ActivityNormalFormSchema = z.object({
  clubId: appValidation.requiredNumber('IT 동아리명을 선택해주세요'),
  generation: appValidation.requiredNumber('지원 기수를 선택해주세요'),
  jobId: appValidation.requiredNumber('지원 파트를 선택해주세요'),
  rate: appValidation.rating('만족도를 선택해주세요'),
  oneLineComment: appValidation.oneLineText(
    60,
    '한줄 요약 후기를 입력해주세요',
  ),
  impressivePoint: appValidation.longText(10, 1200),
  resultType: z.enum(ResultType),
  activityDuration:
    appValidation.requiredNumber('평균 활동 시간을 선택해주세요'),
  satisfactionSystem:
    appValidation.requiredNumber('만족스러웠던 부분을 선택해주세요'),
  recommendationTarget:
    appValidation.multipleChoice('추천 대상을 선택해주세요'),
})

export type ActivityNormalFormType = z.infer<typeof ActivityNormalFormSchema>

export const useActivityNormalForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const form = useForm<ActivityNormalFormType>({
    resolver: zodResolver(ActivityNormalFormSchema),
    defaultValues: {
      clubId: undefined,
      generation: undefined,
      jobId: undefined,
      rate: undefined,
      oneLineComment: '',
      impressivePoint: '',
      resultType: ResultType.Ready,
      activityDuration: undefined,
      satisfactionSystem: undefined,
      recommendationTarget: [],
    },
    mode: 'onBlur',
  })

  // 폼 데이터를 API 요청 형식으로 변환
  const transformToApiRequest = (
    data: ActivityNormalFormType,
  ): BasicReviewCreateRequest => {
    const questions: AnswerRequest[] = [
      {
        questionId: QUESTION_IDS.Q1_ACTIVITY_DURATION,
        questionType: QuestionType.MultipleChoice,
        value: data.activityDuration,
      },
      {
        questionId: QUESTION_IDS.Q2_SATISFACTION_SYSTEM,
        questionType: QuestionType.MultipleChoice,
        value: data.satisfactionSystem,
      },
      {
        questionId: QUESTION_IDS.Q3_RECOMMENDATION_TARGET,
        questionType: QuestionType.MultipleChoice,
        value: data.recommendationTarget.join(','), // 복수 선택은 콤마로 구분
      },
      {
        questionId: 14, // 한줄 요약 후기 질문 ID
        questionType: QuestionType.Subjective,
        value: data.oneLineComment,
      },
      {
        questionId: 15, // 인상깊은 포인트 질문 ID
        questionType: QuestionType.Subjective,
        value: data.impressivePoint,
      },
    ]

    return {
      clubId: data.clubId,
      generation: data.generation,
      jobId: data.jobId,
      questions,
      rate: data.rate,
      resultType: data.resultType,
      reviewCategory: ReviewCategory.Activity, // 활동 전형
      reviewType: ReviewType.Basic, // 일반 후기
    }
  }

  const onSubmit = async (data: ActivityNormalFormType) => {
    setIsSubmitting(true)
    try {
      const apiData = transformToApiRequest(data)
      console.log('Form submitted:', data)
      console.log('Form submitted:', apiData)
      // TODO: API 호출
      // await postBasicReview(apiData)
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
