import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2026-02-25.clover',
});

export const PLANS = {
  monthly: {
    name: 'Monthly',
    priceId: process.env.STRIPE_MONTHLY_PRICE_ID || 'price_monthly_placeholder',
    amount: 499,
  },
  yearly: {
    name: 'Yearly',
    priceId: process.env.STRIPE_YEARLY_PRICE_ID || 'price_yearly_placeholder',
    amount: 3999,
  },
} as const;

export type PlanType = keyof typeof PLANS;

export async function createCheckoutSession(userId: string, plan: PlanType, successUrl: string, cancelUrl: string) {
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: PLANS[plan].priceId,
        quantity: 1,
      },
    ],
    metadata: {
      userId,
      plan,
    },
    success_url: successUrl,
    cancel_url: cancelUrl,
  });

  return session;
}

export async function createPortalSession(customerId: string, returnUrl: string) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: returnUrl,
  });

  return session;
}

export async function cancelSubscription(subscriptionId: string) {
  return stripe.subscriptions.cancel(subscriptionId);
}

export async function getSubscription(subscriptionId: string) {
  return stripe.subscriptions.retrieve(subscriptionId);
}
