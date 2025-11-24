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

// 면접 결과 옵션
export const INTERVIEW_RESULT_OPTIONS = [
  { id: ResultType.Pass, label: '합격' },
  { id: ResultType.Fail, label: '불합격' },
  { id: 'NOT_PARTICIPATED', label: '합격 후 참여하지않음' },
  { id: ResultType.Ready, label: '결과 대기중' },
] as const

// Q1: 면접에서 어떤 유형의 질문을 받으셨나요?
export const Q1_QUESTION_TYPE_OPTIONS = [
  { id: 1, label: '자기 소개' },
  { id: 2, label: '지원동기' },
  { id: 3, label: '직군 관련 지식' },
  { id: 4, label: '위기 대처 방안' },
  { id: 5, label: '프로젝트 소개' },
  { id: 6, label: '강점/약점' },
  { id: 7, label: '협업 경험' },
  { id: 8, label: '합격 후 포부' },
]

// Q2: 면접관들의 가장 일반적인 태도는 어떻게 보였나요?
export const Q2_INTERVIEWER_ATTITUDE_OPTIONS = [
  { id: 1, label: '무관심 / 차가움' },
  { id: 2, label: '중립적 / 일관적' },
  { id: 3, label: '호의적 / 경청함' },
  { id: 4, label: '매우적극적 / 반응 좋음' },
]

// Q3: 면접에서 가장 큰 시간 비중을 차지한, 논의 주제는 무엇이었나요?
export const Q3_MAIN_TOPIC_OPTIONS = [
  { id: 1, label: '지원 동기 / 미래 비전' },
  { id: 2, label: '직무 관련 지식' },
  { id: 3, label: '과거 프로젝트 / 경험' },
  { id: 4, label: '인성/가치관' },
]

// Q4: 면접시 중점적으로 어필한 역량은 무엇이었나요?
export const Q4_EMPHASIZED_SKILL_OPTIONS = [
  { id: 1, label: '소통/협력' },
  { id: 2, label: '전문성/직무 지식' },
  { id: 3, label: '책임감/태도' },
  { id: 4, label: '동아리 경험/ 실무' },
]

// 동적 QA 항목 스키마
const qaItemSchema = z.object({
  question: z.string().min(1, '질문을 입력해주세요'),
  answer: z.string().min(1, '답변을 입력해주세요'),
})

const InterviewFormSchema = z.object({
  // 공통 헤더
  clubId: appValidation.requiredNumber('IT 동아리명을 선택해주세요'),
  generation: appValidation.requiredNumber('지원 기수를 선택해주세요'),
  jobId: appValidation.requiredNumber('지원 파트를 선택해주세요'),

  // Step 1
  resultType: z.string().min(1, '면접 결과를 선택해주세요'),
  rate: appValidation.rating('면접 총평을 선택해주세요'),
  q1QuestionType: z.array(z.number()).min(1, '최소 1개 이상 선택해주세요'),
  q2InterviewerAttitude:
    appValidation.requiredNumber('면접관 태도를 선택해주세요'),
  q3MainTopic: appValidation.requiredNumber('주요 논의 주제를 선택해주세요'),
  q4EmphasizedSkill: appValidation.requiredNumber('어필한 역량을 선택해주세요'),

  // Step 2
  oneLineComment: appValidation.oneLineText(30, '한줄평을 입력해주세요'),
  qaItems: z.array(qaItemSchema).min(1, '최소 1개의 항목을 입력해주세요'),
  tip: z.string().max(300, '300자 이내로 입력해주세요').optional(),
  freeReview: z.string().max(300, '300자 이내로 입력해주세요').optional(),
})

export type InterviewFormType = z.infer<typeof InterviewFormSchema>

export const useInterviewForm = () => {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<1 | 2>(1)
  const postBasicReviewMutation = usePostBasicReview()

  const form = useForm<InterviewFormType>({
    resolver: zodResolver(InterviewFormSchema),
    defaultValues: {
      clubId: undefined,
      generation: undefined,
      jobId: undefined,
      resultType: '',
      rate: undefined,
      q1QuestionType: [],
      q2InterviewerAttitude: undefined,
      q3MainTopic: undefined,
      q4EmphasizedSkill: undefined,
      oneLineComment: '',
      qaItems: [{ question: '', answer: '' }],
      tip: '',
      freeReview: '',
    },
    mode: 'onBlur',
  })

  const goToNextStep = async () => {
    const step1Fields = [
      'clubId',
      'generation',
      'jobId',
      'resultType',
      'rate',
      'q1QuestionType',
      'q2InterviewerAttitude',
      'q3MainTopic',
      'q4EmphasizedSkill',
    ] as const

    const isValid = await form.trigger(step1Fields)
    if (isValid) {
      setCurrentStep(2)
    }
  }

  const goToPreviousStep = () => {
    if (currentStep === 2) {
      setCurrentStep(1)
    } else {
      router.back()
    }
  }

  const transformToApiRequest = (
    data: InterviewFormType,
  ): BasicReviewCreateRequest => {
    const questions: AnswerRequest[] = [
      {
        questionId: 4, // Q1: 질문 유형
        questionType: QuestionType.MultipleChoice,
        value: data.q1QuestionType,
      },
      {
        questionId: 5, // Q2: 면접관 태도
        questionType: QuestionType.SingleChoice,
        value: data.q2InterviewerAttitude,
      },
      {
        questionId: 6, // Q3: 주요 논의 주제
        questionType: QuestionType.SingleChoice,
        value: data.q3MainTopic,
      },
      {
        questionId: 7, // Q4: 어필 역량
        questionType: QuestionType.SingleChoice,
        value: data.q4EmphasizedSkill,
      },
      {
        questionId: 19, // 한줄평
        questionType: QuestionType.Subjective,
        value: data.oneLineComment,
      },
    ]

    // 동적 QA 항목 추가
    data.qaItems.forEach((qa, index) => {
      questions.push({
        questionId: 100 + index,
        questionType: QuestionType.Subjective,
        value: `Q: ${qa.question}\nA: ${qa.answer}`,
      })
    })

    if (data.tip) {
      questions.push({
        questionId: 20,
        questionType: QuestionType.Subjective,
        value: data.tip,
      })
    }

    if (data.freeReview) {
      questions.push({
        questionId: 21,
        questionType: QuestionType.Subjective,
        value: data.freeReview,
      })
    }

    let resultType = ResultType.Ready
    if (data.resultType === ResultType.Pass) {
      resultType = ResultType.Pass
    } else if (
      data.resultType === ResultType.Fail ||
      data.resultType === 'NOT_PARTICIPATED'
    ) {
      resultType = ResultType.Fail
    }

    return {
      clubId: data.clubId,
      generation: data.generation,
      jobId: data.jobId,
      questions,
      rate: data.rate,
      resultType,
      reviewCategory: ReviewCategory.Interview,
      reviewType: ReviewType.Basic,
    }
  }

  const onSubmit = async (data: InterviewFormType) => {
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
    currentStep,
    goToNextStep,
    goToPreviousStep,
    onSubmit,
    isSubmitting: postBasicReviewMutation.isPending,
  }
}
