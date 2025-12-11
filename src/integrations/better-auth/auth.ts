import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { db } from "@/db";
import { stripe } from "@better-auth/stripe";
import Stripe from "stripe";

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-11-17.clover", // Latest API version as of Stripe SDK v20.0.0
});

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg", // or "mysql", "sqlite"
  }),
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  plugins: [
    tanstackStartCookies(),
    stripe({
      stripeClient,
      stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
      createCustomerOnSignUp: true,
      subscription: {
        enabled: true,
        plans: [
          {
            name: "hobby",
            priceId: "price_1SdAZw5Ytaz6LyDNiAjJbsm3",
            limits: {
              summaries: 10,
              summarySizeInKB: 500,
            },
          },
          {
            name: "pro",
            priceId: "price_1SdALQ5Ytaz6LyDNj9cgcDLs",
            annualDiscountPriceId: "price_1SdAeK5Ytaz6LyDNyztAaKyh",
            limits: {
              summaries: 100,
              summarySizeInKB: 1000,
            },
          },
        ],
      },
    }),
  ],
});
