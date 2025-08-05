import { describe, it, expect, beforeEach, afterEach } from 'vitest'

// 간단한 유틸리티 함수들
const add = (a: number, b: number): number => a + b
const multiply = (a: number, b: number): number => a * b
const divide = (a: number, b: number): number => {
  if (b === 0) {
    throw new Error('0으로 나눌 수 없습니다')
  }
  return a / b
}

// 문자열 유틸리티
const reverseString = (str: string): string => str.split('').reverse().join('')
const isPalindrome = (str: string): boolean => {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '')
  return cleaned === reverseString(cleaned)
}

describe('기본 수학 연산 테스트', () => {
  describe('덧셈 테스트', () => {
    it('두 양수를 더해야 한다', () => {
      expect(add(2, 3)).toBe(5)
      expect(add(10, 20)).toBe(30)
    })

    it('음수를 더해야 한다', () => {
      expect(add(-1, -2)).toBe(-3)
      expect(add(5, -3)).toBe(2)
    })

    it('0을 더해야 한다', () => {
      expect(add(5, 0)).toBe(5)
      expect(add(0, 10)).toBe(10)
    })
  })

  describe('곱셈 테스트', () => {
    it('두 양수를 곱해야 한다', () => {
      expect(multiply(2, 3)).toBe(6)
      expect(multiply(4, 5)).toBe(20)
    })

    it('음수를 곱해야 한다', () => {
      expect(multiply(-2, 3)).toBe(-6)
      expect(multiply(-2, -3)).toBe(6)
    })
  })

  describe('나눗셈 테스트', () => {
    it('정상적인 나눗셈을 해야 한다', () => {
      expect(divide(10, 2)).toBe(5)
      expect(divide(15, 3)).toBe(5)
    })

    it('0으로 나누면 에러가 발생해야 한다', () => {
      expect(() => divide(10, 0)).toThrow('0으로 나눌 수 없습니다')
    })
  })
})

describe('문자열 유틸리티 테스트', () => {
  describe('reverseString 함수', () => {
    it('문자열을 뒤집어야 한다', () => {
      expect(reverseString('hello')).toBe('olleh')
      expect(reverseString('world')).toBe('dlrow')
      expect(reverseString('')).toBe('')
    })
  })

  describe('isPalindrome 함수', () => {
    it('팰린드롬을 올바르게 감지해야 한다', () => {
      expect(isPalindrome('racecar')).toBe(true)
      expect(isPalindrome('A man a plan a canal Panama')).toBe(true)
      expect(isPalindrome('hello')).toBe(false)
      expect(isPalindrome('')).toBe(true)
    })
  })
})

describe('비동기 테스트 예제', () => {
  const fetchData = async (): Promise<string> => {
    // 실제 API 호출을 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 100))
    return '데이터'
  }

  it('비동기 함수를 테스트해야 한다', async () => {
    const result = await fetchData()
    expect(result).toBe('데이터')
  })

  it('Promise를 사용한 비동기 테스트', () => {
    return fetchData().then((result) => {
      expect(result).toBe('데이터')
    })
  })
})

describe('배열 테스트 예제', () => {
  it('배열 메서드를 테스트해야 한다', () => {
    const numbers = [1, 2, 3, 4, 5]

    expect(numbers).toHaveLength(5)
    expect(numbers).toContain(3)
    expect(numbers.filter((n) => n > 3)).toEqual([4, 5])
    expect(numbers.map((n) => n * 2)).toEqual([2, 4, 6, 8, 10])
  })
})

describe('객체 테스트 예제', () => {
  it('객체 속성을 테스트해야 한다', () => {
    const user = {
      name: '홍길동',
      age: 30,
      email: 'hong@example.com',
    }

    expect(user).toHaveProperty('name')
    expect(user.name).toBe('홍길동')
    expect(user).toEqual({
      name: '홍길동',
      age: 30,
      email: 'hong@example.com',
    })
  })
})

// 테스트 훅 예제
describe('테스트 훅 예제', () => {
  let counter = 0

  beforeEach(() => {
    counter = 0
  })

  afterEach(() => {
    counter = 0
  })

  it('beforeEach가 실행되어야 한다', () => {
    expect(counter).toBe(0)
    counter++
    expect(counter).toBe(1)
  })

  it('다른 테스트에서도 beforeEach가 실행되어야 한다', () => {
    expect(counter).toBe(0)
    counter += 2
    expect(counter).toBe(2)
  })
})
