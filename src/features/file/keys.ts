// Query keys for File Upload
export const fileKeys = {
  all: ['file'] as const,
  upload: () => [...fileKeys.all, 'upload'] as const,
} as const
