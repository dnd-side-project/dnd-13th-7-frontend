export const userKeys = {
  all: ['user'] as const,
  activate: () => [...userKeys.all, 'activate'] as const,
  profile: () => [...userKeys.all, 'profile'] as const,
  updateProfileImage: () => [...userKeys.all, 'updateProfileImage'] as const,
  interests: () => [...userKeys.all, 'interests'] as const,
}
