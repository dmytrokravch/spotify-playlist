import NextAuth from 'next-auth';
import spotify from 'next-auth/providers/spotify';

export const options = {
  providers: [
    spotify({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    }),
  ],
};

export default NextAuth(options);
