'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
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
import { OAuthCallbackParams } from '@/features/oauth/types'
import { USER_CATEGORY_TO_ID, UserCategory } from '@/features/user/types'
import AppPath from '@/shared/configs/appPath'
import { useAuth } from '@/shared/providers/auth-provider'
import { useSignupForm, AGREEMENT_ITEMS } from './hooks/useSignupForm'

export default function SignupPage() {
  const { setUserFromOAuth } = useAuth()
  const router = useRouter()

  const { form, onSubmit, isSubmitting, allAgreed, handleAllAgreementChange } =
    useSignupForm()

  // 뒤로가기 막기 기능
  useEffect(() => {
    // 뒤로가기 이벤트 핸들러
    const handlePopState = (event: PopStateEvent) => {
      // 확인 메시지 표시
      const shouldLeave = window.confirm(
        '회원가입이 진행 중입니다. 정말로 페이지를 떠나시겠습니까?',
      )

      if (!shouldLeave) {
        // 사용자가 머물기를 원하면 현재 URL로 다시 이동
        window.history.pushState(
          { page: 'signup', timestamp: Date.now() },
          '',
          window.location.pathname + window.location.search,
        )
      }
    }

    // 페이지 새로고침/닫기 시 경고
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      const message = '회원가입 정보가 사라질 수 있습니다.'
      event.preventDefault()
      event.returnValue = message
      return message
    }

    // 기존 히스토리 비우고 새로 시작
    const clearHistoryAndSetup = () => {
      // 현재 URL로 히스토리 대체 (기존 히스토리 제거)
      window.history.replaceState(
        { page: 'signup', initial: true },
        '',
        window.location.pathname + window.location.search,
      )

      // 더미 히스토리 항목 추가 (뒤로가기 감지용)
      window.history.pushState(
        { page: 'signup', timestamp: Date.now() },
        '',
        window.location.pathname + window.location.search,
      )
    }

    // 히스토리 초기화 및 설정
    clearHistoryAndSetup()

    // 이벤트 리스너 등록
    window.addEventListener('popstate', handlePopState)
    window.addEventListener('beforeunload', handleBeforeUnload)

    // 클린업
    return () => {
      window.removeEventListener('popstate', handlePopState)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  // OAuth 데이터가 있는지 확인하고 처리
  useEffect(() => {
    const oauthDataStr = sessionStorage.getItem('oauth_data')
    if (oauthDataStr) {
      try {
        const oauthData: OAuthCallbackParams = JSON.parse(oauthDataStr)

        const isActive = oauthData.active === 'true'

        if (isActive) {
          // 이미 활성화된 계정이면 바로 로그인 처리
          setUserFromOAuth(oauthData)
          router.push(AppPath.home())
          return
        }

        // OAuth 데이터에서 이메일 정보가 있다면 폼에 미리 채우기
        // 새로운 프로세스에서는 이메일 정보가 쿼리 파라미터에 포함되지 않으므로 주석 처리
        // if (oauthData.email) {
        //   form.setValue('email', oauthData.email)
        // }
      } catch (error) {
        console.error('OAuth 데이터 파싱 에러:', error)
        sessionStorage.removeItem('oauth_data')
      }
    }
  }, [setUserFromOAuth, router, form])

  const handleArrowClick = (_itemId: string) => {
    // 약관 상세 페이지로 이동하는 로직
  }

  return (
    <main className="flex flex-col gap-2 px-5 h-full w-full max-w-[360px] mx-auto pt-20 pb-12">
      <h2 className="mb-24 text-center typo-title-1">회원가입</h2>
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
                      <SelectItem value={String(USER_CATEGORY_TO_ID.DESIGN)}>
                        {UserCategory.DESIGN}
                      </SelectItem>
                      <SelectItem
                        value={String(USER_CATEGORY_TO_ID.DEVELOPMENT)}
                      >
                        {UserCategory.DEVELOPMENT}
                      </SelectItem>
                      <SelectItem value={String(USER_CATEGORY_TO_ID.PLANNING)}>
                        {UserCategory.PLANNING}
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
                className="font-semibold typo-body-m"
              />
              <div className="h-px mt-3 bg-light-color-4" />
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
