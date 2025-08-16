import { z } from 'zod'
import { UserCategory } from '@/features/user/types'

export const appValidation = {
  email: (message: string) => z.email(message),
  name: (message: string) => z.string().min(1, message),
  nickname: (message: string) => z.string().min(1, message),
  category: (message: string) => z.enum(UserCategory, { message }),
}
