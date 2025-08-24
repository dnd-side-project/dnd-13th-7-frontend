import * as React from 'react'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { Label } from '@/components/atoms/Label'
import { RadioGroup, RadioGroupItem } from './RadioGroup'

const meta: Meta<typeof RadioGroup> = {
  title: 'Molecules/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: 'boolean',
      description: '라디오 그룹 전체를 비활성화합니다',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: '라디오 버튼들의 배치 방향을 설정합니다',
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <RadioGroup defaultValue="option-1" {...args}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-1" id="option-1" />
        <Label htmlFor="option-1">옵션 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-2" id="option-2" />
        <Label htmlFor="option-2">옵션 2</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-3" id="option-3" />
        <Label htmlFor="option-3">옵션 3</Label>
      </div>
    </RadioGroup>
  ),
}

export const Horizontal: Story = {
  render: (args) => (
    <RadioGroup defaultValue="option-1" orientation="horizontal" {...args}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-1" id="horizontal-1" />
        <Label htmlFor="horizontal-1">옵션 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-2" id="horizontal-2" />
        <Label htmlFor="horizontal-2">옵션 2</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-3" id="horizontal-3" />
        <Label htmlFor="horizontal-3">옵션 3</Label>
      </div>
    </RadioGroup>
  ),
}

export const Disabled: Story = {
  render: (args) => (
    <RadioGroup defaultValue="option-1" disabled {...args}>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-1" id="disabled-1" />
        <Label htmlFor="disabled-1">옵션 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-2" id="disabled-2" />
        <Label htmlFor="disabled-2">옵션 2</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-3" id="disabled-3" />
        <Label htmlFor="disabled-3">옵션 3</Label>
      </div>
    </RadioGroup>
  ),
}

export const WithDescription: Story = {
  render: (args) => (
    <RadioGroup defaultValue="option-1" {...args}>
      <div className="flex items-start space-x-2">
        <RadioGroupItem value="option-1" id="desc-1" />
        <div className="grid gap-1.5 leading-none">
          <Label htmlFor="desc-1">옵션 1</Label>
          <p className="text-sm text-muted-foreground">
            이 옵션에 대한 자세한 설명입니다.
          </p>
        </div>
      </div>
      <div className="flex items-start space-x-2">
        <RadioGroupItem value="option-2" id="desc-2" />
        <div className="grid gap-1.5 leading-none">
          <Label htmlFor="desc-2">옵션 2</Label>
          <p className="text-sm text-muted-foreground">
            두 번째 옵션에 대한 설명입니다.
          </p>
        </div>
      </div>
      <div className="flex items-start space-x-2">
        <RadioGroupItem value="option-3" id="desc-3" />
        <div className="grid gap-1.5 leading-none">
          <Label htmlFor="desc-3">옵션 3</Label>
          <p className="text-sm text-muted-foreground">
            세 번째 옵션에 대한 설명입니다.
          </p>
        </div>
      </div>
    </RadioGroup>
  ),
}

export const Controlled: Story = {
  render: (args) => {
    const [value, setValue] = React.useState('option-1')

    return (
      <div className="space-y-4">
        <RadioGroup value={value} onValueChange={setValue} {...args}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-1" id="controlled-1" />
            <Label htmlFor="controlled-1">옵션 1</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-2" id="controlled-2" />
            <Label htmlFor="controlled-2">옵션 2</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="option-3" id="controlled-3" />
            <Label htmlFor="controlled-3">옵션 3</Label>
          </div>
        </RadioGroup>
        <p className="text-sm text-muted-foreground">선택된 값: {value}</p>
      </div>
    )
  },
}
