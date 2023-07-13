export type GetAccessTokenResonse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
};
export type ErrorData = {
  message: string;
  code?: number;
  suggestion?: string;
};

export type FetchApiResult<T = unknown> =
  | { type: 'success'; data: T }
  | { type: 'error'; error: ErrorData };

export function isSuccessResult<T>(
  result: FetchApiResult<T>
): result is { type: 'success'; data: T } {
  return result.type === 'success';
}

export function isErrorResult<T>(
  result: FetchApiResult<T>
): result is { type: 'error'; error: ErrorData } {
  return result.type === 'error';
}
