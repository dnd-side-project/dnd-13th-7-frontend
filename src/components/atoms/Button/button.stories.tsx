import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import '@/styles/globals.css'
import { Button } from './button'

const meta = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outlined-primary', 'outlined-secondary'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: 'boolean',
    },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { children: '후기 작성' },
}

export const OutlinedPrimary: Story = {
  args: { variant: 'outlined-primary', children: '후기 작성' },
}

export const OutlinedSecondary: Story = {
  args: { variant: 'outlined-secondary', children: '후기 작성' },
}

export const Medium: Story = {
  args: { size: 'medium', children: '후기 작성' },
}

export const Large: Story = {
  args: { size: 'large', children: '후기 작성' },
}

export const Disabled: Story = {
  args: { disabled: true, children: '후기 작성' },
}
