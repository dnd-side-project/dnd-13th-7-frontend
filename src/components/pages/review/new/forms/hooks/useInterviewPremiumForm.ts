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
  Q1_ATMOSPHERE_AND_INTERVIEWERS: 13,
  Q2_MEMORABLE_QUESTIONS: 14,
  Q3_FEELINGS_AND_REGRETS: 15,
} as const

const InterviewPremiumFormSchema = z.object({
  clubId: appValidation.requiredNumber('IT 동아리명을 선택해주세요'),
  generation: appValidation.requiredNumber('지원 기수를 선택해주세요'),
  jobId: appValidation.requiredNumber('지원 파트를 선택해주세요'),
  resultType: z.enum(ResultType),
  thumbnailImageUrl: z.string().optional(),
  title: appValidation.oneLineText(60, '제목을 입력해주세요'),
  atmosphereAndInterviewers: appValidation.longText(10, 1200),
  memorableQuestions: appValidation.longText(10, 1200),
  feelingsAndRegrets: appValidation.longText(10, 1200),
})

export type InterviewPremiumFormType = z.infer<
  typeof InterviewPremiumFormSchema
>

export const useInterviewPremiumForm = () => {
  const router = useRouter()
  const uploadFileMutation = useUploadFile()
  const postPremiumReviewMutation = usePostPremiumReview()

  const form = useForm<InterviewPremiumFormType>({
    resolver: zodResolver(InterviewPremiumFormSchema),
    defaultValues: {
      clubId: undefined,
      generation: undefined,
      jobId: undefined,
      resultType: ResultType.Ready,
      thumbnailImageUrl: '',
      title: '',
      atmosphereAndInterviewers: '',
      memorableQuestions: '',
      feelingsAndRegrets: '',
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
    data: InterviewPremiumFormType,
  ): PremiumReviewCreateRequest => {
    const questions: AnswerRequest[] = [
      {
        questionId: QUESTION_IDS.Q1_ATMOSPHERE_AND_INTERVIEWERS,
        questionType: QuestionType.Subjective,
        value: data.atmosphereAndInterviewers,
      },
      {
        questionId: QUESTION_IDS.Q2_MEMORABLE_QUESTIONS,
        questionType: QuestionType.Subjective,
        value: data.memorableQuestions,
      },
      {
        questionId: QUESTION_IDS.Q3_FEELINGS_AND_REGRETS,
        questionType: QuestionType.Subjective,
        value: data.feelingsAndRegrets,
      },
    ]

    return {
      clubId: data.clubId,
      generation: data.generation,
      jobId: data.jobId,
      questions,
      resultType: data.resultType,
      reviewCategory: ReviewCategory.Interview, // 인터뷰 전형
      reviewType: ReviewType.Premium, // 프리미엄 후기
      imageUrl: data.thumbnailImageUrl || '',
      title: data.title,
    }
  }

  const onSubmit = async (data: InterviewPremiumFormType) => {
    try {
      const apiData = transformToApiRequest(data)

      const res = await postPremiumReviewMutation.mutateAsync(apiData)

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
