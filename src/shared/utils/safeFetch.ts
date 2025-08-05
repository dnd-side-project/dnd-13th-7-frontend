import * as Sentry from '@sentry/nextjs'
import { SentryNetworkError } from '@/shared/errors/SentryNetworkError'

export async function safeFetch(
  input: RequestInfo,
  init?: RequestInit,
): Promise<Response> {
  const response = await fetch(input, init)

  if (!response.ok) {
    const status = response.status
    const url = typeof input === 'string' ? input : input.toString()
    const method = init?.method || 'GET'

    if (status >= 500 && status < 600) {
      const customError = new SentryNetworkError(response)

      Sentry.withScope((scope) => {
        scope.setFingerprint([
          `${status}`,
          method,
          new URL(response.url).pathname.replace(/\/\d+(?=\/|$)/g, '/{id}'),
        ])
        scope.setLevel('fatal')
        scope.setContext('response', { status, url })
        Sentry.captureException(customError)
      })
      throw customError
    }
    throw new Error(`HTTP Error: ${response.status}`)
  }

  return response
}
