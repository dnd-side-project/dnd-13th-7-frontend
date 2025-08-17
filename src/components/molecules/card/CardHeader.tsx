import { cn } from '@/shared/utils/cn'

export function CardHeader({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div data-slot="card-header" className={cn('flex', className)} {...props} />
  )
}
