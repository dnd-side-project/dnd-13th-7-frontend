export class SentryNetworkError extends Error {
  status: number
  url: string

  constructor(response: Response) {
    const name = SentryNetworkError.generateName(response)
    super(name)
    this.name = name
    this.status = response.status
    this.url = response.url
  }

  private static generateName(response: Response): string {
    const status = response.status
    const fullUrl = response.url
    const urlObj = new URL(fullUrl)
    const baseURL = `${urlObj.origin}`
    const path = urlObj.pathname
    const replacePathParams = path.replace(/\/\d+(?=\/|$)/g, '/{id}')

    return `[${status} Error] - ${baseURL}${replacePathParams}`
  }
}
