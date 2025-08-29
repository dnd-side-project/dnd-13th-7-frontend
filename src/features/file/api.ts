import { ApiResponse } from '@/shared/types/api'
import apiClient from '@/shared/utils/axios'
import { FileUploadResponse } from './types'

export async function uploadFile(file: File): Promise<FileUploadResponse> {
  const formData = new FormData()
  formData.append('file', file)

  const res = await apiClient.post<ApiResponse<FileUploadResponse>>(
    '/api/v1/file',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  )
  return res.data.data
}
