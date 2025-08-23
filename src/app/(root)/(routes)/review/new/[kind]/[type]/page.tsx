import { notFound } from 'next/navigation'

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
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto pt-20 px-6">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-black mb-2">
            {getKindDisplayName(kind)} {getTypeDisplayName(type)} 작성
          </h1>
          <p className="text-gray-600 text-sm">
            {type === 'normal'
              ? '간단하고 빠르게 후기를 작성해보세요'
              : '상세한 가이드를 따라 체계적으로 후기를 작성해보세요'}
          </p>
        </div>

        <div className="bg-gray-50 rounded-xl p-8">
          <p className="text-center text-gray-500">
            {getTypeDisplayName(type)} 작성 폼이 여기에 표시됩니다.
          </p>
        </div>
      </div>
    </main>
  )
}
