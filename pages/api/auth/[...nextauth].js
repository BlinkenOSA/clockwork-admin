import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios'


/**
 * Takes a token and returns a new one with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token with an error property.
 */
async function refreshAccessToken(token) {
  try {
    const response = await axios.post(`${process.env.NEXT_CLOCKWORK_API}/auth/jwt/refresh/`, {
      refresh: token.refreshToken,
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json'
      }
    });
    return {
      ...token,
      accessToken: response.data.access,
    }
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

const providers = [
  CredentialsProvider({
    name: 'Credentials',
    authorize: async (credentials) => {
      try {
        const response = await axios.post(`${process.env.NEXT_CLOCKWORK_API}/auth/jwt/create/`, {
          username: credentials.username,
          password: credentials.password,
          headers: {
            accept: '*/*',
            'Content-Type': 'application/json'
          }
        });
        return {
          accessToken: response.data.access,
          refreshToken: response.data.refresh
        }
      } catch (error) {
        if (error.hasOwnProperty('errno')) {
          throw new Error('serverProblem');
        } else {
          throw new Error('badCredentials');
        }
      }
    }
  })
];

const callbacks = {
  async jwt({ token, account, user }) {
    // Signing in
    if (user) {
      return {
        accessToken: user.accessToken,
        refreshToken: user.refreshToken,
      }
    }

    // Check if access token valid
    try {
      await axios.post(`${process.env.NEXT_CLOCKWORK_API}/auth/jwt/verify/`, {
        token: token.accessToken,
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json'
        }
      });
      return token
    } catch (error) {
      return await refreshAccessToken(token)
    }
  },

  async session({ session, token }) {
    session.accessToken = token.accessToken;
    session.error = token.error;

    return session
  }
};

const options = {
  providers,
  callbacks,
  session: { strategy: "jwt" },
  pages: {
    signIn: '/auth/login',
    error: '/auth/login'
  }
};

export default NextAuth(options)

