import type { Meta, StoryObj } from '@storybook/nextjs'
import { Tag } from './Tag'

const meta = {
  title: 'Atoms/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  args: {
    size: 'small',
  },
  argTypes: {
    kind: {
      control: 'inline-radio',
      options: ['premiumReview', 'generalReview', 'clubDetail'],
    },
    size: {
      control: 'inline-radio',
      options: ['small', 'large'],
    },
    color: {
      control: 'inline-radio',
      options: ['white', 'lightPurple', 'purple'],
    },
    label: { control: 'text' },
  },
} satisfies Meta<typeof Tag>

export default meta
type Story = StoryObj<typeof meta>

const Row: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div
    style={{
      display: 'flex',
      gap: 12,
      flexWrap: 'wrap',
      background: '#f6f6f6',
      padding: 16,
      borderRadius: 8,
    }}
  >
    {children}
  </div>
)

export const PremiumSmall: Story = {
  args: {
    size: 'large',
  },

  name: 'Premium/small',

  render: () => {
    return (
      <Row>
        <Tag kind="premiumReview" size="small" label="기획" />
        <Tag kind="premiumReview" size="small" label="개발" />
        <Tag kind="premiumReview" size="small" label="디자인" />
        <Tag kind="premiumReview" size="small" label="기타" />
      </Row>
    )
  },
}
export const PremiumLarge: Story = {
  name: 'Premium/large',
  render: () => {
    return (
      <Row>
        <Tag kind="premiumReview" size="large" label="기획" />
        <Tag kind="premiumReview" size="large" label="개발" />
        <Tag kind="premiumReview" size="large" label="디자인" />
        <Tag kind="premiumReview" size="large" label="기타" />
      </Row>
    )
  },
}

export const ClubDetailSmall: Story = {
  name: 'ClubDetail/small',
  render: () => {
    return (
      <Row>
        {' '}
        <Tag kind="clubDetail" size="small" color="white" label="WHITE" />
        <Tag
          kind="clubDetail"
          size="small"
          color="lightPurple"
          label="LIGHT PURPLE"
        />
        <Tag kind="clubDetail" size="small" color="purple" label="PURPLE" />
      </Row>
    )
  },
}

export const ClubDetailLarge: Story = {
  name: 'ClubDetail/large',
  render: () => {
    return (
      <Row>
        <Tag kind="clubDetail" size="large" color="white" label="WHITE" />
        <Tag
          kind="clubDetail"
          size="large"
          color="lightPurple"
          label="LIGHT PURPLE"
        />
        <Tag kind="clubDetail" size="large" color="purple" label="PURPLE" />
      </Row>
    )
  },
}

export const GeneralSmall: Story = {
  name: 'General/small',
  render: () => {
    return (
      <Row>
        <Tag
          kind="clubDetail"
          size="small"
          color="lightPurple"
          label="LIGHT PURPLE"
        />
      </Row>
    )
  },
}

export const GeneralLarge: Story = {
  name: 'General/large',
  render: () => {
    return (
      <Row>
        {' '}
        <Tag
          kind="clubDetail"
          size="large"
          color="lightPurple"
          label="LIGHT PURPLE"
        />
      </Row>
    )
  },
}
