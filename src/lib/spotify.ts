const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const PLAYLISTS_ENDPOINT = 'https://api.spotify.com/v1/me/playlists';

const getAccessToken = async (refreshToken: string) => {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  });
  const res = await response.json();
  return res;
};

export const getUsersPlaylists = async (refreshToken: string) => {
  const { access_token: accessToken } = await getAccessToken(refreshToken);
  return fetch(PLAYLISTS_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};
