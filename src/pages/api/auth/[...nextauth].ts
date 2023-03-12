import NextAuth from 'next-auth';
import spotify from 'next-auth/providers/spotify';

export default NextAuth({
  providers: [
    spotify({
      authorization:
        'https://accounts.spotify.com/authorize?scope=user-read-email,playlist-read-private',
      clientId: process.env.SPOTIFY_CLIENT_ID || '',
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async jwt({ token, account }: any) {
      if (account) {
        const newToken = token;
        newToken.accessToken = account.refresh_token;
      }
      return token;
    },
    async session({ session, token }) {
      const newSessionData = session;
      newSessionData.user = token;
      return newSessionData;
    },
  },
});
