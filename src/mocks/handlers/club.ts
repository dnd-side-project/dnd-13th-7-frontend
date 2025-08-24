import { http, HttpResponse } from 'msw'
import {
  ClubDetailsData,
  ClubRecruitsData,
  ClubsListItem,
  ClubsPage,
  Pageable,
  PageableSort,
} from '@/features/clubs/types'
import { ApiResponse } from '@/shared/types/api'

// Mock data
const clubs: ClubsListItem[] = [
  {
    clubId: 1,
    clubName: '알고리즘 동아리 ALGO',
    description: '알고리즘 스터디 및 대회 준비',
    categories: ['학술', '개발'],
    logoUrl: '/logos/algo.png',
    isRecruiting: true,
  },
  {
    clubId: 2,
    clubName: '디자인 스튜디오 D:ST',
    description: 'UI/UX 디자인 스터디와 프로젝트',
    categories: ['디자인', '학술'],
    logoUrl: '/logos/dst.png',
    isRecruiting: false,
  },
  {
    clubId: 3,
    clubName: '사진동아리 SNAP',
    description: '출사와 사진 보정 워크샵',
    categories: ['예술', '취미'],
    logoUrl: '/logos/snap.png',
    isRecruiting: true,
  },
  {
    clubId: 4,
    clubName: '밴드부 RE:PLAY',
    description: '정기공연과 합주',
    categories: ['음악', '공연'],
    logoUrl: '/logos/replay.png',
    isRecruiting: true,
  },
  {
    clubId: 5,
    clubName: '봉사동아리 HANDS',
    description: '지역사회 봉사활동',
    categories: ['봉사'],
    logoUrl: '/logos/hands.png',
    isRecruiting: false,
  },
  {
    clubId: 6,
    clubName: '게임개발 G-DEV',
    description: '인디게임 제작 스터디',
    categories: ['개발', '게임'],
    logoUrl: '/logos/gdev.png',
    isRecruiting: true,
  },
  {
    clubId: 7,
    clubName: '영화감상 CINEMA',
    description: '영화 상영 및 리뷰',
    categories: ['문화', '취미'],
    logoUrl: '/logos/cinema.png',
    isRecruiting: false,
  },
  {
    clubId: 8,
    clubName: '테니스 ACE',
    description: '주 2회 코트 연습',
    categories: ['체육'],
    logoUrl: '/logos/ace.png',
    isRecruiting: true,
  },
  {
    clubId: 9,
    clubName: '요리 COOKers',
    description: '요리 레시피 공유와 실습',
    categories: ['취미', '요리'],
    logoUrl: '/logos/cook.png',
    isRecruiting: false,
  },
  {
    clubId: 10,
    clubName: '문예창작 PEN',
    description: '시/소설 창작 모임',
    categories: ['문학'],
    logoUrl: '/logos/pen.png',
    isRecruiting: true,
  },
  {
    clubId: 11,
    clubName: '로보틱스 ROBO',
    description: '로봇 하드웨어/소프트웨어 연구',
    categories: ['공학', '개발'],
    logoUrl: '/logos/robo.png',
    isRecruiting: true,
  },
  {
    clubId: 12,
    clubName: '마케팅 MKT',
    description: '디지털 마케팅 및 브랜딩',
    categories: ['경영', '학술'],
    logoUrl: '/logos/mkt.png',
    isRecruiting: false,
  },
]

const detailsById: Record<number, ClubDetailsData> = {
  1: {
    name: '알고리즘 동아리 ALGO',
    position: null,
    slogan: 'Think. Solve. Optimize.',
    bio: '알고리즘 문제풀이와 대회 준비를 함께 합니다.',
    establishment: 2012,
    total_participant: 45,
    operation: 1,
    offline: '주 1회 세미나',
    online: '디스코드 상시 스터디',
    location: '공학관 312호',
    address: '서울시 광진구 능동로 209',
    recruiting: true,
    imageUrl: '/images/clubs/algo/cover.jpg',
    recruitmentPart: '알고리즘/자료구조',
    activities: [
      {
        hashtag: '#PS',
        activityName: '주간 스터디',
        activityDescribe: '백준/프로그래머스 문제풀이',
        imageUrl: null,
        order: 1,
      },
    ],
    schedules: [
      { periodValue: 1, period: '3월', activity: '신입 OT' },
      { periodValue: 2, period: '4~6월', activity: '봄학기 스터디' },
    ],
  },
  2: {
    name: '디자인 스튜디오 D:ST',
    position: null,
    slogan: 'Design for Everyone',
    bio: 'UI/UX 중심의 디자인 스터디와 실무 스킬 향상.',
    establishment: 2018,
    total_participant: 28,
    operation: 1,
    offline: '격주 스튜디오 세션',
    online: '피그마 협업/슬랙',
    location: '디자인관 201호',
    address: '서울시 광진구 능동로 209',
    recruiting: false,
    imageUrl: '/images/clubs/dst/cover.jpg',
    recruitmentPart: 'UI/UX, 브랜딩',
    activities: [
      {
        hashtag: '#Figma',
        activityName: '프로토타이핑 워크샵',
        activityDescribe: '피그마 활용법 공유',
        imageUrl: null,
        order: 1,
      },
    ],
    schedules: [
      { periodValue: 1, period: '상시', activity: '포트폴리오 리뷰' },
    ],
  },
}

