import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import z from 'zod'
import { usePostBasicReview } from '@/features/review/mutations'
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
  Q1_INTERVIEW_DURATION: 1,
  Q2_QUESTION_TYPE: 2,
  Q3_UNEXPECTED_RESPONSE: 3,
} as const

// 선택지 데이터
export const INTERVIEW_DURATION_OPTIONS = [
  { id: 1, label: '30분 이하' },
  { id: 2, label: '1시간' },
  { id: 3, label: '2시간 이상' },
]

export const QUESTION_TYPE_OPTIONS = [
  { id: 1, label: '학습 의지 및 열정' },
  { id: 2, label: '기술 및 파트 역량' },
  { id: 3, label: '이력서/포트폴리오' },
]

export const UNEXPECTED_RESPONSE_OPTIONS = [
  { id: 1, label: '배움 의지 표현' },
  { id: 2, label: '새로운 아이디어 제시' },
  { id: 3, label: '비슷한 경험 제시' },
]

const InterviewNormalFormSchema = z.object({
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
  interviewDuration: appValidation.requiredNumber('진행 시간을 선택해주세요'),
  questionType: appValidation.requiredNumber('질문 유형을 선택해주세요'),
  unexpectedResponse: appValidation.multipleChoice('대응 방법을 선택해주세요'),
})

export type InterviewNormalFormType = z.infer<typeof InterviewNormalFormSchema>

export const useInterviewNormalForm = () => {
  const router = useRouter()
  const postBasicReviewMutation = usePostBasicReview()

  const form = useForm<InterviewNormalFormType>({
    resolver: zodResolver(InterviewNormalFormSchema),
    defaultValues: {
      clubId: undefined,
      generation: undefined,
      jobId: undefined,
      rate: undefined,
      oneLineComment: '',
      impressivePoint: '',
      resultType: ResultType.Ready,
      interviewDuration: undefined,
      questionType: undefined,
      unexpectedResponse: [],
    },
    mode: 'onBlur',
  })

  // 폼 데이터를 API 요청 형식으로 변환
  const transformToApiRequest = (
    data: InterviewNormalFormType,
  ): BasicReviewCreateRequest => {
    const questions: AnswerRequest[] = [
      {
        questionId: QUESTION_IDS.Q1_INTERVIEW_DURATION,
        questionType: QuestionType.SingleChoice,
        value: data.interviewDuration,
      },
      {
        questionId: QUESTION_IDS.Q2_QUESTION_TYPE,
        questionType: QuestionType.SingleChoice,
        value: data.questionType,
      },
      {
        questionId: QUESTION_IDS.Q3_UNEXPECTED_RESPONSE,
        questionType: QuestionType.MultipleChoice,
        value: data.unexpectedResponse,
      },
      {
        questionId: 9, // 한줄 요약 후기 질문 ID
        questionType: QuestionType.Subjective,
        value: data.oneLineComment,
      },
      {
        questionId: 10, // 인상깊은 포인트 질문 ID
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
      reviewCategory: ReviewCategory.Interview, // 인터뷰 전형
      reviewType: ReviewType.Basic, // 일반 후기
    }
  }

  const onSubmit = async (data: InterviewNormalFormType) => {
    try {
      const apiData = transformToApiRequest(data)
      console.log('Form submitted:', data)
      console.log('Form submitted:', apiData)
      const res = await postBasicReviewMutation.mutateAsync(apiData)
      console.log(res)
      router.push(AppPath.reviewSubmitted())
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }

  return {
    form,
    onSubmit,
    isSubmitting: postBasicReviewMutation.isPending,
  }
}
