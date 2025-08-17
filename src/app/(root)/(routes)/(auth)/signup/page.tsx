'use client'

import React from 'react'
import { Button } from '@/components/atoms/Button'
import { Input } from '@/components/atoms/Input'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/atoms/Select'
import { CheckItem } from '@/components/atoms/checkItem'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/molecules/Form'
import { UserCategory } from '@/features/user/types'
import { useSignupForm, AGREEMENT_ITEMS } from './hooks/useSignupForm'

export default function SignupPage() {
  const { form, onSubmit, isSubmitting, allAgreed, handleAllAgreementChange } =
    useSignupForm()

  const handleArrowClick = (itemId: string) => {
    // 약관 상세 페이지로 이동하는 로직
    console.log(`약관 상세 보기: ${itemId}`)
  }

  return (
    <main className="flex flex-col gap-2 px-5 h-full w-full max-w-[360px] mx-auto pt-20 pb-12">
      <h2 className="typo-title-1 text-center mb-24">회원가입</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="typo-button-m text-grey-color-4">
                  이메일
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="p-3"
                    aria-invalid={!!form.formState.errors.email}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="typo-button-m text-grey-color-4">
                  이름
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="p-3"
                    aria-invalid={!!form.formState.errors.name}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="nickname"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="typo-button-m text-grey-color-4">
                  닉네임
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="p-3"
                    placeholder="모여잇에서 사용하실 닉네임을 입력해주세요."
                    aria-invalid={!!form.formState.errors.nickname}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="typo-button-m text-grey-color-4">
                  분야
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger
                      className="p-3"
                      aria-invalid={!!form.formState.errors.category}
                    >
                      <SelectValue placeholder="분야 선택하기" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={UserCategory.DESIGN}>
                        디자인
                      </SelectItem>
                      <SelectItem value={UserCategory.DEVELOPMENT}>
                        개발
                      </SelectItem>
                      <SelectItem value={UserCategory.PLANNING}>
                        기획
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 동의 섹션 */}
          <div>
            <div className="mb-3">
              <CheckItem
                label="전체 동의"
                checked={allAgreed}
                onChange={handleAllAgreementChange}
                className="typo-body-m font-semibold"
              />
              <div className="h-px bg-light-color-4 mt-3" />
            </div>

            <div className="space-y-3">
              {AGREEMENT_ITEMS.map((item) => (
                <FormField
                  key={item.id}
                  name={
                    item.id as
                      | 'age'
                      | 'terms'
                      | 'privacy'
                      | 'marketing'
                      | 'newsletter'
                  }
                  render={({ field }) => (
                    <FormItem className="space-y-0">
                      <FormControl>
                        <CheckItem
                          label={
                            <span>
                              <span className="typo-caption-m text-grey-color-3">
                                ({item.required ? '필수' : '선택'})
                              </span>{' '}
                              <span className="typo-caption-m text-grey-color-3">
                                {item.label}
                              </span>
                            </span>
                          }
                          checked={field.value}
                          onChange={(checked) => {
                            field.onChange(checked)
                            form.trigger()
                          }}
                          showArrow={item.hasDetail}
                          onArrowClick={() => handleArrowClick(item.id)}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </div>

          <div className="w-full my-3 max-desktop:sticky max-desktop:bottom-5 max-desktop:left-0 max-desktop:right-0 max-desktop:bg-light-color-2 max-desktop:border-none">
            <Button
              type="submit"
              disabled={isSubmitting || !form.formState.isValid}
              size="medium"
              variant="solid"
              className="w-full"
            >
              가입하기
            </Button>
          </div>
        </form>
      </Form>
    </main>
  )
}
