'use client'

import * as React from 'react'
import { ThumbsUp, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/atoms/Button/button'
import { StarRating } from '@/components/atoms/StarRating/StarRating'
import { Tag } from '@/components/atoms/tag/Tag'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { cn } from '@/shared/utils/cn'
import { getProfileImage } from '@/shared/utils/profile'

// 메인 컨테이너
export interface StandardReviewProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function StandardReview({
  children,
  className,
  ...props
}: StandardReviewProps) {
  return (
    <div className={cn('flex flex-col gap-4 w-full', className)} {...props}>
      {children}
    </div>
  )
}

// 왼쪽 영역 (프로필 + 질문 목록)
interface StandardReviewLeftProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function StandardReviewLeft({
  children,
  className,
  ...props
}: StandardReviewLeftProps) {
  return (
    <div
      className={cn('flex flex-col gap-4 w-64 flex-shrink-0', className)}
      {...props}
    >
      {children}
    </div>
  )
}

// 오른쪽 영역 (별점, 태그, 한줄평)
interface StandardReviewRightProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function StandardReviewRight({
  children,
  className,
  ...props
}: StandardReviewRightProps) {
  return (
    <div
      className={cn('flex flex-col gap-3 flex-1 min-w-0', className)}
      {...props}
    >
      {children}
    </div>
  )
}

// 하단 영역 (좋아요, 추천 버튼)
interface StandardReviewBottomProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function StandardReviewBottom({
  children,
  className,
  ...props
}: StandardReviewBottomProps) {
  return (
    <div
      className={cn('flex justify-between items-center', className)}
      {...props}
    >
      {children}
    </div>
  )
}

// 프로필 영역
interface StandardReviewProfileProps
  extends React.HTMLAttributes<HTMLDivElement> {
  nickname: string
  clubName: string
  generation: string
  part: string
  profileImage?: string
}

export function StandardReviewProfile({
  nickname,
  clubName,
  generation,
  part,
  profileImage,
  className,
  ...props
}: StandardReviewProfileProps) {
  const profileImageUrl = getProfileImage(profileImage || part)

  return (
    <div
      className={cn('flex items-center gap-2 w-64 h-10', className)}
      {...props}
    >
      <div className="w-10 h-10 rounded-full flex-shrink-0 overflow-hidden">
        {profileImageUrl ? (
          <img
            src={profileImageUrl}
            alt={nickname}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-grey-color-2 flex items-center justify-center">
            <span className="typo-caption-m text-grey-color-4">
              {nickname.charAt(0)}
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-0.5 flex-1 min-w-0">
        <div className="typo-body-2-sb text-black-color truncate">
          {nickname}
        </div>
        <div className="flex items-center gap-0.5 typo-body-4-m text-black-color">
          <span className="truncate">{clubName}</span>
          <span>·</span>
          <span>{generation}</span>
          <span>·</span>
          <span className="truncate">{part}</span>
        </div>
      </div>
    </div>
  )
}

// 질문 목록 영역
interface StandardReviewQuestionsProps
  extends React.HTMLAttributes<HTMLDivElement> {
  questions: Array<{
    question: string
    answers: string[]
  }>
}

export function StandardReviewQuestions({
  questions,
  className,
  ...props
}: StandardReviewQuestionsProps) {
  return (
    <div className={cn('flex flex-col gap-2 w-64', className)} {...props}>
      {questions.map((item, index) => {
        const isQ3 = index === 2 // Q3번 (0-based index)
        const hasMultipleAnswers = item.answers.length > 1

        if (isQ3 && hasMultipleAnswers) {
          // Q3번이고 답변이 2개일 때만 특별한 배치
          return (
            <div key={index} className="w-64 flex flex-col gap-1">
              <div className="flex items-start gap-2">
                <span className="typo-body-4-m text-grey-color-4 flex-shrink-0 min-w-0">
                  {item.question}
                </span>
                <span className="typo-body-4-m text-grey-color-4 flex-shrink-0">
                  |
                </span>
                <span className="typo-body-4-m text-grey-color-3">
                  {item.answers[0]}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="typo-body-4-m text-grey-color-4 flex-shrink-0 min-w-0 invisible">
                  {item.question}
                </span>
                <span className="typo-body-4-m text-grey-color-4 flex-shrink-0 invisible">
                  |
                </span>
                <span className="typo-body-4-m text-grey-color-3">
                  {item.answers[1]}
                </span>
              </div>
            </div>
          )
        } else {
          // Q1, Q2 또는 Q3이 답변 1개일 때는 가로 배치 (한 줄)
          return (
            <div key={index} className="w-64 h-[18px] flex items-center gap-2">
              <span className="typo-body-4-m text-grey-color-4 flex-shrink-0 min-w-0">
                {item.question}
              </span>
              <span className="typo-body-4-m text-grey-color-4 flex-shrink-0">
                |
              </span>
              <div className="flex gap-2 overflow-hidden flex-1 min-w-0">
                {item.answers.map((answer, answerIndex) => (
                  <span
                    key={answerIndex}
                    className="typo-body-4-m text-grey-color-3 flex-shrink-0"
                  >
                    {answer}
                  </span>
                ))}
              </div>
            </div>
          )
        }
      })}
    </div>
  )
}

// 별점 및 태그 영역
interface StandardReviewMetaProps extends React.HTMLAttributes<HTMLDivElement> {
  rating: number
  reviewType: string
  date: string
}

export function StandardReviewMeta({
  rating,
  reviewType,
  date,
  className,
  ...props
}: StandardReviewMetaProps) {
  return (
    <div
      className={cn('flex justify-between items-center w-full h-6', className)}
      {...props}
    >
      <div className="flex items-center gap-1">
        <StarRating
          value={rating}
          onChange={() => {}}
          disabled
          className="[&>button]:p-0"
        />
        <span className="typo-caption-m text-grey-color-3">{date}</span>
      </div>
      <Tag
        label={reviewType}
        kind="generalReview"
        size="small"
        color="lightPurple"
      />
    </div>
  )
}

// 한줄평 영역
interface StandardReviewContentProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: string
  content: string
}

export function StandardReviewContent({
  title,
  content,
  className,
  ...props
}: StandardReviewContentProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const contentRef = React.useRef<HTMLParagraphElement>(null)
  const [showMoreButton, setShowMoreButton] = React.useState(false)

  React.useEffect(() => {
    if (contentRef.current) {
      const element = contentRef.current

      // 실제 텍스트 크기를 측정하기 위해 임시로 스타일 변경
      const originalStyles = {
        height: element.style.height,
        overflow: element.style.overflow,
        maxWidth: element.style.maxWidth,
        position: element.style.position,
        visibility: element.style.visibility,
      }

      // 측정을 위한 임시 스타일
      element.style.height = 'auto'
      element.style.overflow = 'visible'
      element.style.maxWidth = '574px'
      element.style.position = 'absolute'
      element.style.visibility = 'hidden'

      // 실제 텍스트 높이 측정
      const actualHeight = element.scrollHeight
      const maxHeight = 48 // 2줄 높이 (Figma 디자인 기준)

      const isOverflowing = actualHeight > maxHeight
      setShowMoreButton(isOverflowing)

      // 원래 스타일로 복원
      element.style.height = originalStyles.height
      element.style.overflow = originalStyles.overflow
      element.style.maxWidth = originalStyles.maxWidth
      element.style.position = originalStyles.position
      element.style.visibility = originalStyles.visibility
    }
  }, [content])

  // 텍스트 길이 기반 overflow 체크 (백업)
  const shouldShowMoreByLength = content && content.length > 150

  return (
    <div className={cn('flex flex-col gap-3 w-full', className)} {...props}>
      <h3 className="typo-body-1 text-black-color w-full">{title}</h3>

      <div className="w-full max-w-[574px]">
        <p
          ref={contentRef}
          className={cn(
            'typo-body-3-3r text-grey-color-4 whitespace-pre-line break-words w-full leading-6 transition-all duration-200',
            !isOpen &&
              (showMoreButton || shouldShowMoreByLength) &&
              'h-[48px] overflow-hidden',
          )}
        >
          {content}
        </p>

        {(showMoreButton || shouldShowMoreByLength) && (
          <Button
            variant="none"
            size="none"
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1 mt-2 text-primary-color typo-caption-m hover:text-primary-color/80 transition-colors"
          >
            <span>더보기</span>
            {isOpen ? (
              <ChevronUp className="w-3 h-3" />
            ) : (
              <ChevronDown className="w-3 h-3" />
            )}
          </Button>
        )}
      </div>
    </div>
  )
}

// 좋아요 영역
interface StandardReviewLikesProps
  extends React.HTMLAttributes<HTMLDivElement> {
  likeCount: number
}

export function StandardReviewLikes({
  likeCount,
  className,
  ...props
}: StandardReviewLikesProps) {
  return (
    <div className={cn('flex items-center gap-1 h-6', className)} {...props}>
      <ThumbsUp className="w-3 h-3 text-grey-color-4 flex-shrink-0" />
      <span className="typo-caption-m text-grey-color-4">
        {likeCount}명에게 도움이 된 후기에요
      </span>
    </div>
  )
}

// 추천 버튼
interface StandardReviewRecommendProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onRecommend?: () => void
}

export function StandardReviewRecommend({
  onRecommend,
  className,
  ...props
}: StandardReviewRecommendProps) {
  return (
    <div className={className} {...props}>
      <Button variant="outlined-primary" size="small" onClick={onRecommend}>
        후기 추천하기
      </Button>
    </div>
  )
}

// 메인 컴포넌트 내보내기
StandardReview.Left = StandardReviewLeft
StandardReview.Right = StandardReviewRight
StandardReview.Bottom = StandardReviewBottom
StandardReview.Profile = StandardReviewProfile
StandardReview.Questions = StandardReviewQuestions
StandardReview.Meta = StandardReviewMeta
StandardReview.Content = StandardReviewContent
StandardReview.Likes = StandardReviewLikes
StandardReview.Recommend = StandardReviewRecommend

export default StandardReview
