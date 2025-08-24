import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ImageUpload } from './index'

const meta = {
  title: 'Atoms/ImageUpload',
  component: ImageUpload,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onFileChange: { action: 'fileChanged' },
    height: {
      control: 'select',
      options: ['h-20', 'h-32', 'h-40', 'h-48'],
    },
    disabled: {
      control: 'boolean',
    },
  },
} satisfies Meta<typeof ImageUpload>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onFileChange: (file) => {
      console.log('File selected:', file)
    },
  },
}

export const WithDefaultImage: Story = {
  args: {
    onFileChange: (file) => {
      console.log('File selected:', file)
    },
    defaultImageUrl: 'https://via.placeholder.com/300x200',
  },
}

export const Large: Story = {
  args: {
    onFileChange: (file) => {
      console.log('File selected:', file)
    },
    height: 'h-48',
  },
}

export const Disabled: Story = {
  args: {
    onFileChange: (file) => {
      console.log('File selected:', file)
    },
    disabled: true,
  },
}

export const WithError: Story = {
  args: {
    onFileChange: (file) => {
      console.log('File selected:', file)
    },
    error: '이미지를 선택해주세요.',
  },
}
