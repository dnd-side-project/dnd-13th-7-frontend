export const subscribeKeys = {
  all: () => ['subscribes'] as const,
  lists: () => [...subscribeKeys.all(), 'list'] as const,
  list: () => [...subscribeKeys.lists()] as const,
  userSubscribes: () => [...subscribeKeys.all(), 'user-subscribes'] as const,
} as const

export type SubscribeKeys = typeof subscribeKeys
