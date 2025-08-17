import { z } from 'zod'
import { UserCategory } from '@/features/user/types'

export const appValidation = {
  email: (message: string) => z.email(message),
  name: (message: string) => z.string().min(1, message),
  nickname: (message: string) =>
    z.string().min(1, message).max(10, '최대 10글자까지 입력 가능해요.'),
  category: (message: string) => z.enum(UserCategory, { message }),
}
