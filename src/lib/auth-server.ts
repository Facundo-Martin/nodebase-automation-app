import { db } from "@/server/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { magicLink } from "better-auth/plugins";
import { phoneNumber } from "better-auth/plugins";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const baseAuth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
});

/**
 * Extended auth object with custom API methods
 */
export const auth = {
  ...baseAuth,
  api: {
    ...baseAuth.api,

    /**
     * Protect a route by ensuring user is authenticated
     * Redirects to sign-in page if not authenticated
     *
     * @param redirectTo - Optional path to redirect to after sign-in
     * @returns The authenticated session
     */
    async protectRoute(redirectTo?: string) {
      const session = await baseAuth.api.getSession({
        headers: await headers(),
      });

      if (!session) {
        const callbackUrl = redirectTo || "/";
        redirect(`/sign-in?callbackUrl=${encodeURIComponent(callbackUrl)}`);
      }

      return session;
    },

    /**
     * Check auth without redirecting
     * Useful for conditional rendering
     */
    async checkAuth() {
      const session = await baseAuth.api.getSession({
        headers: await headers(),
      });
      return { session, isAuthenticated: !!session };
    },
  },
};
