'use client'

import * as React from 'react'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { cn } from '@/shared/utils/cn'

export type SideOption = { label: string; value: string; disabled?: boolean }

type SideBarProps = {
  options: SideOption[]
  value?: string
  defaultValue?: string
  onChange?: (v: string) => void
  className?: string
}

export function SideBar({
  options,
  value,
  defaultValue,
  onChange,
  className,
}: SideBarProps) {
  const controlled = value !== undefined

  return (
    <div className=" typo-body-1-2-sb py-14 px-5 ">
      <RadioGroup.Root
        value={value}
        defaultValue={defaultValue}
        onValueChange={(v) => onChange?.(v)}
        className={cn('flex flex-col w-44 h-full', className)}
      >
        {options.map((o) => {
          const id = `${o.value}`
          return (
            <div key={o.value} className="relative">
              <RadioGroup.Item
                id={id}
                value={o.value}
                disabled={o.disabled}
                className="peer sr-only"
              />
              <label
                htmlFor={id}
                className={cn(
                  'block px-5 py-3 w-full h-13',
                  'cursor-pointer select-none',
                  // 선택 상태
                  'peer-data-[state=checked]:bg-white rounded-[4px]',
                )}
              >
                {o.label}
              </label>
            </div>
          )
        })}
      </RadioGroup.Root>
    </div>
  )
}
