import { ReviewsQueryParams } from './types'

export const reviewKeys = {
  all: () => ['reviews'] as const,
  lists: () => [...reviewKeys.all(), 'list'] as const,

  // Premium reviews
  premiumLists: () => [...reviewKeys.lists(), 'premium'] as const,
  premiumList: (params?: ReviewsQueryParams) =>
    [...reviewKeys.premiumLists(), params ?? {}] as const,

  // Basic reviews
  basicLists: () => [...reviewKeys.lists(), 'basic'] as const,
  basicList: (params?: ReviewsQueryParams) =>
    [...reviewKeys.basicLists(), params ?? {}] as const,
} as const

export type ReviewKeys = typeof reviewKeys
