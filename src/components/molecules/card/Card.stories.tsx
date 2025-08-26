import { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Card } from './index'
import type { CardSizePreset, Orientation } from './types'

const meta = {
  title: 'Molecule/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      control: 'select',
      options: [
        'col3Desktop',
        'col4Desktop',
        'homeReviewDesktop',
        'homeReviewPhone',
        'col4Phone',
      ] satisfies CardSizePreset[],
    },

    orientation: {
      control: 'radio',
      options: ['vertical', 'horizontal'] as Orientation[],
    },
    border: { control: 'boolean' },
    thumbNailWidth: { control: 'text' },
    gap: { control: 'text' },
    pad: { control: 'text' },
  },
  args: {
    size: 'col3Desktop' as CardSizePreset,
    orientation: 'vertical' as Orientation,
    border: true,
    gap: '0.75rem',
    pad: '1rem',
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

const title = '세로형 카드 타이틀 세로형 카드 타이틀 세로형 카드 타이틀 세로형'
const description =
  '두 줄까지 설명이 들어갑니다.두 줄까지 설명이 들어갑니다.두 줄까지 설명이 들어갑니다.두 줄까지 설명이 들어갑니다.'

const VerticalRender = (args: React.ComponentProps<typeof Card>) => (
  <Card {...args} className="group cursor-pointer">
    <Card.Image
      logoUrl="/images/thumbnail.png"
      alt="동아리 썸네일"
      interactive
      className="transition-transform duration-300 ease-out"
    />
    <Card.Content>
      <Card.Title className="mt-3">{title}</Card.Title>
      <Card.Description>{description}</Card.Description>
      <Card.Meta part="기획 · 개발 · 디자인" />
    </Card.Content>
  </Card>
)

const HorizontalRender = (args: React.ComponentProps<typeof Card>) => (
  <Card {...args} className="group cursor-pointer">
    <Card.Image
      logoUrl="/images/thumbnail.png"
      alt="동아리 썸네일"
      interactive
      className="transition-transform duration-300 ease-out"
    />
    <Card.Content>
      <Card.Title>{title}</Card.Title>
      <Card.Description>{description}</Card.Description>
      <Card.Meta kind="지원편" clubName="모여잇" clubYear="2024" part="FE" />
      <Card.Stats likes={20} comments={5} />
    </Card.Content>
  </Card>
)

export const Col3Desktop: Story = {
  name: 'Vertical / col3Desktop',
  args: { size: 'col3Desktop', orientation: 'vertical', border: true },
  render: VerticalRender,
}

export const Col4Desktop: Story = {
  name: 'Vertical / col4Desktop',
  args: { size: 'col4Desktop', orientation: 'vertical', border: true },
  render: VerticalRender,
}

export const HomeReviewDesktop: Story = {
  name: 'Vertical / homeReviewDesktop',
  args: { size: 'homeReviewDesktop', orientation: 'vertical', border: true },
  render: VerticalRender,
}

export const Col4Phone: Story = {
  name: 'Vertical / col4Phone',
  args: { size: 'col4Phone', orientation: 'vertical', border: true },
  render: VerticalRender,
}

export const HomeReviewPhone: Story = {
  name: 'Horizontal / homeReviewPhone',
  args: { size: 'homeReviewPhone', orientation: 'horizontal', border: true },
  render: HorizontalRender,
}

export const HorizontalCol3Desktop: Story = {
  name: 'Horizontal / col3Desktop',
  args: {
    size: 'col3Desktop',
    orientation: 'horizontal',
    border: true,
    thumbNailWidth: '10rem',
  },
  render: HorizontalRender,
}

export const HorizontalCol4Desktop: Story = {
  name: 'Horizontal / col4Desktop',
  args: { size: 'col4Desktop', orientation: 'horizontal', border: true },
  render: HorizontalRender,
}
