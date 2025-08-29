'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { CheckItem, CheckState } from '@/components/atoms/checkItem'
import { Button } from '@/components/atoms/checkItem/button'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/atoms/popover'
import { cn } from '@/shared/utils/cn'

export type Option = { label: string; value: string }
export type Group = { title?: string; options: Option[] }

function summarize(labels: string[], maxShown = 2, empty = '선택') {
  if (labels.length === 0) return empty
  if (labels.length <= maxShown) return labels.join(',')
  return `${labels.slice(0, maxShown).join(',')} 외 ${labels.length - maxShown}`
}

const triggerVariants = cva(
  // 공통
  'justify-between border py-2 px-3 rounded-full gap-1',
  {
    variants: {
      variant: {
        outline:
          'border-[var(--moyeoit-light-3)] bg-[var(--moyeoit-light-2)] text-[var(--moyeoit-black)]',
        solid:
          'bg-[var(--moyeoit-main-3)] border-[var(--moyeoit-main-1)] text-[var(--moyeoit-main-1)]',
      },
    },
    defaultVariants: {
      variant: 'outline',
    },
  },
)

type TriggerVariantProps = VariantProps<typeof triggerVariants>

type Props = {
  groups: Group[]
  value?: string[]
  defaultValue?: string[]
  onChange?: (v: string[]) => void
  placeholder?: string
  maxSummary?: number
  className?: string
  variant?: TriggerVariantProps['variant']
}

const MultiDropDown: React.FC<Props> = ({
  groups,
  value,
  defaultValue = [],
  onChange,
  placeholder = '선택',
  maxSummary = 1,
  className,
  variant = 'outline',
}) => {
  const [open, setOpen] = React.useState(false)
  const isControlled = value !== undefined
  const [inner, setInner] = React.useState<string[]>(defaultValue)
  const selected = isControlled ? value! : inner

  // 디버깅용 로그
  console.log('MultiDropDown Props:', { value, isControlled, inner, selected })

  const allOptions = React.useMemo(
    () =>
      groups
        .flatMap((g) => g.options.map((o) => o.value))
        .filter((v) => v !== 'all'),
    [groups],
  )

  const valueToLabel = React.useMemo(
    () =>
      new Map(
        groups.flatMap((g) =>
          g.options.map((o) => [o.value, o.label] as const),
        ),
      ),
    [groups],
  )

  const setSelected = React.useCallback(
    (next: string[]) => {
      if (!isControlled) {
        setInner(next)
      }
      onChange?.(next)
    },
    [isControlled, onChange],
  )

  const toggleOne = React.useCallback(
    (val: string, next: boolean) => {
      console.log('toggleOne called:', { val, next, selected, allOptions })

      if (val === 'all' && next) {
        // "전체" 선택 시 모든 옵션 선택
        const newSelection = [...allOptions, 'all']
        setSelected(newSelection)
      } else if (val === 'all' && !next) {
        // "전체" 해제 시 모든 선택 해제
        setSelected([])
      } else {
        // 개별 옵션 선택/해제
        let newSelected: string[]

        if (next) {
          // 옵션 선택 시 - "all"이 있으면 제거하고 개별 옵션 추가
          newSelected = [...selected.filter((v) => v !== 'all'), val]
        } else {
          // 옵션 해제 시 - "all"이 있으면 제거하고 해당 옵션도 제거
          newSelected = selected.filter((v) => v !== val && v !== 'all')
        }

        // 모든 개별 옵션이 선택되었으면 "all" 추가
        if (newSelected.length === allOptions.length) {
          newSelected.push('all')
        }

        setSelected(newSelected)
      }
    },
    [selected, setSelected, allOptions],
  )

  const byGroup = React.useMemo(() => {
    return groups.map((g) => {
      const vals = g.options.map((o) => o.value)
      const selInGroup = vals.filter((v) => selected.includes(v))
      const st: CheckState =
        selInGroup.length === 0
          ? false
          : selInGroup.length === vals.length
            ? true
            : 'indeterminate'

      return { group: g, state: st, vals }
    })
  }, [groups, selected])

  const isAllSelected = selected.includes('all')
  const showAllLabel = isAllSelected
  const hasSelected = selected.length > 0
  const selectedLabels = React.useMemo(() => {
    if (isAllSelected) {
      return ['전체']
    }
    return selected.map((v) => valueToLabel.get(v) || v)
  }, [selected, valueToLabel, isAllSelected])

  const summary = React.useMemo(
    () =>
      showAllLabel
        ? '전체'
        : summarize(selectedLabels, maxSummary, placeholder),
    [showAllLabel, selectedLabels, maxSummary, placeholder],
  )

  const triggerClass = React.useMemo(
    () =>
      cn(
        triggerVariants({ variant: hasSelected ? 'solid' : variant }),
        open ? 'bg-[var(--moyeoit-white)]' : 'bg-[var(--moyeoit-light-2)]',
      ),
    [hasSelected, variant, open],
  )

  const handleOpenChange = React.useCallback((newOpen: boolean) => {
    setOpen(newOpen)

    if (!newOpen) {
      setTimeout(() => {}, 100)
    }
  }, [])

  React.useEffect(() => {
    return () => {
      setOpen(false)
    }
  }, [])

  return (
    <div className={cn('w-72', className)}>
      <Popover open={open} onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button className={triggerClass}>
            {summary}
            <span
              className={cn(
                'typo-button-m',
                selected.length > 0
                  ? 'text-[var(--moyeoit-main-1)]'
                  : 'text-[var(--moyeoit-grey-2)]',
              )}
            >
              {open ? <ChevronUp /> : <ChevronDown />}
            </span>
          </Button>
        </PopoverTrigger>

        <PopoverContent
          side="bottom"
          align="start"
          sideOffset={4}
          avoidCollisions={false}
          className="w-fit mt-2 border border-[var(--moyeoit-light-3)] shadow-none bg-[var(--moyeoit-white)] typo-button-m whitespace-nowrap p-4 space-y-4 rounded-2xl"
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <div className="space-y-4">
            {byGroup.map(({ group }) => (
              <div key={group.title || 'default'} className="space-y-2">
                {group.title && (
                  <div className="text-[var(--moyeoit-grey-4)] typo-caption-m">
                    {group.title}
                  </div>
                )}
                <div className="space-y-2 ">
                  {group.options.map((o) => (
                    <CheckItem
                      key={o.value}
                      label={o.label}
                      checked={
                        o.value === 'all'
                          ? selected.includes('all')
                          : selected.includes(o.value) ||
                            (selected.includes('all') &&
                              allOptions.includes(o.value))
                      }
                      onChange={(next) => toggleOne(o.value, next as boolean)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

MultiDropDown.displayName = 'MultiDropDown'
export { MultiDropDown }
