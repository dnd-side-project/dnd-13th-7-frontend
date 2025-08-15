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

  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold">Create Review</h1>
      <p className="mt-2 text-sm text-gray-600">kind: {kind}</p>
      <p className="mt-1 text-sm text-gray-600">type: {type}</p>
    </main>
  )
}
