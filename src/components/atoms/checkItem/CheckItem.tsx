'use client'

import * as React from 'react'
import { Checkbox } from '@/components/atoms/checkbox'
import { cn } from '@/shared/utils/cn'

type CheckState = boolean | 'indeterminate'

export type CheckItemProps = {
  label: React.ReactNode
  checked?: CheckState
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
  id?: string
  className?: string
  showArrow?: boolean
  onArrowClick?: () => void
}

const CheckItem: React.FC<CheckItemProps> = ({
  label,
  checked,
  defaultChecked,
  onChange,
  id,
  className,
  showArrow = false,
  onArrowClick,
}) => {
  const autoId = React.useId()
  const inputId = id ?? `${autoId}`
  const checkboxClass = cn(
    'h-5 w-5 shrink-0 rounded-[3px] border-[1.5px]',
    'bg-[var(--moyeoit-white)] border-[var(--moyeoit-light-4)]',
    'focus-visible:ring-[var(--moyeoit-main-1)] ',
    'data-[state=checked]:bg-[var(--moyeoit-main-1)] data-[state=checked]:border-[var(--moyeoit-main-1)] data-[state=checked]:text-[var(--moyeoit-white)]',
    'data-[state=indeterminate]:bg-[var(--moyeoit-main-1)] data-[state=indeterminate]:border-[var(--moyeoit-main-1)] data-[state=indeterminate]:text-[var(--moyeoit-white)]',
  )

  return (
    <label
      htmlFor={inputId}
      className={cn(
        'flex w-full h-[21px] select-none items-center gap-2 cursor-pointer typo-button-m',
      )}
    >
      <Checkbox
        id={inputId}
        checked={checked}
        defaultChecked={defaultChecked}
        className={checkboxClass}
        onCheckedChange={onChange}
      />
      <div className="flex-1">
        <div className={cn('typo-button-m leading-5', className)}>{label}</div>
      </div>
      {showArrow && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            onArrowClick?.()
          }}
          className="text-[var(--moyeoit-grey-3)] hover:text-[var(--moyeoit-grey-4)] transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      )}
    </label>
  )
}

CheckItem.displayName = 'CheckItem'
export { CheckItem, type CheckState }
