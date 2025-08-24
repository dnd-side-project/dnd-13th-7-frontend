import { QuickButton } from '@/components/atoms/quickButton'
import { Footer } from '@/components/molecules/layout'

export default function Home() {
  return (
    <div>
      <div>{/* 히어로 영역 */}</div>
      <div>
        {/* 하단 푸터 제외한 컨테이너 내용물 전체 */}
        {/* 상단 버튼 2개  */}
        <div className="flex flex-row gap-4 justify-center items-center">
          <div>
            <QuickButton
              icon="/images/subscribe.svg"
              title="구독"
              description="구독한 IT 활동 모아보기"
              href="/subscribe"
              className=""
            />
          </div>
          <div>
            <QuickButton
              icon="/images/clubMatching.svg"
              title="동아리 매칭"
              description="아직 준비중이에요"
              href="/"
              className=""
            />
          </div>
        </div>

        {/* 인기 IT 동아리  */}
        <div>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
        </div>

        {/* IT 동아리 프리미엄 후기 */}
        <div>
          <div>
            세로1
            <div>각각1</div>
            <div>각각2</div>
          </div>

          <div>
            세로2
            <div>각각1</div>
            <div>각각2</div>
          </div>
        </div>

        <div> {/* 하단 광고 배너 */} </div>
      </div>
      <Footer />
    </div>
  )
}
