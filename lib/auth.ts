import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { User } from "next-auth";
import { Session } from "next-auth";
import bcrypt from "bcryptjs";
import { LoginSchema } from "@/lib/schemas";
import { prisma } from "@/lib/prisma";

declare module "next-auth" {
  interface User {
    id: string;
    name: string | null;
    email: string;
    role: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string | null;
      role: string;
    };
    refreshedAt?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email: string;
    role: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const parsedCredentails = LoginSchema.safeParse(credentials);

        if (!parsedCredentails.success) {
          console.log("Invalid credentials format");
          return null;
        }

        const { email, password } = parsedCredentails.data;

        try {
          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user) {
            console.log("No user found with this email");
            return null;
          }

          const passwordsMatch = await comparePasswords(
            password,
            user.password
          );

          if (!passwordsMatch) {
            console.log("Password does not match");
            return null;
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.error("Error finding user:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
});

export async function hashPassword(password: string) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

export async function comparePasswords(
  password: string,
  hashedPassword: string
) {
  return await bcrypt.compare(password, hashedPassword);
}
