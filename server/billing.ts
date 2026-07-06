import type Stripe from "stripe";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import * as db from "./db";
import {
  formatStripePrice,
  getStripeClient,
  getStripePremiumPriceId,
  isStripeConfigured,
} from "./_core/stripe";
import { protectedProcedure, publicProcedure, router } from "./_core/trpc";

async function getDisplayPrice() {
  const fallback = process.env.EXPO_PUBLIC_STRIPE_PRICE_LABEL?.trim() || null;
  if (!isStripeConfigured()) {
    return { configured: false, priceLabel: fallback };
  }

  try {
    const stripe = getStripeClient();
    const price = await stripe.prices.retrieve(getStripePremiumPriceId());
    return {
      configured: true,
      priceLabel: formatStripePrice(price.unit_amount, price.currency) ?? fallback,
    };
  } catch (error) {
    console.warn("[Billing] Failed to load Stripe price:", error);
    return { configured: true, priceLabel: fallback };
  }
}

async function grantPremiumFromCheckoutSession(session: {
  id: string;
  payment_status: string | null;
  metadata: Stripe.Metadata | null;
  client_reference_id: string | null;
  customer: string | Stripe.Customer | Stripe.DeletedCustomer | null;
  customer_email: string | null;
}) {
  if (session.payment_status !== "paid") {
    return false;
  }

  const openId = session.metadata?.openId ?? session.client_reference_id;
  if (!openId) {
    console.warn("[Billing] Checkout session missing openId metadata:", session.id);
    return false;
  }

  const customerId =
    typeof session.customer === "string"
      ? session.customer
      : session.customer && "id" in session.customer
        ? session.customer.id
        : null;

  await db.recordPremiumPurchase({
    openId,
    email: session.customer_email,
    stripeSessionId: session.id,
    stripeCustomerId: customerId,
  });

  return true;
}

export const billingRouter = router({
  getProduct: publicProcedure.query(async () => getDisplayPrice()),

  getStatus: protectedProcedure.query(async ({ ctx }) => {
    const isPremium = await db.hasPremiumPurchase(ctx.user.openId);
    return { isPremium };
  }),

  createCheckoutSession: protectedProcedure
    .input(
      z.object({
        successUrl: z.string().url(),
        cancelUrl: z.string().url(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!isStripeConfigured()) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "Stripe is not configured on the server.",
        });
      }

      const stripe = getStripeClient();
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        customer_email: ctx.user.email ?? undefined,
        client_reference_id: ctx.user.openId,
        metadata: {
          openId: ctx.user.openId,
        },
        line_items: [
          {
            price: getStripePremiumPriceId(),
            quantity: 1,
          },
        ],
        success_url: input.successUrl,
        cancel_url: input.cancelUrl,
      });

      if (!session.url) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Stripe did not return a checkout URL.",
        });
      }

      return { url: session.url };
    }),

  verifyCheckoutSession: protectedProcedure
    .input(z.object({ sessionId: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      if (!isStripeConfigured()) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: "Stripe is not configured on the server.",
        });
      }

      const stripe = getStripeClient();
      const session = await stripe.checkout.sessions.retrieve(input.sessionId);
      const sessionOpenId = session.metadata?.openId ?? session.client_reference_id;

      if (!sessionOpenId || sessionOpenId !== ctx.user.openId) {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "This checkout session does not belong to the current user.",
        });
      }

      const isPremium = await grantPremiumFromCheckoutSession(session);
      return { isPremium };
    }),
});

export async function handleStripeCheckoutCompleted(sessionId: string) {
  if (!isStripeConfigured()) return false;

  const stripe = getStripeClient();
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  return grantPremiumFromCheckoutSession(session);
}
