// Domain types for Clubs
export interface ClubActivity {
  hashtag: string
  activityName: string
  activityDescribe: string
  imageUrl: string | null
  activityOrder: number
}

export interface ClubSchedule {
  periodValue: number
  period: string
  activity: string
}

export interface ClubDetailsData {
  club: {
    name: string
    slogan: string
    bio: string
    establishment: number
    totalParticipant: number
    operation: number
    offline: string | null
    online: string | null
    location: string | null
    address: string | null
    recruiting: boolean
    imageUrl: string | null
    process: string[]
  }
  activities: ClubActivity[]
  clubSchedules: ClubSchedule[]
}

export interface ClubsListItem {
  clubId: number
  clubName: string
  description: string
  categories: string[]
  logoUrl: string
  isRecruiting: boolean
}

export interface PageableSort {
  sorted: boolean
  unsorted: boolean
  empty: boolean
}

export interface Pageable {
  pageNumber: number
  pageSize: number
  sort: PageableSort
  offset: number
  paged: boolean
  unpaged: boolean
}

export interface ClubsPage {
  content: ClubsListItem[]
  pageable: Pageable
  totalPages: number
  totalElements: number
  last: boolean
  size: number
  number: number
  sort: PageableSort
  numberOfElements: number
  first: boolean
  empty: boolean
}

export interface ClubRecruitsData {
  recruitmentPart: string[]
  qualification: string
  recruitmentSchedule: string
  activityPeriod: string
  activityMethod: string
  activityFee: string
  homepageUrl: string
  noticeUrl: string | null
}

export interface ApiResponse<T> {
  status: 'SUCCESS' | 'ERROR'
  message: string
  data: T
}

export type ClubRecruitsResponse = ApiResponse<ClubRecruitsData>
