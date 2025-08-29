import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query'
import { uploadFile } from './api'
import { FileUploadResponse } from './types'

export function useUploadFile(
  options?: UseMutationOptions<FileUploadResponse, Error, File>,
): UseMutationResult<FileUploadResponse, Error, File> {
  return useMutation({
    mutationFn: uploadFile,
    ...options,
  })
}
