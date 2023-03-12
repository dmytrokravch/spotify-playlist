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
  | {
      data: T;
      error?: never;
    }
  | {
      error: ErrorData;
      data?: never;
    };
