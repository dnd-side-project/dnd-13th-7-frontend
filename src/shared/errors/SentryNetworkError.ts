export class SentryNetworkError extends Error {
  public status: number;
  public url: string;

  constructor(response: Response) {
    const name = SentryNetworkError.generateName(response);
    super(name);
    this.name = name;
    this.status = response.status;
    this.url = response.url;
  }

  private static generateName(response: Response): string {
    const status = response.status;
    const urlObj = new URL(response.url);
    const baseURL = urlObj.origin;
    const path = urlObj.pathname;
    const replacePathParams = path.replace(/\/\d+(?=\/|$)/g, "/{id}");

    return `[${status} Error] - ${baseURL}${replacePathParams}`;
  }
}
