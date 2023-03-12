import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import { getAccessToken, getUsersPlaylists } from '@/lib/server/spotify';

async function GET(req: NextApiRequest, res: NextApiResponse) {
  const {
    user: { accessToken },
  }: any = await getSession({ req });

  const { data, error } = await getAccessToken({ refreshToken: accessToken });
  if (error) {
    return res.status(401).json({
      error: {
        code: 401,
        message: 'No access',
      },
    });
  }

  if (!data) {
    return res.status(404).json({
      error: {
        code: 404,
        message: 'Access token issue',
      },
    });
  }
  const newAccessToken = data.access_token;
  console.log(newAccessToken);
  const { data: tokenData, error: tokenError } = await getUsersPlaylists({
    refreshToken: newAccessToken,
  });
  console.log('tokenData', tokenData);
  console.log('tokenError', tokenError);

  if (tokenError) {
    return res.status(401).json({
      error: {
        code: 401,
        message: 'No access',
      },
    });
  }

  if (!tokenData) {
    return res.status(404).json({
      error: {
        code: 404,
        message: 'Access token issue',
      },
    });
  }
  return res.status(200).json(tokenData);
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
