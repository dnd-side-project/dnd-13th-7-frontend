import { UnderLineTab } from '@/components/atoms/UnderLineTab'

export default async function Page({
  params,
}: {
  params: Promise<{ clubId: string }>
}) {
  const { clubId } = await params
  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold">Club Detail</h1>
      <p className="mt-2 text-sm text-gray-600">clubId: {clubId}</p>
      <UnderLineTab
        defaultValue="info"
        tabs={[
          {
            value: 'info',
            label: 'Info',
            content: <div>Info</div>,
          },
          {
            value: 'members',
            label: 'Members',
            content: <div>Members</div>,
          },
          {
            value: 'posts',
            label: 'Posts',
            content: <div>Posts</div>,
          },
        ]}
      />
    </main>
  )
}
