'use client'

import * as React from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

type CheckState = boolean | 'indeterminate'

export type CheckItemProps = {
  label: React.ReactNode
  checked?: CheckState
  defaultChecked?: boolean
  onChange?: (checked: CheckState) => void
  id?: string
  className?: string
}

const CheckItem: React.FC<CheckItemProps> = ({
  label,
  checked,
  defaultChecked,
  onChange,
  id,
  className,
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
        onCheckedChange={(v) => onChange?.(v === true)}
      />
      <div className="flex-1">
        <div className={cn('typo-button-m leading-5', className)}>{label}</div>
      </div>
    </label>
  )
}

export { CheckItem, type CheckState }
