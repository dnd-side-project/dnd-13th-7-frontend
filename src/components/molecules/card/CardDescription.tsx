import { cn } from "@/shared/utils/cn";

export function CardDescription({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        'desktop:typo-caption-m phone:typo-body-4-m text-grey-color-2 text-ellipsis overflow-hidden line-clamp-2 flex-col mt-1',
        className,
      )}
      {...props}
    />
  )
}