// 기본 템플릿으로 세부/모집정보가 없는 ID는 1번 데이터를 복제하여 변형
for (const club of clubs) {
  if (!detailsById[club.clubId]) {
    detailsById[club.clubId] = {
      ...detailsById[1],
      name: club.clubName,
      recruiting: club.isRecruiting,
      imageUrl: `/images/clubs/${club.clubId}/cover.jpg`,
    }
  }
}

const recruitsById: Record<number, ClubRecruitsData> = {
  1: {
    clubName: '알고리즘 동아리 ALGO',
    clubLogoUrl: '/logos/algo.png',
    recruitmentParts: ['알고리즘', '자료구조'],
    qualification: '프로그래밍 기초 지식',
    recruitmentSchedule: '상반기(3~4월), 하반기(9~10월)',
    activityPeriod: '1년(연장 가능)',
    activityMethod: '온/오프라인 병행',
    activityFee: '월 5,000원',
    homepageUrl: 'https://example.com/algo',
    noticeUrl: 'https://example.com/algo/notice',
  },
  2: {
    clubName: '디자인 스튜디오 D:ST',
    clubLogoUrl: '/logos/dst.png',
    recruitmentParts: ['UI/UX', '브랜딩'],
    qualification: '기초 디자인 툴 사용 가능',
    recruitmentSchedule: '비정기',
    activityPeriod: '학기 단위',
    activityMethod: '오프라인 중심',
    activityFee: '월 10,000원',
    homepageUrl: 'https://example.com/dst',
    noticeUrl: 'https://example.com/dst/notice',
  },
}

for (const club of clubs) {
  if (!recruitsById[club.clubId]) {
    recruitsById[club.clubId] = {
      ...recruitsById[1],
      clubName: club.clubName,
      clubLogoUrl: club.logoUrl,
    }
  }
}

function buildPageableSort(): PageableSort {
  return { sorted: false, unsorted: true, empty: true }
}

function buildPageable(pageNumber: number, pageSize: number): Pageable {
  return {
    pageNumber,
    pageSize,
    sort: buildPageableSort(),
    offset: pageNumber * pageSize,
    paged: true,
    unpaged: false,
  }
}

const clubHandlers = [
  // GET /api/v1/clubs (목록, 검색/페이지네이션)
  http.get('*/api/v1/clubs', ({ request }) => {
    const url = new URL(request.url)
    const search = (url.searchParams.get('search') || '').trim().toLowerCase()

    const filtered = search
      ? clubs.filter(
          (c) =>
            c.clubName.toLowerCase().includes(search) ||
            c.description.toLowerCase().includes(search) ||
            c.categories.some((cat) => cat.toLowerCase().includes(search)),
        )
      : clubs

    // 단순히 5개 데이터만 반환
    const content = filtered.slice(0, 5)

    const body: ApiResponse<{ content: ClubsListItem[] }> = {
      status: 'OK',
      message: 'success',
      data: {
        content,
      },
    }

    return HttpResponse.json(body)
  }),

  // GET /api/v1/clubs/:id/details (상세)
  http.get('*/api/v1/clubs/:clubId/details', ({ params }) => {
    const id = Number(params.clubId)
    const details = detailsById[id]
    if (!details) {
      const notFound: ApiResponse<null> = {
        status: 'NOT_FOUND',
        message: 'Club not found',
        data: null,
      }
      return HttpResponse.json(notFound, { status: 404 })
    }
    const body: ApiResponse<ClubDetailsData> = {
      status: 'OK',
      message: 'success',
      data: details,
    }
    return HttpResponse.json(body)
  }),

  // GET /api/v1/clubs/:id/recruits (모집정보)
  http.get('*/api/v1/clubs/:clubId/recruits', ({ params }) => {
    const id = Number(params.clubId)
    const recruits = recruitsById[id]
    if (!recruits) {
      const notFound: ApiResponse<null> = {
        status: 'NOT_FOUND',
        message: 'Recruit info not found',
        data: null,
      }
      return HttpResponse.json(notFound, { status: 404 })
    }
    const body: ApiResponse<ClubRecruitsData> = {
      status: 'OK',
      message: 'success',
      data: recruits,
    }
    return HttpResponse.json(body)
  }),
]

export default clubHandlers
