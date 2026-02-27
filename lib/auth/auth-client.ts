import { createAuthClient } from "better-auth/react";

export const AuthClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL!,
});

export const {signIn, signUp, signOut, useSession} = AuthClient;