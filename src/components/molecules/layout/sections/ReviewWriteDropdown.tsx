import Link from 'next/link'
import { Button } from '@/components/atoms/Button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/atoms/dropdownMenu'
import AppPath from '@/shared/configs/appPath'

export default function ReviewWriteDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="small" variant="solid" className="typo-button">
          후기 작성
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 mt-4 mr-10">
        <DropdownMenuItem className="typo-body-3-3-r text-grey-color-5">
          <Link href={AppPath.reviewNew('paper')} className="w-full px-4 py-2">
            서류 후기
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="typo-body-3-3-r text-grey-color-5">
          <Link
            href={AppPath.reviewNew('interview')}
            className="w-full px-4 py-2"
          >
            인터뷰/면접 후기
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="typo-body-3-3-r text-grey-color-5">
          <Link
            href={AppPath.reviewNew('activity')}
            className="w-full px-4 py-2"
          >
            활동 후기
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
