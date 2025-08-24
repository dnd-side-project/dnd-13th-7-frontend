import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import {
  ReviewCategory,
  ReviewType,
  QuestionType,
  type PremiumReviewCreateRequest,
  type AnswerRequest,
  ResultType,
} from '@/features/review/types'
import { appValidation } from '@/shared/configs/appValidation'

// Q&A 질문 ID 정의
const QUESTION_IDS = {
  Q1_DIFFICULT_PART: 16,
  Q2_EXPRESSION_METHOD: 17,
  Q3_FINAL_CHECK: 18,
  TITLE: 19,
} as const

const PaperPremiumFormSchema = z.object({
  clubId: appValidation.requiredNumber('IT 동아리명을 선택해주세요'),
  generation: appValidation.requiredNumber('지원 기수를 선택해주세요'),
  jobId: appValidation.requiredNumber('지원 파트를 선택해주세요'),
  resultType: z.enum(ResultType),
  thumbnailImage: z.instanceof(File).optional(),
  title: appValidation.oneLineText(60, '제목을 입력해주세요'),
  difficultPart: appValidation.longText(10, 1200),
  expressionMethod: appValidation.longText(10, 1200),
  finalCheck: appValidation.longText(10, 1200),
})

export type PaperPremiumFormType = z.infer<typeof PaperPremiumFormSchema>

export const usePaperPremiumForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<PaperPremiumFormType>({
    resolver: zodResolver(PaperPremiumFormSchema),
    defaultValues: {
      clubId: undefined,
      generation: undefined,
      jobId: undefined,
      resultType: ResultType.Ready,
      thumbnailImage: undefined,
      title: '',
      difficultPart: '',
      expressionMethod: '',
      finalCheck: '',
    },
    mode: 'onBlur',
  })

  // 폼 데이터를 API 요청 형식으로 변환
  const transformToApiRequest = (
    data: PaperPremiumFormType,
  ): PremiumReviewCreateRequest => {
    const questions: AnswerRequest[] = [
      {
        questionId: QUESTION_IDS.Q1_DIFFICULT_PART,
        questionType: QuestionType.Subjective,
        value: data.difficultPart,
      },
      {
        questionId: QUESTION_IDS.Q2_EXPRESSION_METHOD,
        questionType: QuestionType.Subjective,
        value: data.expressionMethod,
      },
      {
        questionId: QUESTION_IDS.Q3_FINAL_CHECK,
        questionType: QuestionType.Subjective,
        value: data.finalCheck,
      },
    ]

    return {
      clubId: data.clubId,
      generation: data.generation,
      jobId: data.jobId,
      questions,
      resultType: data.resultType,
      reviewCategory: ReviewCategory.Document, // 서류 전형
      reviewType: ReviewType.Premium, // 프리미엄 후기
      imageUrl: '', // TODO: 이미지 업로드 후 URL로 변경
      title: data.title,
    }
  }

  const onSubmit = async (data: PaperPremiumFormType) => {
    setIsSubmitting(true)
    try {
      const apiData = transformToApiRequest(data)
      console.log('Form submitted:', data)
      console.log('Form submitted:', apiData)
      // TODO: API 호출
      // await postPremiumReview(apiData)
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
