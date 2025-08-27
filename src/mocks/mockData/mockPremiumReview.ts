export interface PremiumReview {
  id: number
  title: string
  description: string
  meta: string[]
  likes: number
  comments: number
}

export const premiumReviews: PremiumReview[] = [
  {
    id: 1,
    title:
      '코딩의 신에서 1년간 활동한 후기코딩의 신에서 1년간 활동한 후기코딩의 신에서 1년간 활동한 후기',
    description:
      'Java와 Spring을 체계적으로 배울 수 있어서 정말 좋았습니다.Java와 Spring을 체계적으로 배울 수 있어서 정말 좋았습니다.',
    meta: ['코딩의 신', '개발'],
    likes: 128,
    comments: 24,
  },
  {
    id: 2,
    title: '픽셀 크래프터 프로젝트 경험담',
    description: '실제 서비스를 만들어보면서 실무 경험을 쌓을 수 있었어요.',
    meta: ['픽셀 크래프터', '디자인', '개발'],
    likes: 95,
    comments: 18,
  },
  {
    id: 3,
    title: '데이터 다이버에서 배운 것들',
    description:
      'Python으로 데이터 분석을 하면서 인사이트를 도출하는 방법을 배웠습니다.',
    meta: ['데이터 다이버', '데이터'],
    likes: 156,
    comments: 32,
  },
  {
    id: 4,
    title: '알고리즘 정복자 스터디 후기',
    description: '백준 문제를 함께 풀면서 알고리즘 실력이 크게 향상되었습니다.',
    meta: ['알고리즘 정복자', '알고리즘'],
    likes: 203,
    comments: 45,
  },
]
