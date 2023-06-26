import type { FetchApiResult, GetAccessTokenResonse } from 'types';

import { customFetch } from '../utils';

const { TOKEN_ENDPOINT } = process.env;
const TOKEN_URL = '/api/token';
const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

interface Props {
  refreshToken: string;
}

export async function getAccessToken({
  refreshToken,
}: Props): Promise<FetchApiResult<GetAccessTokenResonse>> {
  if (!clientSecret) {
    return {
      error: {
        code: 403,
        message: 'No API key supplied',
        suggestion:
          'Try adding your SPOTIFY_CLIENT_SECRET to your .env.local file',
      },
    };
  }
  if (!clientId) {
    return {
      error: {
        code: 403,
        message: 'No API key supplied',
        suggestion: 'Try adding your SPOTIFY_CLIENT_ID to your .env.local file',
      },
    };
  }
  const payload = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  });
  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const headers = new Headers({
    Authorization: `Basic ${basic}`,
    'Content-Type': 'application/x-www-form-urlencoded',
  });
  const url = `${TOKEN_ENDPOINT}${TOKEN_URL}`;
  return customFetch<GetAccessTokenResonse>(url, {
    method: 'POST',
    body: payload,
    headers,
  });
}
