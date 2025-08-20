'use client'

import * as React from 'react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { DummyProfileIcon, SearchMainIcon } from '@/assets/icons'
import { Button } from '@/components/atoms/Button'
import { Input } from '@/components/atoms/Input'
import { useClubsList } from '@/features/clubs/queries'
import useDebouncedValue from '@/shared/hooks/useDebouncedValue'
import { cn } from '@/shared/utils/cn'

export interface SearchCoreProps {
  className?: string
  placeholder?: string
  autoFocus?: boolean
  /**
   * Callback when a result item is selected.
   */
  onSelect?: (clubId: number) => void
  /**
   * Render prop for each result item. If not provided, a simple row is rendered.
   */
  renderItem?: (item: {
    clubId: number
    clubName: string
    description: string
  }) => React.ReactNode
  /**
   * Optional empty state node to show when there are no results.
   */
  emptyState?: React.ReactNode
  /**
   * Optional controlled keyword. If omitted, internal state is used.
   */
  keyword?: string
  onKeywordChange?: (value: string) => void
}

export function SearchCore(props: SearchCoreProps) {
  const {
    className,
    placeholder = '검색어를 입력해주세요',
    autoFocus,
    onSelect,
    renderItem,
    emptyState,
    keyword: controlledKeyword,
    onKeywordChange,
  } = props
  const [inputValue, setInputValue] = useState(controlledKeyword ?? '')

  useEffect(() => {
    if (controlledKeyword !== undefined && controlledKeyword !== inputValue) {
      setInputValue(controlledKeyword)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [controlledKeyword])

  const debouncedInput = useDebouncedValue(inputValue, 300)
  useEffect(() => {
    if (!onKeywordChange) return
    if (controlledKeyword === debouncedInput) return
    onKeywordChange(debouncedInput)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInput])

  const { data, isLoading } = useClubsList(
    debouncedInput
      ? { page: 0, size: 10, search: debouncedInput }
      : { page: 0, size: 10 },
  )

  const items = data?.content ?? []

  return (
    <div
      className={cn(
        'flex flex-col gap-6 w-full max-w-[675px] mx-auto',
        className,
      )}
    >
      <div className="h-12 rounded-full bg-white-color flex items-center justify-between border border-main-color-1 px-4 py-3">
        <Input
          autoFocus={autoFocus}
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          aria-label="search"
          className="bg-transparent border-none"
        />
        <Image src={SearchMainIcon} alt="search" width={24} height={24} />
      </div>

      <div className="desktop:min-h-[340px] max-desktop:max-h-[calc(100vh-200px)] overflow-auto">
        {isLoading ? (
          <div></div>
        ) : items.length === 0 ? (
          (emptyState ?? (
            <div className="flex flex-col gap-2 items-center justify-center">
              <p className="typo-title-3 max-desktop:typo-body-1-b text-grey-color-5 px-1 py-2">
                검색 결과가 없어요
              </p>
              <div className="flex flex-col items-center justify-center mb-4">
                <p className="typo-button-m max-desktop:typo-caption-m text-grey-color-3">
                  찾으시는 IT 동아리가 없나요?
                </p>
                <p className="typo-button-m max-desktop:typo-caption-m text-grey-color-3">
                  요청해주시면 빠르게 확인해드릴게요.
                </p>
              </div>
              <Button variant="solid" size="small">
                <span className="typo-caption-m">IT 동아리 등록 요청</span>
              </Button>
            </div>
          ))
        ) : (
          <ul className="flex flex-col divide-light-color-4">
            {items.map((it) => (
              <li key={it.clubId}>
                <Button
                  variant="none"
                  className="w-full text-left p-4 justify-start hover:bg-light-color-2 focus:bg-light-color-2 transition-colors hover:ring-0 focus:ring-0 focus:outline-none focus:ring-offset-0 [&:hover_.typo-body-3-2-b]:text-black-color [&:focus_.typo-body-3-2-b]:text-black-color"
                  onClick={() => onSelect?.(it.clubId)}
                >
                  {renderItem ? (
                    renderItem({
                      clubId: it.clubId,
                      clubName: it.clubName,
                      description: it.description,
                    })
                  ) : (
                    <div className="flex flex-row items-center gap-2">
                      <Image
                        src={DummyProfileIcon}
                        alt={it.clubName}
                        width={32}
                        height={32}
                      />
                      <span className="typo-body-3-2-b text-grey-color-4">
                        {it.clubName}
                      </span>
                    </div>
                  )}
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default SearchCore
