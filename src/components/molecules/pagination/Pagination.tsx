import * as React from 'react'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  MoreHorizontalIcon,
} from 'lucide-react'
import { Button } from '@/components/atoms'
import { cn } from '@/shared/utils'

function Pagination({ className, ...props }: React.ComponentProps<'nav'>) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    />
  )
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn('flex flex-row items-center gap-2', className)}
      {...props}
    />
  )
}

function PaginationItem({ ...props }: React.ComponentProps<'li'>) {
  return <li data-slot="pagination-item" {...props} />
}

type PaginationLinkProps = {
  isActive?: boolean
  isDisabled?: boolean
} & Pick<React.ComponentProps<typeof Button>, 'size'> &
  React.ComponentProps<'a'>

function PaginationLink({
  className,
  isActive,
  isDisabled,
  size = 'none',
  ...props
}: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? 'page' : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      data-disabled={isDisabled}
      className={cn(
        'inline-flex items-center justify-center gap-2.5 rounded-[100px] transition-colors',
        'w-8 h-8 p-[6px]',
        'font-medium text-[13px] leading-[1.5] transition-colors',
        isActive
          ? 'bg-main-color-1 text-white-color'
          : isDisabled
            ? 'text-light-color-4 cursor-not-allowed'
            : 'text-black-color hover:bg-light-color-3 active:bg-light-color-3 focus:bg-light-color-3',
        className,
      )}
      {...props}
    />
  )
}

function PaginationPrevious({
  className,
  isDisabled,
  ...props
}: React.ComponentProps<typeof PaginationLink> & { isDisabled?: boolean }) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="none"
      isDisabled={isDisabled}
      className={cn('w-8 h-8 p-0', className)}
      {...props}
    >
      <ChevronLeftIcon
        className={cn('size-[18px]', isDisabled && 'text-light-color-4')}
      />
    </PaginationLink>
  )
}

function PaginationNext({
  className,
  isDisabled,
  ...props
}: React.ComponentProps<typeof PaginationLink> & { isDisabled?: boolean }) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="none"
      isDisabled={isDisabled}
      className={cn('w-8 h-8 p-0', className)}
      {...props}
    >
      <ChevronRightIcon
        className={cn('size-[18px]', isDisabled && 'text-light-color-4')}
      />
    </PaginationLink>
  )
}

function PaginationEllipsis({
  className,
  ...props
}: React.ComponentProps<'span'>) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn('flex size-9 items-center justify-center', className)}
      {...props}
    >
      <MoreHorizontalIcon className="size-4" />
      <span className="sr-only">More pages</span>
    </span>
  )
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}
