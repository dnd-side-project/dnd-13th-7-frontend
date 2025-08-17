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
export type Group = { title: string; options: Option[] }

function summarize(labels: string[], maxShown = 2, empty = '선택') {
  if (labels.length === 0) return empty
  if (labels.length <= maxShown) return labels.join(', ')
  return `${labels.slice(0, maxShown).join(', ')} 외 ${labels.length - maxShown}`
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

  const setSelected = (next: string[]) => {
    if (!isControlled) setInner(next)
    onChange?.(next)
  }

  const toggleOne = (val: string, next: boolean) => {
    setSelected(
      next
        ? [...new Set([...selected, val])]
        : selected.filter((v) => v !== val),
    )
  }

  const allOptions = React.useMemo(
    () => groups.flatMap((g) => g.options.map((o) => o.value)),
    [groups],
  )
  const total = allOptions.length
  const count = selected.length
  const showAllLabel = count === total

  const byGroup = groups.map((g) => {
    const vals = g.options.map((o) => o.value)
    const selInGroup = vals.filter((v) => selected.includes(v))
    const st: CheckState =
      selInGroup.length === 0
        ? false
        : selInGroup.length === vals.length
          ? true
          : 'indeterminate'
    const toggleGroup = (next: boolean) => {
      const rest = selected.filter((v) => !vals.includes(v))
      setSelected(next ? [...rest, ...vals] : rest)
    }
    return { group: g, state: st, toggleGroup }
  })

  const valueToLabel = new Map(
    groups.flatMap((g) => g.options.map((o) => [o.value, o.label] as const)),
  )
  const hasSelected = selected.length > 0
  const selectedLabels = selected.map((v) => valueToLabel.get(v) || v)
  const summary = showAllLabel
    ? '전체'
    : summarize(selectedLabels, maxSummary, placeholder)

  const triggerClass = cn(
    triggerVariants({ variant: hasSelected ? 'solid' : variant }),
    open ? 'bg-[var(--moyeoit-white)]' : 'bg-[var(--moyeoit-light-2)]',
  )

  return (
    <div className={cn('w-72', className)}>
      <Popover open={open} onOpenChange={setOpen}>
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
          className="w-[174px] mt-2 border border-[var(--moyeoit-light-3)] shadow-none bg-[var(--moyeoit-white)] typo-button-m whitespace-nowrap py-4 space-y-4 rounded-2xl"
        >
          <div className="px-2 ">
            <CheckItem
              label="전체"
              checked={showAllLabel}
              onChange={(next) => setSelected(next ? allOptions : [])}
            />
          </div>

          <div className="px-2 space-y-4">
            {byGroup.map(({ group }) => (
              <div key={group.title} className="space-y-2">
                <div className="text-[var(--moyeoit-grey-4)] typo-caption-m">
                  {group.title}
                </div>
                <div className="space-y-2 ">
                  {group.options.map((o) => (
                    <CheckItem
                      key={o.value}
                      label={o.label}
                      checked={selected.includes(o.value)}
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
