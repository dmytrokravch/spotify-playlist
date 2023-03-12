import { fetchSpotifyTokenApi } from '../utils';

const { PLAYLISTS_ENDPOINT } = process.env;
const PLAYLISTS_URL = '/v1/me/playlists';
interface Props {
  refreshToken: string;
}

export async function getUsersPlaylists({ refreshToken }: Props) {
  const url = `${PLAYLISTS_ENDPOINT}${PLAYLISTS_URL}`;
  return fetchSpotifyTokenApi<any>(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });
}
