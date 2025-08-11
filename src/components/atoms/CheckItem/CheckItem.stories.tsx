import type { Meta, StoryObj } from '@storybook/nextjs'
import { CheckItem, type CheckState } from './checkItem'

const meta = {
  title: 'Atoms/CheckItem',
  component: CheckItem,
  parameters: {
    layout: 'centered',
    docs: {},
  },
  argTypes: {
    onChange: { action: 'changed' },
    checked: {
      control: 'select',
      options: [true, false, 'indeterminate'] as CheckState[],
    },
  },
} satisfies Meta<typeof CheckItem>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { label: '버튼' },
}

export const Checked: Story = {
  args: { label: '버튼', checked: true },
}
