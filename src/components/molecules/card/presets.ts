import { CardSizePreset } from './types'

export const PRESET: Record<
  CardSizePreset,
  { cardWidth: string; ImageWidth: string; ratio: string; ImageSize: string }
> = {
  col3Desktop: {
    cardWidth: '17.625rem',
    ImageWidth: '10.5rem',
    ratio: '3/2',
    ImageSize: '17.625rem',
  },
  col4Desktop: {
    cardWidth: '15.8125rem',
    ImageWidth: '10rem',
    ratio: '3/2',
    ImageSize: '15.8125rem',
  },
  homeReviewDesktop: {
    cardWidth: '10.9375rem',
    ImageWidth: '7.5rem',
    ratio: '3/2',
    ImageSize: '10.9375rem',
  },
  homeReviewPhone: {
    cardWidth: '7.0625rem',
    ImageWidth: '6.5rem',
    ratio: '113/108',
    ImageSize: '7.0625rem',
  },
  col4Phone: {
    cardWidth: '9.625rem',
    ImageWidth: '8.75rem',
    ratio: '3/2',
    ImageSize: '9.625rem',
  },
}
