import React from 'react'
import { usePagination } from '@/shared/hooks'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from './Pagination'

interface PaginationWithHookProps {
  totalPages: number
  maxVisiblePages?: number
  initialPage?: number
  onPageChange?: (page: number) => void
}

export function PaginationWithHook({
  totalPages,
  maxVisiblePages = 5,
  initialPage = 1,
  onPageChange,
}: PaginationWithHookProps) {
  const {
    currentPage,
    visiblePages,
    isPreviousDisabled,
    isNextDisabled,
    goToPage,
    goToPrevious,
    goToNext,
  } = usePagination({
    totalPages,
    maxVisiblePages,
    initialPage,
    onPageChange,
  })

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-center">
        <p className="text-body-2 text-grey-color-5">
          현재 페이지: {currentPage} / {totalPages}
        </p>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              isDisabled={isPreviousDisabled}
              onClick={(e) => {
                e.preventDefault()
                goToPrevious()
              }}
            />
          </PaginationItem>

          {visiblePages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault()
                  goToPage(page)
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              isDisabled={isNextDisabled}
              onClick={(e) => {
                e.preventDefault()
                goToNext()
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
