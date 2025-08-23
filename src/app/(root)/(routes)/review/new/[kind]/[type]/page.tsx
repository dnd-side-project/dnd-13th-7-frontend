import { notFound } from 'next/navigation'
import ReviewCardTemplate from '@/components/pages/review/new/kind/type/ReviewCardTemplate'

const validKinds = ['paper', 'interview', 'activity'] as const
const validTypes = ['normal', 'premium'] as const

export default async function Page({
  params,
}: {
  params: Promise<{ kind: string; type: string }>
}) {
  const { kind, type } = await params
  const isValidKind = (validKinds as readonly string[]).includes(kind)
  const isValidType = (validTypes as readonly string[]).includes(type)

  if (!isValidKind || !isValidType) {
    notFound()
  }

  const getKindDisplayName = (kind: string) => {
    switch (kind) {
      case 'paper':
        return '서류'
      case 'interview':
        return '인터뷰/면접'
      case 'activity':
        return '활동'
      default:
        return kind
    }
  }

  const getTypeDisplayName = (type: string) => {
    switch (type) {
      case 'normal':
        return '일반 후기'
      case 'premium':
        return '프리미엄 후기'
      default:
        return type
    }
  }

  return (
    <main className="">
      <div className="max-w-4xl mx-auto pt-20 px-6">
        <div className="text-center mb-8">
          <ReviewCardTemplate
            typeText={getTypeDisplayName(type)}
            kindText={getKindDisplayName(kind)}
          >
            <div>
              <h1 className="text-2xl font-bold text-black mb-2">작성</h1>
            </div>
          </ReviewCardTemplate>
        </div>
      </div>
    </main>
  )
}
