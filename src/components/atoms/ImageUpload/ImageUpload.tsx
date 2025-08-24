'use client'

import React, { useRef, useState, useCallback } from 'react'
import { cn } from '@/shared/utils/cn'

// 지원되는 파일 형식 (컴포넌트 밖에서 정의하여 리렌더링 시 재생성 방지)
const ACCEPTED_TYPES = ['image/jpeg', 'image/jpg', 'image/png']
const ACCEPTED_EXTENSIONS = ['.jpg', '.jpeg', '.png']

interface ImageUploadProps {
  /**
   * 선택된 파일이 변경될 때 호출되는 콜백
   * @param file - 선택된 파일 또는 null (파일이 제거된 경우)
   */
  onFileChange: (file: File | null) => void

  /**
   * 기본값으로 표시할 이미지 URL
   */
  defaultImageUrl?: string

  /**
   * 컴포넌트의 추가 클래스명
   */
  className?: string

  /**
   * 업로드 영역의 높이 (기본값: h-32)
   */
  height?: string

  /**
   * 비활성화 여부
   */
  disabled?: boolean

  /**
   * 에러 상태
   */
  error?: string
}

export default function ImageUpload({
  onFileChange,
  defaultImageUrl,
  className,
  height = 'h-32',
  disabled = false,
  error,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    defaultImageUrl || null,
  )
  const [isDragOver, setIsDragOver] = useState(false)

  // 파일 검증
  const validateFile = useCallback((file: File): boolean => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      alert('JPG, JPEG, PNG 형식의 이미지만 업로드 가능합니다.')
      return false
    }

    // 파일 크기 제한 (5MB)
    const maxSize = 5 * 1024 * 1024
    if (file.size > maxSize) {
      alert('파일 크기는 5MB 이하여야 합니다.')
      return false
    }

    return true
  }, [])

  // 파일 처리
  const handleFile = useCallback(
    (file: File) => {
      if (!validateFile(file)) return

      // 미리보기 URL 생성
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      onFileChange(file)
    },
    [onFileChange, validateFile],
  )

  // 파일 선택 창 열기
  const handleClick = () => {
    if (disabled) return
    fileInputRef.current?.click()
  }

  // 파일 선택 시
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleFile(file)
    }
  }

  // 드래그 앤 드롭 이벤트
  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
    if (!disabled) {
      setIsDragOver(true)
    }
  }

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    setIsDragOver(false)

    if (disabled) return

    const files = event.dataTransfer.files
    if (files.length > 0) {
      handleFile(files[0])
    }
  }

  // 이미지 제거
  const handleRemove = (event: React.MouseEvent) => {
    event.stopPropagation()
    setPreviewUrl(null)
    onFileChange(null)

    // 파일 input 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className={cn('relative', className)}>
      {/* 숨겨진 파일 input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_EXTENSIONS.join(',')}
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled}
        aria-label="이미지 파일 선택"
      />

      {/* 업로드 영역 */}
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          'relative rounded-2xl border border-solid border-grey-color-2 cursor-pointer transition-all duration-200',
          height,
          {
            'border-primary-color bg-primary-color/5': isDragOver && !disabled,
            'border-failure-color': error,
            'cursor-not-allowed opacity-50': disabled,
            'hover:border-grey-color-3': !disabled && !error && !isDragOver,
          },
        )}
      >
        {previewUrl ? (
          // 미리보기 이미지
          <div className="relative size-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt="업로드된 이미지"
              className="size-full object-cover rounded-2xl"
            />

            {/* 제거 버튼 */}
            {!disabled && (
              <button
                onClick={handleRemove}
                className="absolute top-2 right-2 w-6 h-6 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                type="button"
                aria-label="이미지 제거"
              >
                ×
              </button>
            )}
          </div>
        ) : (
          // 업로드 영역
          <div className="flex flex-col items-center justify-center gap-3 p-4 size-full">
            {/* 업로드 아이콘 */}
            <div className="w-6 h-6">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-full h-full text-grey-color-3"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7,10 12,5 17,10" />
                <line x1="12" y1="5" x2="12" y2="15" />
              </svg>
            </div>

            {/* 안내 텍스트 */}
            <div className="text-center">
              <p className="typo-body-3-m text-grey-color-3">
                후기 썸네일 이미지를 등록해주세요.
              </p>
              <p className="typo-caption-m text-grey-color-3 mt-1">
                JPG, PNG 형식 | 최대 5MB
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 에러 메시지 */}
      {error && (
        <p className="text-failure-color typo-caption-m mt-1">{error}</p>
      )}
    </div>
  )
}
