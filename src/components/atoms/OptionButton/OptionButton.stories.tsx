import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import '@/styles/globals.css'
import { OptionButton } from './OptionButton'

const meta = {
  title: 'Atoms/OptionButton',
  component: OptionButton,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    selected: {
      control: 'boolean',
      description: '선택된 상태를 표시합니다',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
      description: '버튼의 크기를 설정합니다',
    },
    disabled: {
      control: 'boolean',
      description: '버튼을 비활성화합니다',
    },
    onClick: { action: 'clicked' },
  },
} satisfies Meta<typeof OptionButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: '선택 옵션',
    selected: false,
  },
}

export const Selected: Story = {
  args: {
    children: '선택된 옵션',
    selected: true,
  },
}

export const Small: Story = {
  args: {
    children: '작은 옵션',
    size: 'small',
  },
}

export const Large: Story = {
  args: {
    children: '큰 옵션',
    size: 'large',
  },
}

export const Disabled: Story = {
  args: {
    children: '비활성화',
    disabled: true,
  },
}

export const DisabledSelected: Story = {
  args: {
    children: '비활성화 선택됨',
    disabled: true,
    selected: true,
  },
}

export const Interactive: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string>('option1')

    return (
      <div className="flex gap-4">
        <OptionButton
          selected={selected === 'option1'}
          onClick={() => setSelected('option1')}
        >
          옵션 1
        </OptionButton>
        <OptionButton
          selected={selected === 'option2'}
          onClick={() => setSelected('option2')}
        >
          옵션 2
        </OptionButton>
        <OptionButton
          selected={selected === 'option3'}
          onClick={() => setSelected('option3')}
        >
          옵션 3
        </OptionButton>
      </div>
    )
  },
}

export const MultiSelect: Story = {
  render: () => {
    const [selectedOptions, setSelectedOptions] = React.useState<string[]>([
      'option1',
    ])

    const toggleOption = (option: string) => {
      setSelectedOptions((prev) =>
        prev.includes(option)
          ? prev.filter((o) => o !== option)
          : [...prev, option],
      )
    }

    return (
      <div className="flex gap-4">
        <OptionButton
          selected={selectedOptions.includes('option1')}
          onClick={() => toggleOption('option1')}
        >
          옵션 1
        </OptionButton>
        <OptionButton
          selected={selectedOptions.includes('option2')}
          onClick={() => toggleOption('option2')}
        >
          옵션 2
        </OptionButton>
        <OptionButton
          selected={selectedOptions.includes('option3')}
          onClick={() => toggleOption('option3')}
        >
          옵션 3
        </OptionButton>
      </div>
    )
  },
}
