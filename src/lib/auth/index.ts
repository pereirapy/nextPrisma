import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { getServerSession, type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { routes } from '@/config/routes';
import { signIn } from '@/lib/services/users';
import prisma from 'packages/database/prisma';

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      // @ts-ignore
      async authorize(credentials, req) {
        if (req.method === 'POST') {
          try {
            const { user, error } = await signIn(credentials);
            if (error) return null;
            if (user) return user;
            return false;
          } catch (error) {
            return null;
          }
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      if (user) {
        return {
          ...token,
          name: user.name,
          email: user.email,
          id: user.id,
          addressId: user.addressId,
          coachId: user.coachId
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          ...token,          
        },
      };
    },
  },
  pages: {
    signIn: routes.signIn,
  },
  session: {
    strategy: 'jwt', // JSON Web Token
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const hasSession = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error('you_must_be_logged_in');
  }
  return session;
};
