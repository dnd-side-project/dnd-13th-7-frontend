import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import '@/styles/globals.css'
import { Input } from './Input'

const meta = {
  title: 'Atoms/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search', 'file'],
    },
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    'aria-invalid': { control: 'boolean' },
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    type: 'text',
    placeholder: 'PLACEHOLDER',
  },
}

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: '비밀번호',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: '비활성화됨',
  },
}

export const Invalid: Story = {
  args: {
    placeholder: '유효하지 않은 값',
    'aria-invalid': true,
    defaultValue: 'wrong value',
  },
}

export const WithValue: Story = {
  args: {
    defaultValue: '기본값',
  },
}
