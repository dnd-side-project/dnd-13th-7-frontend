import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { DocumentPencilIcon, DocumentDiamondIcon } from '@/assets/icons'

const validKinds = ['paper', 'interview', 'activity'] as const

export default async function Page({
  params,
}: {
  params: Promise<{ kind: string }>
}) {
  const { kind } = await params
  const isValidKind = (validKinds as readonly string[]).includes(kind)
  if (!isValidKind) {
    notFound()
  }

  const getKindDisplayName = (kind: string) => {
    switch (kind) {
      case 'paper':
        return '서류'
      case 'interview':
        return '인터뷰/면접'
      case 'activity':
        return '활동'
      default:
        return kind
    }
  }

  return (
    <main className="w-full h-full">
      <div className="max-w-[530px] h-full mx-auto flex flex-col items-center justify-center">
        {/* 제목 */}
        <div className="text-center mb-8">
          <h2 className="typo-title-1 text-black-color mb-8">
            {getKindDisplayName(kind)} 후기 작성
          </h2>
        </div>

        {/* 카드 컨테이너 */}
        <div className="p-6 rounded-2xl bg-white-color flex flex-col gap-8 items-center w-[530px] shadow-sm">
          <p className="typo-body-2-sb text-grey-color-4">
            작성하실 후기 스타일을 선택해주세요
          </p>
          <div className="w-full flex flex-col gap-4">
            {/* 일반 후기 카드 */}
            <Link href={`/review/new/${kind}/normal`}>
              <div className="w-full p-6 border border-gray-200 rounded-xl cursor-pointer group">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Image src={DocumentPencilIcon} alt="일반 후기" />
                  </div>
                  <div className="flex-1">
                    <h3 className="typo-body-3-b text-black-color mb-1">
                      일반 후기
                    </h3>
                    <p className="typo-button-m text-grey-color-3">
                      짧고 간단한 3분 후기 작성하기
                    </p>
                  </div>
                </div>
              </div>
            </Link>
            {/* 프리미엄 후기 카드 */}
            <Link href={`/review/new/${kind}/premium`}>
              <div className="w-full p-6 border border-gray-200 rounded-xl cursor-pointer group">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <Image src={DocumentDiamondIcon} alt="프리미엄 후기" />
                  </div>
                  <div className="flex-1">
                    <h3 className="typo-body-3-b text-black-color mb-1">
                      프리미엄 후기
                    </h3>
                    <p className="typo-button-m text-grey-color-3">
                      가이드 따라 상세 후기 작성하고 기프티콘 혜택 받기
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
