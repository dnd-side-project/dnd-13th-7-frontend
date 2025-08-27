import { z } from 'zod'

export const appValidation = {
  email: (message: string) => z.email(message),
  name: (message: string) => z.string().min(1, message),
  nickname: (message: string) =>
    z.string().min(1, message).max(10, '최대 10글자까지 입력 가능해요.'),
  category: (message: string) => z.string().min(1, message),

  // 공통 필드 validations
  rating: (message: string) => z.number().min(1, message).max(5),
  oneLineText: (maxLength: number, message?: string) =>
    z
      .string()
      .min(1, message || '내용을 입력해주세요')
      .max(maxLength, `${maxLength}자 이내로 입력해주세요`),
  longText: (minLength: number, maxLength: number) =>
    z
      .string()
      .min(minLength, `최소 ${minLength}자 이상 입력해주세요`)
      .max(maxLength, `${maxLength}자 이내로 입력해주세요`),
  requiredNumber: (message: string) => z.number({ message }),
  multipleChoice: (message: string) => z.array(z.number()).min(1, message),
}
