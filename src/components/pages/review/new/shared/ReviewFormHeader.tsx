'use client'

import React from 'react'
import { Control, FieldValues, Path } from 'react-hook-form'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/atoms/Select'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/molecules/Form'
import { useClubsList } from '@/features/clubs/queries'

interface ReviewFormHeaderProps<T extends FieldValues> {
  control: Control<T>
  selectedClubId?: number
}

export default function ReviewFormHeader<T extends FieldValues>({
  control,
  selectedClubId,
}: ReviewFormHeaderProps<T>) {
  const { data: clubsData } = useClubsList({ size: 100 })

  const selectedClub = clubsData?.content.find(
    (club) => club.clubId === selectedClubId,
  )

  return (
    <div className="flex flex-col desktop:flex-row gap-4">
      {/* 프로필 아이콘 + IT 동아리명 (모바일에서 가로 배치) */}
      <div className="flex flex-row items-start gap-4">
        {/* 프로필 아이콘 */}
        <div className="flex items-center">
          {selectedClub?.logoUrl ? (
            <img
              src={selectedClub.logoUrl}
              alt={selectedClub.clubName}
              className="w-16 h-16 rounded-full object-cover flex-shrink-0"
            />
          ) : (
            <div className="w-16 h-16 bg-grey-color-1 rounded-full flex-shrink-0" />
          )}
        </div>

        {/* IT 동아리명 - 모바일에서 아이콘 옆에 배치 */}
        <FormField
          control={control}
          name={'clubId' as Path<T>}
          render={({ field }) => (
            <FormItem className="flex-1 gap-[6px]">
              <FormLabel className="typo-button-m text-grey-color-4">
                IT 동아리명
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  value={field.value?.toString() || ''}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="-" />
                  </SelectTrigger>
                  <SelectContent>
                    {clubsData?.content.map((club) => (
                      <SelectItem
                        key={club.clubId}
                        value={club.clubId.toString()}
                      >
                        {club.clubName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* 지원 파트 */}
      <FormField
        control={control}
        name={'jobId' as Path<T>}
        render={({ field }) => (
          <FormItem className="flex-1 gap-[6px]">
            <FormLabel className="typo-button-m text-grey-color-4">
              지원 파트
            </FormLabel>
            <FormControl>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                value={field.value?.toString() || ''}
              >
                <SelectTrigger>
                  <SelectValue placeholder="-" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">PM/PO</SelectItem>
                  <SelectItem value="2">프로덕트 디자이너</SelectItem>
                  <SelectItem value="3">프론트엔드 개발자</SelectItem>
                  <SelectItem value="4">백엔드 개발자</SelectItem>
                  <SelectItem value="5">iOS 개발자</SelectItem>
                  <SelectItem value="6">안드로이드 개발자</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* 지원 기수 */}
      <FormField
        control={control}
        name={'generation' as Path<T>}
        render={({ field }) => (
          <FormItem className="flex-1 gap-[6px]">
            <FormLabel className="typo-button-m text-grey-color-4">
              지원 기수
            </FormLabel>
            <FormControl>
              <Select
                onValueChange={(value) => field.onChange(Number(value))}
                value={field.value?.toString() || ''}
              >
                <SelectTrigger>
                  <SelectValue placeholder="-" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 30 }, (_, i) => i + 1).map((gen) => (
                    <SelectItem key={gen} value={gen.toString()}>
                      {gen}기
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  )
}
