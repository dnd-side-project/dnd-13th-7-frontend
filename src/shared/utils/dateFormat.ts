/**
 * 날짜를 'YY.MM.DD' 형식으로 포맷팅
 * @param dateString - ISO 날짜 문자열 (예: '2025-08-28')
 * @returns 포맷팅된 날짜 문자열 (예: '25.08.28')
 */
export function formatDateToYYMMDD(dateString: string): string {
  if (!dateString) return ''

  try {
    const date = new Date(dateString)

    // 유효한 날짜인지 확인
    if (isNaN(date.getTime())) {
      return dateString
    }

    const year = date.getFullYear().toString().slice(-2) // 마지막 2자리
    const month = (date.getMonth() + 1).toString().padStart(2, '0') // 01-12
    const day = date.getDate().toString().padStart(2, '0') // 01-31

    return `${year}.${month}.${day}`
  } catch (error) {
    console.error('Date formatting error:', error)
    return dateString
  }
}
