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
  http.get('/api/v1/clubs', ({ request }) => {
    const url = new URL(request.url)
    const page = parseInt(url.searchParams.get('page') || '0')
    const size = parseInt(url.searchParams.get('size') || '10')
    const sort = url.searchParams.get('sort') || 'popular'
    const field = url.searchParams.get('field')
    const part = url.searchParams.get('part')
    const way = url.searchParams.get('way')
    const target = url.searchParams.get('target')

    // // Filter by field (category)
    // let filteredClubs = clubs
    // if (field && field !== 'all') {
    //   filteredClubs = filteredClubs.filter((club) =>
    //     club.categories.some((cat) =>
    //       cat.toLowerCase().includes(field.toLowerCase()),
    //     ),
    //   )
    // }

    // // Filter by part (직군)
    // if (part && part !== 'all') {
    //   const partArray = part.split(',')
    //   filteredClubs = filteredClubs.filter((club) =>
    //     partArray.some((p) =>
    //       club.categories.some((cat) =>
    //         cat.toLowerCase().includes(p.toLowerCase()),
    //       ),
    //     ),
    //   )
    // }

    // // Filter by way (활동 방식)
    // if (way && way !== 'all') {
    //   const wayArray = way.split(',')
    //   filteredClubs = filteredClubs.filter((club) =>
    //     wayArray.some((w) =>
    //       club.description.toLowerCase().includes(w.toLowerCase()),
    //     ),
    //   )
    // }

    // // Filter by target (모집 대상)
    // if (target && target !== 'all') {
    //   const targetArray = target.split(',')
    //   filteredClubs = filteredClubs.filter((club) =>
    //     targetArray.some((t) =>
    //       club.description.toLowerCase().includes(t.toLowerCase()),
    //     ),
    //   )
    // }

    // // Sort clubs (최적화: 불필요한 복사 제거)
    // if (sort === 'recruit') {
    //   filteredClubs.sort((a, b) => {
    //     if (a.isRecruiting !== b.isRecruiting) {
    //       return a.isRecruiting ? -1 : 1
    //     }
    //     return a.clubName.localeCompare(b.clubName)
    //   })
    // } else if (sort === 'name') {
    //   filteredClubs.sort((a, b) => a.clubName.localeCompare(b.clubName))
    // } else if (sort === 'popular') {
    //   filteredClubs.sort((a, b) => a.clubId - b.clubId)
    // }

    // 임시 데이터 (mockClubs 주석처리로 인한 임시 해결책)
    const content: ClubsListItem[] = []
    const totalElements = 0
    const totalPages = 1
    const last = true

    const pagePayload: ClubsPage = {
      content,
      pageable: buildPageable(page, size),
      totalPages,
      totalElements,
      last,
      size,
      number: page,
      sort: buildPageableSort(),
      numberOfElements: content.length,
      first: page === 0,
      empty: content.length === 0,
    }

    const body: ApiResponse<ClubsPage> = {
      status: 'SUCCESS',
      message: '동아리 목록 조회에 성공하였습니다.',
      data: pagePayload,
    }

    return HttpResponse.json(body)
  }),

  // GET /api/v1/clubs (목록, 검색/페이지네이션)
  http.get('*/api/v1/clubs', ({ request }) => {
    const url = new URL(request.url)
    const search = (url.searchParams.get('search') || '').trim().toLowerCase()

    // 임시 데이터 (mockClubs 주석처리로 인한 임시 해결책)
    const content: ClubsListItem[] = []

    const body: ApiResponse<{ content: ClubsListItem[] }> = {
      status: 'SUCCESS',
      message: '동아리 목록 조회에 성공하였습니다.',
      data: {
        content,
      },
    }

    return HttpResponse.json(body)
  }),

  // // GET /api/v1/clubs/:id/details (상세)
  // http.get('*/api/v1/clubs/:clubId/details', ({ params }) => {
  //   const id = Number(params.clubId)
  //   const details = detailsById[id]
  //   if (!details) {
  //     const notFound: ApiResponse<null> = {
  //       status: 'NOT_FOUND',
  //       message: 'Club not found',
  //       data: null,
  //     }
  //     return HttpResponse.json(notFound, { status: 404 })
  //   }
  //   const body: ApiResponse<ClubDetailsData> = {
  //     status: 'SUCCESS',
  //     message: '동아리 상세 정보 조회에 성공하였습니다.',
  //     data: details,
  //   }
  //   return HttpResponse.json(body)
  // }),

  // GET /api/v1/clubs/:id/recruits (모집정보)
  // http.get('*/api/v1/clubs/:clubId/recruits', ({ params }) => {
  //   const id = Number(params.clubId)
  //   const recruits = recruitsById[id]
  //   if (!recruits) {
  //     const notFound: ApiResponse<null> = {
  //       status: 'NOT_FOUND',
  //       message: 'Recruit info not found',
  //       data: null,
  //     }
  //     return HttpResponse.json(notFound, { status: 404 })
  //   }
  //   const body: ApiResponse<ClubRecruitsData> = {
  //     status: 'SUCCESS',
  //     message: '조회에 성공하였습니다.',
  //     data: recruits,
  //   }
  //   return HttpResponse.json(body)
  // }),
]

export default clubHandlers
