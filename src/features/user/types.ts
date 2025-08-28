export enum UserCategory {
  PLANNING = '기획',
  DESIGN = '디자인',
  DEVELOPMENT = '개발',
}

export type UserCategoryType = keyof typeof UserCategory

/**
 * UserCategory를 숫자 ID로 매핑
 */
export const USER_CATEGORY_TO_ID: Record<UserCategoryType, number> = {
  PLANNING: 1,
  DESIGN: 2,
  DEVELOPMENT: 3,
}

/**
 * 숫자 ID를 UserCategory로 매핑
 */
export const ID_TO_USER_CATEGORY: Record<number, UserCategoryType> = {
  1: 'PLANNING',
  2: 'DESIGN',
  3: 'DEVELOPMENT',
}

/**
 * 사용자 활성화 요청 인터페이스
 */
export interface UserActivateRequest {
  /**
   * 닉네임
   */
  nickname: string
  /**
   * 직군 ID
   */
  job_id: number
  /**
   * 연령 약관 확인 여부
   */
  is_over_age: boolean
  /**
   * 서비스 이용약관 동의 여부
   */
  agree_terms_of_service: boolean
  /**
   * 개인정보수집 약관 동의 여부
   */
  agree_privacy_policy: boolean
  /**
   * 마케팅 개인정보수집 약관 동의 여부
   */
  agree_marketing_privacy: boolean
  /**
   * 이벤트 알림 동의 여부
   */
  agree_event_notification: boolean
}

/**
 * 사용자 활성화 응답 인터페이스
 */
export interface UserActivateResponse {
  /**
   * 성공 여부
   */
  success: boolean
  /**
   * 메시지
   */
  message?: string
  /**
   * 사용자 정보
   */
  user?: {
    id: number
    nickname: string
    job_id: number
    active: boolean
  }
}

/**
 * 현재 사용자 정보 응답 인터페이스
 */
export interface UserMeResponse {
  id: number
  nickname: string
  job_id: number
  active: boolean
  email?: string
}

/**
 * 사용자 프로필 타입 (GET /v1/user/profile 응답의 data)
 */
export interface UserJobDto {
  id: number
  name: string
  engName: string
}

export interface UserProfile {
  id: number
  name: string
  email: string
  nickname: string
  profileImageUrl: string
  jobDto: UserJobDto
  provider: string
  active: boolean
}

/**
 * 프로필 이미지 업데이트 요청 바디 (POST /v1/user/profile/image)
 */
export interface UpdateUserProfileImageRequest {
  fileUrl: string
}

/**
 * 관심 통계 (GET /v1/user/interests 응답의 data)
 */
export interface UserInterests {
  like_count: number
  club_subscribe_count: number
}
