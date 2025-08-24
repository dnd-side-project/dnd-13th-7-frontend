import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
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

      // TODO: 실제 회원가입 API 호출
      // const signupResult = await signupApi({
      //   ...data,
      //   oauthToken: oauthData?.access_token
      // })

      // 임시로 성공 처리 (실제로는 API 응답을 사용)
      if (oauthData) {
        // OAuth 토큰으로 최종 로그인 처리
        login(oauthData.access_token, {
          id: oauthData.user_id,
          active: true, // 회원가입 완료 후 활성화
        })

        // OAuth 데이터 정리
        sessionStorage.removeItem('oauth_data')

        // 홈으로 이동
        router.push('/')
      } else {
        // 일반 회원가입인 경우
        console.log('일반 회원가입 완료')
        router.push('/login')
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
    isSubmitting,
    allAgreed,
    handleAllAgreementChange,
  }
}
