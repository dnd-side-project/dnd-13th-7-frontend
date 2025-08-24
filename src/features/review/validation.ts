import { z } from 'zod'
import { appValidation } from '@/shared/configs/appValidation'
import { ResultType } from './types'

// === 공통 Validation 정의 ===
const commonValidation = {
  // 기본 정보
  clubId: appValidation.requiredNumber('IT 동아리명을 선택해주세요'),
  generation: appValidation.requiredNumber('지원 기수를 선택해주세요'),
  jobId: appValidation.requiredNumber('지원 파트를 선택해주세요'),

  // 평점
  rate: appValidation.rating('만족도를 선택해주세요'),

  // 결과 상태
  resultType: z.enum(ResultType),

  // 공통 텍스트 필드
  oneLineComment: appValidation.oneLineText(
    60,
    '한줄 요약 후기를 입력해주세요',
  ),
  impressivePoint: appValidation.longText(10, 1200),

  // Premium 공통 필드
  thumbnailImage: z.instanceof(File).optional(),
  title: appValidation.oneLineText(60, '제목을 입력해주세요'),
}

// === Paper 전용 Validation ===
const paperValidation = {
  // Normal 폼 전용
  appealArea: appValidation.requiredNumber('어필한 영역을 선택해주세요'),
  referenceMaterial: appValidation.requiredNumber('참고한 자료를 선택해주세요'),
  additionalDocuments: appValidation.multipleChoice('추가 서류를 선택해주세요'),

  // Premium 폼 전용
  difficultPart: appValidation.longText(10, 1200),
  expressionMethod: appValidation.longText(10, 1200),
  finalCheck: appValidation.longText(10, 1200),
}

// === Interview 전용 Validation ===
const interviewValidation = {
  // Normal 폼 전용
  interviewDuration: appValidation.requiredNumber('진행 시간을 선택해주세요'),
  questionType: appValidation.requiredNumber('질문 유형을 선택해주세요'),
  unexpectedResponse: appValidation.multipleChoice('대응 방법을 선택해주세요'),

  // Premium 폼 전용
  atmosphereAndInterviewers: appValidation.longText(10, 1200),
  memorableQuestions: appValidation.longText(10, 1200),
  feelingsAndRegrets: appValidation.longText(10, 1200),
}

// === Activity 전용 Validation ===
const activityValidation = {
  // Normal 폼 전용
  activityDuration:
    appValidation.requiredNumber('평균 활동 시간을 선택해주세요'),
  satisfactionSystem:
    appValidation.requiredNumber('만족스러웠던 부분을 선택해주세요'),
  recommendationTarget:
    appValidation.multipleChoice('추천 대상을 선택해주세요'),

  // Premium 폼 전용
  preparationBeforeStart: appValidation.longText(10, 1200),
  collaborationExperience: appValidation.longText(10, 1200),
  personalGrowth: appValidation.longText(10, 1200),
  growthKeywords: z.string().min(1, '성장 키워드를 선택해주세요'),
}

// === Form Schemas ===
// Interview Normal Form Schema
export const interviewNormalFormSchema = z
  .object({
    ...commonValidation,
    interviewDuration: interviewValidation.interviewDuration,
    questionType: interviewValidation.questionType,
    unexpectedResponse: interviewValidation.unexpectedResponse,
  })
  .omit({ thumbnailImage: true, title: true })

// Activity Normal Form Schema
export const activityNormalFormSchema = z
  .object({
    ...commonValidation,
    activityDuration: activityValidation.activityDuration,
    satisfactionSystem: activityValidation.satisfactionSystem,
    recommendationTarget: activityValidation.recommendationTarget,
  })
  .omit({ thumbnailImage: true, title: true })

// Paper Premium Form Schema
export const paperPremiumFormSchema = z
  .object({
    ...commonValidation,
    difficultPart: paperValidation.difficultPart,
    expressionMethod: paperValidation.expressionMethod,
    finalCheck: paperValidation.finalCheck,
  })
  .omit({ oneLineComment: true, impressivePoint: true })

// Interview Premium Form Schema
export const interviewPremiumFormSchema = z
  .object({
    ...commonValidation,
    atmosphereAndInterviewers: interviewValidation.atmosphereAndInterviewers,
    memorableQuestions: interviewValidation.memorableQuestions,
    feelingsAndRegrets: interviewValidation.feelingsAndRegrets,
  })
  .omit({ oneLineComment: true, impressivePoint: true })

// Activity Premium Form Schema
export const activityPremiumFormSchema = z
  .object({
    ...commonValidation,
    preparationBeforeStart: activityValidation.preparationBeforeStart,
    collaborationExperience: activityValidation.collaborationExperience,
    personalGrowth: activityValidation.personalGrowth,
    growthKeywords: activityValidation.growthKeywords,
  })
  .omit({
    oneLineComment: true,
    impressivePoint: true,
    resultType: true, // Activity Premium에는 resultType이 없음
  })

// === Type Exports ===
export type InterviewNormalFormData = z.infer<typeof interviewNormalFormSchema>
export type ActivityNormalFormData = z.infer<typeof activityNormalFormSchema>
export type PaperPremiumFormData = z.infer<typeof paperPremiumFormSchema>
export type InterviewPremiumFormData = z.infer<
  typeof interviewPremiumFormSchema
>
export type ActivityPremiumFormData = z.infer<typeof activityPremiumFormSchema>
