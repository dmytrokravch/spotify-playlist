import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { isErrorResult } from 'types';

import { getAccessToken, getUsersPlaylists } from '@/lib/server/spotify';

async function GET(req: NextApiRequest, res: NextApiResponse) {
  const {
    user: { accessToken },
  }: any = await getSession({ req });

  const accessTokenResult = await getAccessToken({ refreshToken: accessToken });
  if (isErrorResult(accessTokenResult)) {
    return res.status(401).json({
      error: {
        code: 401,
        message: 'No access',
      },
    });
  }

  if (!accessTokenResult.data) {
    return res.status(404).json({
      error: {
        code: 404,
        message: 'Access token issue',
      },
    });
  }
  const newAccessToken = accessTokenResult.data.access_token;

  const userPlaylistResult = await getUsersPlaylists({
    refreshToken: newAccessToken,
  });

  if (isErrorResult(userPlaylistResult)) {
    return res.status(401).json({
      error: {
        code: 401,
        message: 'No access',
      },
    });
  }

  if (!accessTokenResult.data) {
    return res.status(404).json({
      error: {
        code: 404,
        message: 'Access token issue',
      },
    });
  }
  return res.status(200).json(accessTokenResult.data);
}

export default async function get(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      return GET(req, res);

    default:
      return res.status(405).json({
        error: {
          code: 405,
          message: 'Method Not Allowed',
          suggestion: 'Only GET is available from this API',
        },
      });
  }
}
