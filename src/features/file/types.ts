// Domain types for File Upload
export interface FileUploadResponse {
  fileUrl: string
  fileName: string
  fileExtension: string
  fileSize: number
}

export interface FileUploadData {
  status: 'SUCCESS'
  message: string
  data: FileUploadResponse
}
