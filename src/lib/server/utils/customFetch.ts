import type { ErrorData, FetchApiResult } from '../../../../types';

export async function customFetch<T = unknown>(
  url: string,
  fetchOptions?: RequestInit
): Promise<FetchApiResult<T>> {
  try {
    const response = await fetch(url, fetchOptions);
    const body = await response.json();

    if (!response.ok) {
      const error: ErrorData = body.error?.message
        ? { ...body.error }
        : {
            code: 500,
            message: `Error when calling ${url}: ${
              body?.error ?? response.statusText
            }`,
            suggestion: 'Please try again',
          };

      return { type: 'error', error };
    }

    return { type: 'success', data: body };
  } catch (err: unknown) {
    const error: ErrorData =
      err instanceof Error
        ? { ...err }
        : {
            code: 500,
            message: `Error when calling ${url}`,
            suggestion: 'Please try again',
          };
    return { type: 'error', error };
  }
}
