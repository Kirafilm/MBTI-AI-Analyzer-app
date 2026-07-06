import Stripe from "stripe";

let stripeClient: Stripe | null = null;

export function getStripeSecretKey() {
  return process.env.STRIPE_SECRET_KEY ?? "";
}

export function getStripePremiumPriceId() {
  return process.env.STRIPE_PREMIUM_PRICE_ID ?? "";
}

export function getStripeWebhookSecret() {
  return process.env.STRIPE_WEBHOOK_SECRET ?? "";
}

export function isStripeConfigured() {
  return Boolean(getStripeSecretKey() && getStripePremiumPriceId());
}

export function getStripeClient() {
  const secretKey = getStripeSecretKey();
  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }

  if (!stripeClient) {
    stripeClient = new Stripe(secretKey);
  }

  return stripeClient;
}

export function formatStripePrice(amount: number | null | undefined, currency: string | null | undefined) {
  if (amount == null || !currency) return null;

  try {
    return new Intl.NumberFormat("zh-HK", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount / 100);
  } catch {
    return `${currency.toUpperCase()} ${(amount / 100).toFixed(2)}`;
  }
}
