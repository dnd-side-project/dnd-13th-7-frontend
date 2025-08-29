import { ReviewsQueryParams } from './types'

export const reviewKeys = {
  all: () => ['reviews'] as const,
  lists: () => [...reviewKeys.all(), 'list'] as const,

  // Premium reviews - 후기 탐색 페이지 (/review/explore)
  premiumLists: () => [...reviewKeys.lists(), 'premium'] as const,
  premiumList: (params?: ReviewsQueryParams) =>
    [...reviewKeys.premiumLists(), params] as const,

  // Club premium reviews - 동아리 상세 페이지 프리미엄 후기 탭 (/club/[clubId])
  clubPremiumLists: () => [...reviewKeys.lists(), 'club-premium'] as const,
  clubPremiumList: (
    clubId: number,
    params?: Omit<ReviewsQueryParams, 'club'>,
  ) => [...reviewKeys.clubPremiumLists(), clubId, params] as const,

  // Basic reviews - 동아리 상세 페이지 일반 후기 탭 (/club/[clubId])
  basicLists: () => [...reviewKeys.lists(), 'basic'] as const,
  basicList: (params?: ReviewsQueryParams) =>
    [...reviewKeys.basicLists(), params ?? {}] as const,

  // Club basic reviews - 동아리 상세 페이지 일반 후기 탭 (/club/[clubId])
  clubBasicLists: () => [...reviewKeys.lists(), 'club-basic'] as const,
  clubBasicList: (clubId: number, params?: Omit<ReviewsQueryParams, 'club'>) =>
    [...reviewKeys.clubBasicLists(), clubId, params] as const,

  // Popular premium reviews - 메인 페이지 (/)
  popularPremium: () => [...reviewKeys.all(), 'popular-premium'] as const,
} as const

export type ReviewKeys = typeof reviewKeys
