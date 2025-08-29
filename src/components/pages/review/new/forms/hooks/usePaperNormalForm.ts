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
  Q1_APPEAL_AREA: 1,
  Q2_REFERENCE_MATERIAL: 2,
  Q3_ADDITIONAL_DOCUMENTS: 3,
} as const

// 선택지 데이터
export const APPEAL_AREA_OPTIONS = [
  { id: 1, label: '동아리 관련 경험' },
  { id: 2, label: '기술 및 파트 지식' },
  { id: 3, label: '열정 및 커리어 계획' },
]

export const REFERENCE_MATERIAL_OPTIONS = [
  { id: 1, label: '동아리 공고' },
  { id: 2, label: '동아리 합격자 후기' },
  { id: 3, label: '파트 트렌드 및 이슈' },
]

export const ADDITIONAL_DOCUMENTS_OPTIONS = [
  { id: 1, label: '포트폴리오' },
  { id: 2, label: '개인 SNS/사이트' },
  { id: 3, label: '없음' },
]

const PaperNormalFormSchema = z.object({
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
  appealArea: appValidation.requiredNumber('어필한 영역을 선택해주세요'),
  referenceMaterial: appValidation.requiredNumber('참고한 자료를 선택해주세요'),
  additionalDocuments: appValidation.multipleChoice('추가 서류를 선택해주세요'),
})

export type PaperNormalFormType = z.infer<typeof PaperNormalFormSchema>

export const usePaperNormalForm = () => {
  const router = useRouter()
  const postBasicReviewMutation = usePostBasicReview()

  const form = useForm<PaperNormalFormType>({
    resolver: zodResolver(PaperNormalFormSchema),
    defaultValues: {
      clubId: undefined,
      generation: undefined,
      jobId: undefined,
      rate: undefined,
      oneLineComment: '',
      impressivePoint: '',
      resultType: ResultType.Ready,
    },
    mode: 'onBlur',
  })

  // 폼 데이터를 API 요청 형식으로 변환
  const transformToApiRequest = (
    data: PaperNormalFormType,
  ): BasicReviewCreateRequest => {
    const questions: AnswerRequest[] = [
      {
        questionId: QUESTION_IDS.Q1_APPEAL_AREA,
        questionType: QuestionType.SingleChoice,
        value: data.appealArea,
      },
      {
        questionId: QUESTION_IDS.Q2_REFERENCE_MATERIAL,
        questionType: QuestionType.SingleChoice,
        value: data.referenceMaterial,
      },
      {
        questionId: QUESTION_IDS.Q3_ADDITIONAL_DOCUMENTS,
        questionType: QuestionType.MultipleChoice,
        value: data.additionalDocuments,
      },
      {
        questionId: 19, // 한줄 요약 후기 질문 ID
        questionType: QuestionType.Subjective,
        value: data.oneLineComment,
      },
      {
        questionId: 20, // 인상깊은 포인트 질문 ID
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
      reviewCategory: ReviewCategory.Document, // 서류 전형
      reviewType: ReviewType.Basic, // 일반 후기
    }
  }

  const onSubmit = async (data: PaperNormalFormType) => {
    try {
      const apiData = transformToApiRequest(data)

      await postBasicReviewMutation.mutateAsync(apiData)

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
