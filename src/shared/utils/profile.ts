import { POSITIONS, type PositionType } from '@/shared/constants/positions'

export const getProfileImage = (position: string): string | null => {
  return POSITIONS[position as PositionType]?.icon || null
}
