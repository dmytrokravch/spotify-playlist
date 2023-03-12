import type { ErrorData, FetchApiResult } from '../../../../types';

export async function fetchSpotifyTokenApi<T = unknown>(
  url: string,
  fetchOptions?: RequestInit
): Promise<FetchApiResult<T>> {
  try {
    console.log('url', url);
    console.log('fetchOptions', fetchOptions);
    const response = await fetch(url, {
      ...fetchOptions,
    });

    let body;
    try {
      body = await response.json();
    } catch {
      body = {};
    }

    if (!response.ok) {
      if (body.error?.code && body.error?.message && body.error?.suggestion) {
        console.error(body.error);
        return { error: body.error };
      }

      const error = {
        code: 500,
        message: `Error when calling ${url}: ${
          body?.error ?? response.statusText
        }`,
        suggestion: 'Please try again',
      };
      return { error };
    }

    return { data: body };
  } catch (err: any) {
    if (err?.code && err?.message && err?.suggestion) {
      console.error(err);
      return { error: err as ErrorData };
    }

    const error: ErrorData = {
      code: 500,
      message: `Error when calling ${url}`,
      suggestion: 'Please try again',
    };
    console.error(error);
    console.error(err);
    return { error };
  }
}
