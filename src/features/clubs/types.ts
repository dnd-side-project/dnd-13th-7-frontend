// Domain types for Clubs
export interface ClubActivity {
  hashtag: string
  activityName: string
  activityDescribe: string
  imageUrl: string | null
  order: number
}

export interface ClubSchedule {
  periodValue: number
  period: string
  activity: string
}

export interface ClubDetailsData {
  name: string
  position: string | null
  slogan: string
  bio: string
  establishment: number
  total_participant: number
  operation: number
  offline: string
  online: string
  location: string
  address: string
  recruiting: boolean
  imageUrl: string
  recruitmentPart: string | null
  activities: ClubActivity[]
  schedules: ClubSchedule[]
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
