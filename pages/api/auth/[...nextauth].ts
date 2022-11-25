import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  getTokenExpireTime,
  NextAuthToken,
  refreshAccessToken,
} from "~/utils/nextAuth.utils";
import { api } from "~/woozooapi";

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "rocket-doctor",
      name: "rocket-doctor",
      type: "credentials",
      credentials: {
        uid: {
          label: "이메일",
          type: "text",
          placeholder: "이메일을 입력해주세요.",
        },
        password: {
          label: "비밀번호",
          type: "password",
          placeholder: "비밀번호를 입력해주세요.",
        },
      },
      /**
       * `authorize`
       *
       * Called when a user is attempting to sign in.
       * returns a Promise that resolves to a next-auth's internal User object.
       * BUT we're gonna using it just for our accessToken container.
       * returns:
       *  - User: if api.auth.generateToken() is successful. Will be passed to `signIn` with `user` property.
       *  - null: if api.auth.generateToken() is failed. next-auth will handle it.
       */
      async authorize(credentials) {
        if (!credentials) return null;

        const signInApiResult = await api.auth.signIn({
          uid: credentials.uid,
          password: credentials.password,
        });

        if (!signInApiResult.token) {
          return null;
        }

        const { token, hospitalUserId } = signInApiResult;

        return {
          // user object but we're gonna use it just for our accessToken container.
          // accessToken is token and expires will be used for refreshAccessToken().
          accessToken: token,
          // TODO: need to check if this really works.
          expire: getTokenExpireTime(token),
          id: hospitalUserId,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    signIn: async ({ user }) => {
      if (user?.accessToken) {
        return true;
      }
      return "/auth/login"; // next-auth will redirect to `/auth/login` if the user doesn't have accessToken.
    },
    jwt: async ({ token, user }) => {
      // `token` is next-auth's internal JWT object
      // `user` is next-auth's internal User object
      // but we're using it just for handling our access token

      // Step 1. First time logged in.
      // we need to add accessToken to `token` object
      if (!token.accessToken && user?.accessToken) {
        token.accessToken = user.accessToken;
        token.expire = user.expire;
        token.id = user.id;

        return {
          accessToken: user.accessToken,
          expire: user.expire,
          id: user.id,
        };
      }

      // Step 2. User is logged in and accessToken is not expired.
      // if we have the token and is not expired, we just return it
      if (token.expire && (token.expire as number) > Date.now()) {
        return token;
      }

      // Step 3. User is logged in and accessToken is expired.
      // if not, we refresh the token.
      const isTokenValid = await api.auth.verifyToken({
        token: token?.accessToken as string,
      });

      if (!!isTokenValid) {
        return token;
      }

      return await refreshAccessToken(token as NextAuthToken);
    },
    session: async ({ session, token }) => {
      // pass session to the nextjs (to access with `useSession` hook, etc.)
      session.accessToken = token.accessToken;
      session.id = token.id;
      return session;
    },
  },
  pages: {
    newUser: "/auth/register",
    signIn: "/auth/login",
  },
  debug: process.env.NODE_ENV !== "production",
  secret: process.env.NEXTAUTH_SECRET, // For next-auth's internal jwt. Not related any of our codebase.
  logger: {
    warn: () => {
      // no-op
    },
    debug: () => {
      // no-op
    },
  },
});
