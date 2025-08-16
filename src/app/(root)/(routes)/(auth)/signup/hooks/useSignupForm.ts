import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { appValidation } from '@/shared/configs/appValidation'

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
  marketing: z.boolean().transform((val) => val || false),
  newsletter: z.boolean().transform((val) => val || false),
})

export type SignupFormType = z.infer<typeof SignupFormSchema>

export const useSignupForm = () => {
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
    mode: 'onSubmit',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 전체 동의 상태 계산
  const allAgreed = AGREEMENT_ITEMS.every(
    (item) => form.watch(item.id as keyof SignupFormType) === true,
  )

  const requiredAgreed = AGREEMENT_ITEMS.filter((item) => item.required).every(
    (item) => form.watch(item.id as keyof SignupFormType) === true,
  )

  // 전체 동의 변경 핸들러
  const handleAllAgreementChange = (checked: boolean) => {
    console.log(form.getValues())
    AGREEMENT_ITEMS.forEach((item) => {
      form.setValue(item.id as keyof SignupFormType, checked)
    })
    // 동의 항목 변경 후 폼 검증 트리거
    form.trigger()
  }

  const onSubmit = async (data: SignupFormType) => {
    setIsSubmitting(true)
    try {
      //   await signup(data)
      console.log(data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    form,
    onSubmit,
    isSubmitting,
    allAgreed,
    requiredAgreed,
    handleAllAgreementChange,
  }
}
