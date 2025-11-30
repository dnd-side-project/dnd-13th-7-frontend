import {
  Card as CardRoot,
  CardBookmark,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardImage,
  CardMeta,
  CardStats,
  CardTitle,
} from './Card'

export type CardCompound = typeof CardRoot & {
  Image: typeof CardImage
  Bookmark: typeof CardBookmark
  Content: typeof CardContent
  Header: typeof CardHeader
  Title: typeof CardTitle
  Description: typeof CardDescription
  Meta: typeof CardMeta
  Stats: typeof CardStats
  Footer: typeof CardFooter
}

export const Card = Object.assign(CardRoot, {
  Image: CardImage,
  Bookmark: CardBookmark,
  Content: CardContent,
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Meta: CardMeta,
  Stats: CardStats,
  Footer: CardFooter,
}) as CardCompound

export {
  CardImage,
  CardBookmark,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardMeta,
  CardStats,
  CardFooter,
}

export { MobileCard } from './MobileCard'
export { default as CardOverlay } from './CardOverlay'
