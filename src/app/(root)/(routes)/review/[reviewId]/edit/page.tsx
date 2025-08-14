export default async function Page({
  params,
}: {
  params: Promise<{ reviewId: string }>
}) {
  const { reviewId } = await params
  return (
    <main className="p-6">
      <h1 className="text-xl font-semibold">Edit Review</h1>
      <p className="mt-2 text-sm text-gray-600">reviewId: {reviewId}</p>
    </main>
  )
}
