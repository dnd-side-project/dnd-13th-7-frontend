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

// 활동 여부 옵션
export const ACTIVITY_STATUS_OPTIONS = [
  { id: 'ACTIVE', label: '활동 중' },
  { id: 'COMPLETED', label: '활동 종료' },
] as const

// Q1: 활동 목표를 달성하기 위해 실제로 투입해야했던 주간 평균 시간은 어느정도였나요?
export const Q1_WEEKLY_HOURS_OPTIONS = [
  { id: 1, label: '주 5시간 미만' },
  { id: 2, label: '주 5~10시간' },
  { id: 3, label: '주 10~15시간' },
  { id: 4, label: '주 15시간 이상' },
]

// Q2: 활동 난이도의 수준은 어느정도였나요?
export const Q2_DIFFICULTY_OPTIONS = [
  { id: 1, label: '개인 흥미 수준' },
  { id: 2, label: '기본/응용학습 수준' },
  { id: 3, label: '심화/고급실무 수준' },
  { id: 4, label: '전문적/학술적 수준' },
]

// Q3: 참여하신 활동 중 가장 큰 만족감을 느꼈던 부분은 무엇이었나요?
export const Q3_SATISFACTION_OPTIONS = [
  { id: 1, label: '직무 기술/실력 성장' },
  { id: 2, label: '서비스 출시 / 배포 경험' },
  { id: 3, label: '추가 프로젝트 기회' },
  { id: 4, label: '인맥 및 네트워킹' },
  { id: 5, label: '포트폴리오 고도화' },
  { id: 6, label: '운영진 지원 및 피드백' },
  { id: 7, label: '채용/이직 기회' },
  { id: 8, label: '딱히 없었다' },
]

// 동적 QA 항목 스키마
const qaItemSchema = z.object({
  question: z.string().min(1, '질문을 입력해주세요'),
  answer: z.string().min(1, '답변을 입력해주세요'),
})

const ActivityFormSchema = z.object({
  // 공통 헤더
  clubId: appValidation.requiredNumber('IT 동아리명을 선택해주세요'),
  generation: appValidation.requiredNumber('지원 기수를 선택해주세요'),
  jobId: appValidation.requiredNumber('지원 파트를 선택해주세요'),

  // Step 1
  activityStatus: z.string().min(1, '활동 여부를 선택해주세요'),
  rate: appValidation.rating('활동 총평을 선택해주세요'),
  q1WeeklyHours: appValidation.requiredNumber('주간 투입 시간을 선택해주세요'),
  q2Difficulty: appValidation.requiredNumber('활동 난이도를 선택해주세요'),
  q3Satisfaction: z
    .array(z.number())
    .min(1, '최소 1개 이상 선택해주세요')
    .max(4, '최대 4개까지 선택 가능합니다'),

  // Step 2
  oneLineComment: appValidation.oneLineText(20, '한줄평을 입력해주세요'),
  qaItems: z.array(qaItemSchema).min(1, '최소 1개의 항목을 입력해주세요'),
  tip: z.string().max(300, '300자 이내로 입력해주세요').optional(),
  freeReview: z.string().max(300, '300자 이내로 입력해주세요').optional(),
})

export type ActivityFormType = z.infer<typeof ActivityFormSchema>

export const useActivityForm = () => {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<1 | 2>(1)
  const postBasicReviewMutation = usePostBasicReview()

  const form = useForm<ActivityFormType>({
    resolver: zodResolver(ActivityFormSchema),
    defaultValues: {
      clubId: undefined,
      generation: undefined,
      jobId: undefined,
      activityStatus: '',
      rate: undefined,
      q1WeeklyHours: undefined,
      q2Difficulty: undefined,
      q3Satisfaction: [],
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
      'activityStatus',
      'rate',
      'q1WeeklyHours',
      'q2Difficulty',
      'q3Satisfaction',
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
    data: ActivityFormType,
  ): BasicReviewCreateRequest => {
    const questions: AnswerRequest[] = [
      {
        questionId: 8, // Q1: 주간 시간
        questionType: QuestionType.SingleChoice,
        value: data.q1WeeklyHours,
      },
      {
        questionId: 9, // Q2: 난이도
        questionType: QuestionType.SingleChoice,
        value: data.q2Difficulty,
      },
      {
        questionId: 10, // Q3: 만족감
        questionType: QuestionType.MultipleChoice,
        value: data.q3Satisfaction,
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

    // 활동 후기는 resultType이 없으므로 Pass로 설정
    return {
      clubId: data.clubId,
      generation: data.generation,
      jobId: data.jobId,
      questions,
      rate: data.rate,
      resultType: ResultType.Pass,
      reviewCategory: ReviewCategory.Activity,
      reviewType: ReviewType.Basic,
    }
  }

  const onSubmit = async (data: ActivityFormType) => {
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
