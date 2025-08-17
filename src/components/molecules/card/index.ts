import { Card as CardRoot } from './Card'
import { CardContent } from './CardContent'
import { CardDescription } from './CardDescription'
import { CardFooter } from './CardFooter'
import { CardHeader } from './CardHeader'
import { CardImage } from './CardImage'
import { CardMeta } from './CardMeta'
import { CardStats } from './CardStats'
import { CardTitle } from './CardTitle'

export type CardCompound = typeof CardRoot & {
  Image: typeof CardImage
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
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardMeta,
  CardStats,
  CardFooter,
}
