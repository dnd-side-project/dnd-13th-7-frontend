import { cn } from '@/shared/utils/cn'

export function CardFooter({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div data-slot="card-footer" className={cn('flex', className)} {...props} />
  )
}
