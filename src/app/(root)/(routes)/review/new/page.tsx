import type { Metadata } from 'next'
import Link from 'next/link'
import {
  DocumentPencilIcon,
  DocumentDiamondIcon,
  DocumentFileIcon,
} from '@/assets/icons'
import AppPath from '@/shared/configs/appPath'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `후기 작성`,
    description: `IT 동아리 후기를 작성해보세요. 서류, 면접, 활동 후기 중 선택하여 경험을 공유하고 다른 분들에게 도움을 주세요.`,
    keywords: [`IT 동아리 후기`, '동아리 후기 작성', '경험 공유'],
    openGraph: {
      title: `후기 작성 | 모여잇`,
      description: `IT 동아리 후기를 작성해보세요. 서류, 면접, 활동 후기 중 선택하여 경험을 공유하고 다른 분들에게 도움을 주세요.`,
    },
  }
}

export default async function Page() {
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
            작성하실 후기 종류를 선택해주세요
          </p>
          <div className="w-full flex flex-col gap-4">
            {/* 서류 후기 카드 */}
            <Link href={AppPath.reviewNew('paper')}>
              <div className="w-full p-6 border border-gray-200 rounded-xl cursor-pointer group hover:border-primary-color transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <DocumentPencilIcon role="img" aria-label="서류 후기" />
                  </div>
                  <div className="flex-1">
                    <h3 className="typo-body-3-b text-black-color mb-1">
                      서류 후기
                    </h3>
                    <p className="typo-button-m text-grey-color-3">
                      서류 전형 경험을 공유해주세요
                    </p>
                  </div>
                </div>
              </div>
            </Link>
            {/* 면접 후기 카드 */}
            <Link href={AppPath.reviewNew('interview')}>
              <div className="w-full p-6 border border-gray-200 rounded-xl cursor-pointer group hover:border-primary-color transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <DocumentDiamondIcon role="img" aria-label="면접 후기" />
                  </div>
                  <div className="flex-1">
                    <h3 className="typo-body-3-b text-black-color mb-1">
                      면접 후기
                    </h3>
                    <p className="typo-button-m text-grey-color-3">
                      면접 전형 경험을 공유해주세요
                    </p>
                  </div>
                </div>
              </div>
            </Link>
            {/* 활동 후기 카드 */}
            <Link href={AppPath.reviewNew('activity')}>
              <div className="w-full p-6 border border-gray-200 rounded-xl cursor-pointer group hover:border-primary-color transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <DocumentFileIcon role="img" aria-label="활동 후기" />
                  </div>
                  <div className="flex-1">
                    <h3 className="typo-body-3-b text-black-color mb-1">
                      활동 후기
                    </h3>
                    <p className="typo-button-m text-grey-color-3">
                      동아리 활동 경험을 공유해주세요
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
