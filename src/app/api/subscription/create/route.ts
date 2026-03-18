import { NextResponse } from 'next/server';
import { createCheckoutSession, PlanType } from '@/lib/stripe';
import { createSubscription } from '@/lib/subscription';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { plan, userId } = body;

    if (!userId || !plan) {
      return NextResponse.json(
        { error: 'userId and plan are required' },
        { status: 400 }
      );
    }

    if (!['monthly', 'yearly'].includes(plan)) {
      return NextResponse.json(
        { error: 'Invalid plan' },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
    const origin = new URL(request.url).origin || baseUrl;

    if (process.env.STRIPE_SECRET_KEY && !process.env.STRIPE_SECRET_KEY.includes('placeholder')) {
      const session = await createCheckoutSession(
        userId,
        plan as PlanType,
        `${origin}/subscription?success=true`,
        `${origin}/subscription?cancelled=true`
      );

      return NextResponse.json({ url: session.url });
    }

    const subscription = createSubscription(userId, plan);

    return NextResponse.json(
      {
        message: 'Subscription created (demo mode)',
        subscription: {
          id: subscription.id,
          plan: subscription.plan,
          status: subscription.status,
          endDate: subscription.endDate,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to create subscription' },
      { status: 500 }
    );
  }
}
