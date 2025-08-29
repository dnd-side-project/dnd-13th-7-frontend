export const clubKeys = {
  all: () => ['clubs'] as const,
  lists: () => [...clubKeys.all(), 'list'] as const,
  list: (params?: {
    page?: number
    size?: number
    search?: string
    field?: string
    part?: string
    way?: string
    target?: string
    sort?: string
  }) => [...clubKeys.lists(), params ?? {}] as const,
  details: () => [...clubKeys.all(), 'details'] as const,
  detail: (clubId: number | string) => [...clubKeys.details(), clubId] as const,
  recruits: () => [...clubKeys.all(), 'recruits'] as const,
  recruit: (clubId: number | string) =>
    [...clubKeys.recruits(), clubId] as const,
  popular: () => [...clubKeys.all(), 'popular'] as const,
  userSubscription: () => [...clubKeys.all(), 'user-subscription'] as const,
  userSubscriptionCheck: (clubId: number) =>
    [...clubKeys.userSubscription(), 'check', clubId] as const,
} as const

export type ClubKeys = typeof clubKeys
