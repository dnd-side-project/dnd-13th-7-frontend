import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import '@/styles/globals.css'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from './Select'

const meta = {
  title: 'Atoms/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    onValueChange: { action: 'value changed' },
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger>
        <SelectValue placeholder="옵션을 선택하세요" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">옵션 1</SelectItem>
        <SelectItem value="option2">옵션 2</SelectItem>
        <SelectItem value="option3">옵션 3</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const Small: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger size="sm">
        <SelectValue placeholder="작은 크기" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="small1">작은 옵션 1</SelectItem>
        <SelectItem value="small2">작은 옵션 2</SelectItem>
        <SelectItem value="small3">작은 옵션 3</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const WithGroups: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger>
        <SelectValue placeholder="카테고리를 선택하세요" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>음식</SelectLabel>
          <SelectItem value="korean">한식</SelectItem>
          <SelectItem value="chinese">중식</SelectItem>
          <SelectItem value="japanese">일식</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>음료</SelectLabel>
          <SelectItem value="coffee">커피</SelectItem>
          <SelectItem value="tea">차</SelectItem>
          <SelectItem value="juice">주스</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
}

export const Disabled: Story = {
  render: (args) => (
    <Select {...args} disabled>
      <SelectTrigger>
        <SelectValue placeholder="비활성화된 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="disabled1">비활성화 옵션 1</SelectItem>
        <SelectItem value="disabled2">비활성화 옵션 2</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const WithDefaultValue: Story = {
  render: (args) => (
    <Select {...args} defaultValue="option2">
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">첫 번째 옵션</SelectItem>
        <SelectItem value="option2">두 번째 옵션 (기본값)</SelectItem>
        <SelectItem value="option3">세 번째 옵션</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const LongOptions: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger>
        <SelectValue placeholder="긴 옵션들을 선택하세요" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="very-long-option-1">
          이것은 매우 긴 옵션 텍스트입니다. 여러 줄에 걸쳐 표시될 수 있습니다.
        </SelectItem>
        <SelectItem value="very-long-option-2">
          또 다른 매우 긴 옵션 텍스트입니다. 이 옵션도 길어서 줄바꿈이 필요할 수
          있습니다.
        </SelectItem>
        <SelectItem value="short">짧은 옵션</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const WithError: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger aria-invalid="true">
        <SelectValue placeholder="에러 상태" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">옵션 1</SelectItem>
        <SelectItem value="option2">옵션 2</SelectItem>
        <SelectItem value="option3">옵션 3</SelectItem>
      </SelectContent>
    </Select>
  ),
}
