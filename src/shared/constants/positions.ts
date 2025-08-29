export const POSITIONS = {
  개발: {
    icon: '/icons/developer.svg',
    label: '개발',
  },
  기획: {
    icon: '/icons/planner.svg',
    label: '기획',
  },
  디자인: {
    icon: '/icons/designer.svg',
    label: '디자인',
  },
  // 기존 키들도 유지
  개발자: {
    icon: '/icons/developer.svg',
    label: '개발자',
  },
  기획자: {
    icon: '/icons/planner.svg',
    label: '기획자',
  },
  디자이너: {
    icon: '/icons/designer.svg',
    label: '디자이너',
  },
} as const

export type PositionType = keyof typeof POSITIONS
