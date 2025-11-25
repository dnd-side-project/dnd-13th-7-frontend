import type { Meta, StoryObj } from '@storybook/nextjs'
import { useForm } from 'react-hook-form'
import DynamicQASection from './DynamicQASection'
import { Form } from '@/components/molecules/Form'

interface StoryFormValues {
  qaItems: Array<{ question: string; answer: string }>
}

const DynamicQASectionWrapper = (args: {
  title: string
  questionPlaceholder: string
  answerPlaceholder: string
}) => {
  const form = useForm<StoryFormValues>({
    defaultValues: {
      qaItems: [{ question: '', answer: '' }],
    },
  })

  return (
    <Form {...form}>
      <form className="w-[600px]">
        <DynamicQASection
          control={form.control}
          name="qaItems"
          title={args.title}
          questionPlaceholder={args.questionPlaceholder}
          answerPlaceholder={args.answerPlaceholder}
        />
      </form>
    </Form>
  )
}

const meta = {
  title: 'Molecules/DynamicQASection',
  component: DynamicQASectionWrapper,
  parameters: {
    layout: 'centered',
    docs: {},
  },
  argTypes: {
    title: { control: 'text' },
    questionPlaceholder: { control: 'text' },
    answerPlaceholder: { control: 'text' },
  },
} satisfies Meta<typeof DynamicQASectionWrapper>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: '면접에서 기억나는 질문과 답변',
    questionPlaceholder: '면접에서 받은 질문을 작성해주세요.',
    answerPlaceholder: '질문에 대해 어떻게 답변했는지 공유해주세요.',
  },
}

export const ActivityReview: Story = {
  args: {
    title: '활동 중 기억나는 경험',
    questionPlaceholder: '기억나는 활동 세션, 이벤트 등을 작성해주세요.',
    answerPlaceholder:
      '활동에 대한 설명과, 과정 중에 배운 것, 느낀것을 공유 해주세요.',
  },
}

export const PaperReview: Story = {
  args: {
    title: '서류에서 기억나는 항목과 답변',
    questionPlaceholder: '기억나는 서류 항목을 작성해주세요.',
    answerPlaceholder:
      '항목에 대한 답변으로 어떤 경험이나, 요소를 어필했는지 공유해주세요.',
  },
}
