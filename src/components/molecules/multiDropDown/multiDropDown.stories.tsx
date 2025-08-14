import { Meta, StoryObj } from '@storybook/nextjs-vite'
import {
  MultiDropDown,
  type Group,
} from '@/components/molecules/multiDropDown/MultiDropDown'

const Groups: Group[] = [
  {
    title: '기획/디자인',
    options: [
      { label: 'PM/PO', value: 'pm po' },
      { label: '프로덕트 디자이너', value: 'product designer' },
    ],
  },
  {
    title: '개발',
    options: [
      { label: '백엔드 개발자', value: 'backend' },
      { label: '프론트엔드 개발자', value: 'frontend' },
      { label: '안드로이드 개발자', value: 'android' },
      { label: 'IOS 개발자', value: 'ios' },
    ],
  },
]

const allValues = Groups.flatMap((group) =>
  group.options.map((option) => option.value),
)

const meta = {
  title: 'Molecules/MultiDropDown',
  component: MultiDropDown,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['outline', 'solid'],
    },
    placeholder: { control: 'text' },
    maxSummary: { control: { type: 'number', min: 1, max: 5, step: 1 } },
    onChange: { action: 'changed' },
  },
  args: {
    groups: Groups,
    placeholder: '선택',
    maxSummary: 2,
    variant: 'outline',
  },
} satisfies Meta<typeof MultiDropDown>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  name: '기본 (선택 없음)',
  args: {},
}

export const TwoSelected: Story = {
  name: '다중 선택',
  args: {
    defaultValue: ['pm po', 'backend'],
  },
}

export const AllSelected: Story = {
  name: '전체 선택',
  args: {
    defaultValue: allValues,
  },
}

export const CustomPlaceholder: Story = {
  name: '커스텀',
  args: {
    placeholder: '커스텀 플레이스홀더',
  },
}

export const SolidVariant: Story = {
  name: '강제 선택',
  args: {
    variant: 'solid',
    defaultValue: ['pm po', 'backend'],
  },
}
