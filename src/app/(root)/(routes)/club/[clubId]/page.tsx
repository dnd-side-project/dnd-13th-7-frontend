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
    </main>
  )
}
