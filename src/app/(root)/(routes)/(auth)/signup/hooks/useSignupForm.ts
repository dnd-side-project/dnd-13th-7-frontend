import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { useUserActivate, USER_CATEGORY_TO_ID } from '@/features/user'
import AppPath from '@/shared/configs/appPath'
import { appValidation } from '@/shared/configs/appValidation'
import { useAuth } from '@/shared/providers/auth-provider'

// 동의 항목 타입 정의
export interface AgreementItem {
  id: string
  label: string
  required: boolean
  hasDetail?: boolean
}

export const AGREEMENT_ITEMS: AgreementItem[] = [
  { id: 'age', label: '만 14세 이상입니다', required: true },
  {
    id: 'terms',
    label: '서비스 이용약관에 동의합니다.',
    required: true,
    hasDetail: true,
  },
  {
    id: 'privacy',
    label: '개인정보 수집 및 이용에 동의합니다.',
    required: true,
    hasDetail: true,
  },
  {
    id: 'marketing',
    label: '마케팅 목적의 개인정보 수집 및 이용에 동의합니다.',
    required: false,
    hasDetail: true,
  },
  {
    id: 'newsletter',
    label: 'IT 활동 소식, 맞춤 활동 매칭 정보 받기 (이메일)',
    required: false,
  },
]

export const SignupFormSchema = z.object({
  email: appValidation.email('이메일을 입력해주세요.'),
  name: appValidation.name('이름을 입력해주세요.'),
  nickname: appValidation.nickname('닉네임을 입력해주세요.'),
  category: appValidation.category('분야를 선택해주세요.'),
  // 동의 항목들
  age: z.boolean().refine((val) => val === true, {
    message: '만 14세 이상입니다에 동의해주세요.',
  }),
  terms: z.boolean().refine((val) => val === true, {
    message: '서비스 이용약관에 동의해주세요.',
  }),
  privacy: z.boolean().refine((val) => val === true, {
    message: '개인정보 수집 및 이용에 동의해주세요.',
  }),
  // 선택적 동의 항목들 (동의하지 않아도 가입 가능)
  marketing: z.boolean().transform((val) => val || false),
  newsletter: z.boolean().transform((val) => val || false),
})

export type SignupFormType = z.infer<typeof SignupFormSchema>

export const useSignupForm = () => {
  const router = useRouter()
  const { login } = useAuth()
  const { mutate: activateUser, isPending: isActivating } = useUserActivate()

  const form = useForm<SignupFormType>({
    resolver: zodResolver(SignupFormSchema),
    defaultValues: {
      email: '',
      name: '',
      nickname: '',
      category: undefined,
      // 동의 항목들의 기본값 설정
      age: false,
      terms: false,
      privacy: false,
      marketing: false,
      newsletter: false,
    },
    mode: 'onBlur',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 전체 동의 상태 계산
  const allAgreed = AGREEMENT_ITEMS.every((item) =>
    form.watch(item.id as keyof SignupFormType),
  )

  // 전체 동의 변경 핸들러
  const handleAllAgreementChange = (checked: boolean) => {
    AGREEMENT_ITEMS.forEach((item) => {
      form.setValue(item.id as keyof SignupFormType, checked)
    })
    form.trigger()
  }

  const onSubmit = async (data: SignupFormType) => {
    setIsSubmitting(true)
    try {
      // OAuth 데이터가 있는지 확인
      const oauthDataStr = sessionStorage.getItem('oauth_data')
      let oauthData = null

      if (oauthDataStr) {
        try {
          oauthData = JSON.parse(oauthDataStr)
        } catch (error) {
          console.error('OAuth 데이터 파싱 에러:', error)
        }
      }

      console.log('회원가입 데이터:', data)
      console.log('OAuth 데이터:', oauthData)

      if (oauthData) {
        // OAuth 회원가입인 경우 - 사용자 활성화 API 호출
        const activateData = {
          nickname: data.nickname,
          job_id: Number(data.category),
          is_over_age: data.age,
          agree_terms_of_service: data.terms,
          agree_privacy_policy: data.privacy,
          agree_marketing_privacy: data.marketing,
          agree_event_notification: data.newsletter,
        }

        activateUser(activateData, {
          onSuccess: (response) => {
            console.log('사용자 활성화 성공:', response)

            // OAuth 토큰으로 최종 로그인 처리
            login(oauthData.accessToken, {
              id: parseInt(oauthData.userId),
              active: true, // 회원가입 완료 후 활성화
            })

            // OAuth 데이터 정리
            sessionStorage.removeItem('oauth_data')

            // 홈으로 이동
            router.push(AppPath.home())
          },
          onError: (error) => {
            console.error('사용자 활성화 실패:', error)
            // 에러 처리 (사용자에게 알림 등)
          },
        })
      } else {
        // 일반 회원가입인 경우 (현재는 지원하지 않음)
        console.log('일반 회원가입은 현재 지원하지 않습니다.')
        router.push(AppPath.login())
      }
    } catch (error) {
      console.error('회원가입 에러:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    form,
    onSubmit,
    isSubmitting: isSubmitting || isActivating,
    allAgreed,
    handleAllAgreementChange,
  }
}
