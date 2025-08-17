import { cn } from '@/shared/utils/cn'

export function CardMeta({
  kind,
  clubName,
  clubYear,
  part,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  kind?: string
  clubName?: string
  clubYear?: string
  part?: string
}) {
  const meta = [kind?.trim(), clubName?.trim(), clubYear?.trim(), part?.trim()]
    .filter(Boolean)
    .join(' · ')

  if (meta.length === 0) return null

  return (
    <div
      data-slot="card-meta"
      className={cn(
        'typo-caption-m text-main-color-1 flex-col desktop:mt-2 phone:mt-1',
        className,
      )}
      {...props}
    >
      {meta}
    </div>
  )
}
