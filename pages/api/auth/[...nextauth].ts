import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import NaverProvider from "next-auth/providers/naver";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "@/database/db";
import bcrypt from "bcrypt";

const {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  NAVER_CLIENT_ID,
  NAVER_CLIENT_SECRET,
  NEXTAUTH_SECRET,
} = process.env;

export const authOptions: any = {
  /**oAuth 옵션들 */
  providers: [
    GithubProvider({
      clientId: GITHUB_CLIENT_ID || "",
      clientSecret: GITHUB_CLIENT_SECRET || "",
    }),
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID || "",
      clientSecret: GOOGLE_CLIENT_SECRET || "",
    }),
    NaverProvider({
      clientId: NAVER_CLIENT_ID || "",
      clientSecret: NAVER_CLIENT_SECRET || "",
    }),

    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "useremail",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        let db = (await connectDB).db("algolog");
        if (credentials != undefined) {
          let user = await db
            .collection("users")
            .findOne({ email: credentials.email });
          if (!user) {
            return null;
          }
          const pwcheck = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!pwcheck) {
            console.log("비밀번호가 틀렸습니다");
            return null;
          }
          return user;
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, //30일
  },

  /** 로그인후 리다이렉트 */
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },

    jwt: async ({ token, user }) => {
      if (user) {
        token.user = {};
        token.user.name = user.name;
        token.user.email = user.email;
      }
      return token;
    },

    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
    async signIn() {
      const isAllowedToSignIn = true;
      if (isAllowedToSignIn) {
        return true;
      } else {
        return false;
      }
    },
  },
  pages: {
    signIn: "/auth/login",
  },

  /** 유저정보 자동저장 */
  adapter: MongoDBAdapter(connectDB),
  secret: NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
