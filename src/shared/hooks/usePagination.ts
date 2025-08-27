import { useState, useMemo, useCallback } from 'react'

interface UsePaginationProps {
  totalPages: number
  maxVisiblePages?: number
  initialPage?: number
  onPageChange?: (page: number) => void
}

interface UsePaginationReturn {
  currentPage: number
  visiblePages: number[]
  isPreviousDisabled: boolean
  isNextDisabled: boolean
  goToPage: (page: number) => void
  goToPrevious: () => void
  goToNext: () => void
  goToFirst: () => void
  goToLast: () => void
}

export function usePagination({
  totalPages,
  maxVisiblePages = 5,
  initialPage = 1,
  onPageChange,
}: UsePaginationProps): UsePaginationReturn {
  const [currentPage, setCurrentPage] = useState(initialPage)

  // 현재 페이지 주변의 보여줄 페이지 번호들을 계산
  const visiblePages = useMemo(() => {
    const pages: number[] = []
    const halfVisible = Math.floor(maxVisiblePages / 2)

    let startPage = Math.max(1, currentPage - halfVisible)
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    // 끝 페이지에서 시작 페이지를 조정
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    return pages
  }, [currentPage, totalPages, maxVisiblePages])

  // 이전/다음 버튼 비활성화 상태
  const isPreviousDisabled = currentPage <= 1
  const isNextDisabled = currentPage >= totalPages

  // 페이지 변경 핸들러
  const goToPage = useCallback(
    (page: number) => {
      if (page >= 1 && page <= totalPages && page !== currentPage) {
        setCurrentPage(page)
        onPageChange?.(page)
      }
    },
    [currentPage, totalPages, onPageChange],
  )

  const goToPrevious = useCallback(() => {
    if (!isPreviousDisabled) {
      goToPage(currentPage - 1)
    }
  }, [currentPage, isPreviousDisabled, goToPage])

  const goToNext = useCallback(() => {
    if (!isNextDisabled) {
      goToPage(currentPage + 1)
    }
  }, [currentPage, isNextDisabled, goToPage])

  const goToFirst = useCallback(() => {
    goToPage(1)
  }, [goToPage])

  const goToLast = useCallback(() => {
    goToPage(totalPages)
  }, [goToPage, totalPages])

  return {
    currentPage,
    visiblePages,
    isPreviousDisabled,
    isNextDisabled,
    goToPage,
    goToPrevious,
    goToNext,
    goToFirst,
    goToLast,
  }
}
