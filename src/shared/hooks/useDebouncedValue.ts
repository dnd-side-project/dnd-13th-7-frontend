import { useEffect, useState } from 'react'

/**
 * Returns a debounced value that updates after the specified delay.
 * Useful for search inputs to avoid firing requests on every keystroke.
 */
export function useDebouncedValue<T>(value: T, delayMs: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedValue(value), delayMs)
    return () => clearTimeout(timerId)
  }, [value, delayMs])

  return debouncedValue
}

export default useDebouncedValue
