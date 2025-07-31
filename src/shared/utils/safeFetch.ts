import * as Sentry from "@sentry/nextjs";

export async function safeFetch(
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> {
  const response = await fetch(input, init);

  if (!response.ok) {
    const status = response.status;

    if (status >= 500 && status < 600) {
      const url = typeof input === "string" ? input : input.toString();
      const method = init?.method || "GET";
      const err = new Error(`[${status}] ${method} ${url}`);

      Sentry.withScope((scope) => {
        scope.setFingerprint([`${status}`, method, url.split("?")[0]]);
        scope.setLevel("fatal");
        scope.setContext("response", {
          status,
          url,
        });
        Sentry.captureException(err);
      });
    }

    throw new Error(`HTTP Error: ${response.status}`);
  }

  return response;
}
