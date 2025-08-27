export interface DataSort {
  sorted: boolean
  unsorted: boolean
  empty: boolean
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

export interface Subscribe {
  categories: string[]
  clubId: number
  clubName: string
  description: string
  isRecruiting: boolean
  logoUrl: string
}

export interface SubscribePage {
  content: Subscribe[]
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

export interface SubscribeResponse {
  data: SubscribePage
  message: string
  status: string
}

export interface SubscriptionStatusResponse {
  data: boolean
  message: string
  status: string
}
