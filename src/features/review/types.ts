// Review Domain Types

// Enums
export enum QuestionType {
  MultipleChoice = 'MULTIPLE_CHOICE',
  Subjective = 'SUBJECTIVE',
  SingleChoice = 'SINGLE_CHOICE',
}

export enum ResultType {
  Fail = 'FAIL',
  Pass = 'PASS',
  Ready = 'READY',
}

export enum ReviewCategory {
  Activity = 'ACTIVITY',
  Document = 'DOCUMENT',
  Interview = 'INTERVIEW',
}

export enum ReviewType {
  Basic = 'BASIC',
  Premium = 'PREMIUM',
}

// Common interfaces
export interface AnswerRequest {
  /**
   * 질문 ID
   */
  questionId: number
  /**
   * 질문 타입
   */
  questionType: QuestionType
  /**
   * 답변 값 (객관식 또는 주관식)
   */
  value: number | string | number[]
}

export interface PageableSort {
  sorted: boolean
  unsorted: boolean
  empty: boolean
}

export interface Pageable {
  pageNumber: number
  pageSize: number
  sort: PageableSort
  offset: number
  paged: boolean
  unpaged: boolean
}

// Premium Review Types
export interface PremiumReviewItem {
  reviewId: number
  title: string
  imageUrl?: string | null
  headLine: string
  identifier: string[]
  likeCount: number
  commentCount: number
}

export interface PremiumReviewsPage {
  content: PremiumReviewItem[]
  pageable: Pageable
  totalPages: number
  totalElements: number
  last: boolean
  numberOfElements: number
  size: number
  number: number
  first: boolean
  sort: PageableSort
  empty: boolean
}

// Basic Review Types
export interface QAPreview {
  questionTitle: string
  answerValue: string
}

export interface BasicReviewItem {
  reviewId: number
  profileImgUrl: string
  nickname: string
  clubName: string
  cohort: string
  part: string
  rate: number
  createdAt: string
  category: string
  likeCount: number
  oneLineComment: string
  impressiveContentPreview: string
  qaPreviews: QAPreview[]
}

export interface BasicReviewsPage {
  content: BasicReviewItem[]
  pageable: Pageable
  totalPages: number
  totalElements: number
  last: boolean
  numberOfElements: number
  size: number
  number: number
  first: boolean
  sort: PageableSort
  empty: boolean
}

// Review List Query Params
export interface ReviewsQueryParams {
  /**
   * 동아리명
   */
  club?: string
  /**
   * 모집중인지 아닌지 -> sort 항목에 모집중을 누르면 이게 true로 바뀜
   */
  isRecruiting?: boolean
  /**
   * 페이지 번호 0부터 시작
   */
  page?: number
  /**
   * 동아리에서 모집하는 세부 파트
   */
  part?: string
  /**
   * 합격,불합격
   */
  result?: string
  /**
   * 전체,서류,면접,활동
   */
  reviewType?: string
  /**
   * 한페이지에서 띄울 개수
   */
  size?: number
  /**
   * 이름순,인기순,모집중
   */
  sort?: string
}

// Review Creation Types
export interface BasicReviewCreateRequest {
  /**
   * 동아리 ID
   */
  clubId: number
  /**
   * 기수
   */
  generation: number
  /**
   * 직군 ID
   */
  jobId: number
  /**
   * 질문에 대한 답변 목록
   */
  questions: AnswerRequest[]
  /**
   * 평점 (실수)
   */
  rate: number
  /**
   * 결과
   */
  resultType?: ResultType
  /**
   * 리뷰 종류 (서류/면접/활동)
   */
  reviewCategory: ReviewCategory
  /**
   * 리뷰 타입 (일반/프리미엄)
   */
  reviewType: ReviewType
}

export interface PremiumReviewCreateRequest {
  /**
   * 동아리 ID
   */
  clubId: number
  /**
   * 기수
   */
  generation: number
  /**
   * 후기 이미지
   */
  imageUrl: string
  /**
   * 직군 ID
   */
  jobId: number
  /**
   * 질문에 대한 답변 목록
   */
  questions: AnswerRequest[]
  /**
   * 결과
   */
  resultType: ResultType
  /**
   * 리뷰 종류 (서류/면접/활동)
   */
  reviewCategory: ReviewCategory
  /**
   * 리뷰 타입 (일반/프리미엄)
   */
  reviewType: ReviewType
  /**
   * 후기 제목
   */
  title: string
}

// Premium Review Detail Types
export interface Club {
  id: number
  name: string
  slogan: string
  bio: string
  establishment: number
  totalParticipant: number
  operation: number
  offline: string
  online: string
  location: string
  address: string
  recruiting: boolean
  imageUrl: string
}

export interface Job {
  id: number
  name: string
  engName: string
}

export interface User {
  id: number
  name: string
  email: string
  nickname: string | null
  profileImageUrl: string | null
  jobDto: Job | null
  provider: 'GOOGLE' | 'KAKAO'
  active: boolean
}

export interface Question {
  id: number
  title: string
  subTitle: string
  type: string
  elements: QuestionElement[]
}

export interface QuestionElement {
  id: number
  elementTitle: string
  sequence: number
}

export interface ReviewDetail {
  id: number
  question: Question
  userDto: User
  value: string | number | number[]
  answerType: string
}

export interface PremiumReviewDetail {
  id: number
  club: Club
  cohort: number
  job: Job
  user: User
  imageUrl: string
  title: string
  resultType: ResultType
  reviewCategory: ReviewCategory
  createDazte: string
  updateDate: string
  details: ReviewDetail[]
}

export interface PremiumReviewCreateResponse {
  /**
   * 저장된 리뷰 ID
   */
  savedReviewId: number
}
