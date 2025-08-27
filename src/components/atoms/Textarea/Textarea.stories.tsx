import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import '@/styles/globals.css'
import { Textarea } from './Textarea'

const meta = {
  title: 'Atoms/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    disabled: { control: 'boolean' },
    placeholder: { control: 'text' },
    'aria-invalid': { control: 'boolean' },
    rows: { control: 'number' },
    cols: { control: 'number' },
  },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: '내용을 입력하세요',
    rows: 4,
  },
}

export const WithValue: Story = {
  args: {
    defaultValue: '이미 입력된 텍스트입니다.\n여러 줄로 작성할 수 있습니다.',
    rows: 4,
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: '비활성화됨',
    rows: 4,
  },
}

export const Invalid: Story = {
  args: {
    placeholder: '유효하지 않은 값',
    'aria-invalid': true,
    defaultValue: '잘못된 입력값',
    rows: 4,
  },
}

export const Large: Story = {
  args: {
    placeholder: '큰 텍스트 영역',
    rows: 8,
    cols: 50,
    className: 'h-48',
  },
}

export const Small: Story = {
  args: {
    placeholder: '작은 텍스트 영역',
    rows: 2,
    cols: 30,
  },
}
