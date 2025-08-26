export const userKeys = {
  all: ['user'] as const,
  activate: () => [...userKeys.all, 'activate'] as const,
  me: () => [...userKeys.all, 'me'] as const,
}
