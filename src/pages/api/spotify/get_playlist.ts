import type { RequestHandler } from 'express';
import { getSession } from 'next-auth/react';

import { getUsersPlaylists } from '@/lib/spotify';

const handler: RequestHandler = async (req, res) => {
  const {
    user: { accessToken },
  }: any = await getSession({ req });
  const response = await getUsersPlaylists(accessToken);
  const data: any = await response.json();

  return res.status(200).json(data);
};

export default handler;
