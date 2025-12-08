import { createAuthClient } from "better-auth/react";

// Use the current origin when in browser, or empty string for same-origin requests
// better-auth will automatically use the current origin if baseURL is not provided
const getBaseURL = () => {
  if (typeof window !== "undefined") {
    // In browser: use current origin (works for both localhost and Vercel)
    return window.location.origin;
  }
  // SSR: use environment variable or default to localhost
  return process.env.VITE_BASE_URL || "http://localhost:3000";
};

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: getBaseURL(),
});

export const { signIn, signUp, useSession, signOut } = authClient;
