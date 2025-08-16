export enum UserCategory {
  PLANNING = '기획',
  DESIGN = '디자인',
  DEVELOPMENT = '개발',
}

export type UserCategoryType = keyof typeof UserCategory
