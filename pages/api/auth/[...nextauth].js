import NextAuth from 'next-auth'
import Providers from 'next-auth/providers';
import axios from 'axios'

const providers = [
  Providers.Credentials({
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
  // Getting the JWT token from API response
  async jwt(token, user, profile) {
    // Signing in
    if (user && profile) {
      return {
        accessToken: user.accessToken,
        refreshToken: user.refreshToken,
      }
    }

    // Check if access token valid
    if (token) {
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
    }
  },

  async session(session, token) {
    if (token) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
    }
    return session
  }
};

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
    throw error
  }
}

const options = {
  providers,
  callbacks,
  pages: {
    signIn: '/dashboard',
    error: '/auth/login'
  }
};

export default (req, res) => NextAuth(req, res, options)


