import { signinSchema } from "@/schemas";
import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { getUserByEmail } from "@/database/queries";
import * as bcrypt from "bcryptjs";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";

const authConfig = {
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsed = signinSchema.safeParse(credentials);
        if (parsed.success) {
          const { email, password } = parsed.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const validated = await bcrypt.compare(password, user.password);
          return validated ? user : null;
        }
        return null;
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_CLIENT_ID,
      clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    Github({
      clientId: process.env.AUTH_GITHUB_CLIENT_ID,
      clientSecret: process.env.AUTH_GITHUB_CLIENT_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
  ],
} satisfies NextAuthConfig;

export default authConfig;
