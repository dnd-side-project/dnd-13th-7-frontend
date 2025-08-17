import { cn } from '@/shared/utils/cn'

export function CardTitle({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        'desktop:typo-body-2-sb phone:typo-body-3-b text-black-color text-ellipsis overflow-hidden line-clamp-1 flex-col',
        className,
      )}
      {...props}
    />
  )
}
