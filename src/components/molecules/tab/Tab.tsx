'use client'

import * as React from 'react'
import { Tabs, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import { cn } from '@/shared/utils/cn'

export type Tab = 'recruit' | 'name' | 'popular'
export type TabOption = { label: string; value: Tab; disabled?: boolean }

const OPTIONS: TabOption[] = [
  { label: '모집중', value: 'recruit' },
  { label: '이름순', value: 'name' },
  { label: '인기순', value: 'popular' },
]

export type TabProps = {
  options?: TabOption[]
  value?: Tab
  defaultValue?: Tab
  onChange?: (value: Tab) => void
  className?: string
}

function Tab({
  options = OPTIONS,
  value,
  defaultValue = options[2].value,
  onChange,
  className,
}: TabProps) {
  const isControlled = value !== undefined
  const [inner, setInner] = React.useState<Tab>(defaultValue!)
  const current = (isControlled ? value : inner) as Tab
  const set = (value: Tab) => {
    if (!isControlled) setInner(value)
    onChange?.(value)
  }

  return (
    <div className={className}>
      <div className="desktop:block ">
        <Tabs value={current} onValueChange={(value) => set(value as Tab)}>
          <TabsList className="h-10 rounded-full bg-white p-1 text-typo-button-m text-grey-color-2 w-full flex">
            {options.map((o) => (
              <TabsTrigger
                key={o.value}
                value={o.value}
                disabled={o.disabled}
                className={cn(
                  'h-[33px] rounded-full px-4 py-1.5 text-sm flex-1',
                  'data-[state=active]:bg-light-color-2 data-[state=active]:typo-button-b  data-[state=active]:text-black',
                )}
              >
                {o.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  )
}

export { Tab }
