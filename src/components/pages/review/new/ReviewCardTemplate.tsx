import React from 'react'

const ReviewCardTemplate = ({
  children,
  typeText,
  kindText,
}: {
  children: React.ReactNode
  typeText: string
  kindText: string
}) => {
  return (
    <div className="h-full w-full">
      <div className="relative">
        {/* 상단 탭 부분 */}
        <div className="flex items-center gap-1 bg-white-color px-8 pt-4 pb-2 rounded-tr-4xl rounded-tl-4xl w-fit relative z-20">
          <span className="typo-title-3 text-black-color">{kindText}</span>
          <span className="typo-title-3 text-black-color">·</span>
          <span className="typo-title-3 text-main-color-1"> {typeText}</span>
        </div>
        {/* 그림자용 가상 요소 */}
        <div className="absolute inset-0 rounded-tr-4xl rounded-b-4xl shadow-xs pointer-events-none top-[55px] z-[5]" />
        {/* 메인 컨텐츠 부분 */}
        <div className="py-12 px-6 bg-white-color rounded-tr-4xl rounded-b-4xl relative z-10 -mt-[1px]">
          {children}
        </div>
      </div>
    </div>
  )
}

export default ReviewCardTemplate
