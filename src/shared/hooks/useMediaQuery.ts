import { useEffect, useState } from 'react'

/**
 * 1440px 이상이면 isDesktop: true, 미만이면 isPhone: true
 */
export default function useMediaQuery() {
  const [isDesktop, setIsDesktop] = useState<boolean>(false)
  const [isPhone, setIsPhone] = useState<boolean>(false)

  useEffect(() => {
    function handleResize() {
      const isDesktopNow = window.innerWidth >= 1440
      setIsDesktop(isDesktopNow)
      setIsPhone(!isDesktopNow)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return { isDesktop, isPhone }
}
