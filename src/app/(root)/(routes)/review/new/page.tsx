import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  DocumentPencilIcon,
  DocumentDiamondIcon,
  DocumentFileIcon,
} from '@/assets/icons'
import AppPath from '@/shared/configs/appPath'

const validKinds = ['paper', 'interview', 'activity'] as const

export async function generateMetadata() {
  return {
    title: `후기 작성`,
    description: `IT 동아리 후기를 작성해보세요. 일반 후기와 프리미엄 후기 중 선택하여 경험을 공유하고 다른 분들에게 도움을 주세요.`,
    keywords: [`IT 동아리 후기`, '동아리 후기 작성', '경험 공유'],
    openGraph: {
      title: `후기 작성 | 모여잇`,
      description: `IT 동아리 후기를 작성해보세요. 일반 후기와 프리미엄 후기 중 선택하여 경험을 공유하고 다른 분들에게 도움을 주세요.`,
    },
  }
}

export default async function Page() {
  const kind = 'paper'

  return (
    <main className="w-full h-full">
      <div className="max-w-[530px] h-full mx-auto flex flex-col items-center justify-center">
        {/* 제목 */}
        <div className="text-center mb-8">
          <h2 className="typo-title-1 text-black-color mb-8">후기 작성</h2>
        </div>

        {/* 카드 컨테이너 */}
        <div className="p-6 rounded-2xl bg-white-color flex flex-col gap-8 items-center w-[530px] shadow-sm">
          <p className="typo-body-2-sb text-grey-color-4">
            작성하실 후기 스타일을 선택해주세요
          </p>
          <div className="w-full flex flex-col gap-4">
            {/* 서류 후기 카드 */}
            <Link href={AppPath.reviewNew('paper', 'normal')}>
              <div className="w-full p-6 border border-gray-200 rounded-xl cursor-pointer group">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <DocumentPencilIcon role="img" aria-label="서류 후기" />
                  </div>
                  <div className="flex-1">
                    <h3 className="typo-body-3-b text-black-color mb-1">
                      서류 후기
                    </h3>
                    <p className="typo-button-m text-grey-color-3">
                      짧고 간단한 3분 후기 작성하기
                    </p>
                  </div>
                </div>
              </div>
            </Link>
            {/* 면접 후기 카드 */}
            <Link href={AppPath.reviewNew('interview', 'normal')}>
              <div className="w-full p-6 border border-gray-200 rounded-xl cursor-pointer group">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <DocumentDiamondIcon role="img" aria-label="면접 후기" />
                  </div>
                  <div className="flex-1">
                    <h3 className="typo-body-3-b text-black-color mb-1">
                      면접 후기
                    </h3>
                    <p className="typo-button-m text-grey-color-3">
                      가이드 따라 상세 후기 작성하고 기프티콘 혜택 받기
                    </p>
                  </div>
                </div>
              </div>
            </Link>
            {/* 활동 후기 카드 */}
            <Link href={AppPath.reviewNew('activity', 'normal')}>
              <div className="w-full p-6 border border-gray-200 rounded-xl cursor-pointer group">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <DocumentFileIcon role="img" aria-label="활동 후기" />
                  </div>
                  <div className="flex-1">
                    <h3 className="typo-body-3-b text-black-color mb-1">
                      활동 후기
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
