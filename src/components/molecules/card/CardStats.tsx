import { GreyMessage } from '@/assets/icons/GreyMessage'
import { GreyThumbsUp } from '@/assets/icons/GreyThumbsUp'
import { cn } from '@/shared/utils/cn'

export function CardStats({
  likes = 0,
  comments = 0,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  likes?: number
  comments?: number
}) {
  return (
    <div
      data-slot="card-stats"
      className={cn(
        'typo-caption-m text-grey-color-1 flex items-end justify-end flex-row',
        className,
      )}
      {...props}
    >
      <div className="flex items-center">
        <GreyThumbsUp />
        <span className="ml-1.5">{likes}</span>
      </div>
      <div className="flex items-center ml-2">
        <GreyMessage />
        <span className="ml-1.5">{comments}</span>
      </div>
    </div>
  )
}
