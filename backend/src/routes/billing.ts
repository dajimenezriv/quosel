import { Hono } from "hono";
import { eq } from "drizzle-orm";
import type Stripe from "stripe";
import { db } from "../db/client.ts";
import { users } from "../db/schema.ts";
import {
  stripe,
  STRIPE_PRICE_ID,
  STRIPE_WEBHOOK_SECRET,
  TRIAL_DAYS,
} from "../billing/stripe.ts";
import { requireAuth, type AuthVariables } from "../middleware/auth.ts";

export const billingRouter = new Hono<{ Variables: AuthVariables }>();

const frontendUrl = process.env.FRONTEND_URL ?? "http://localhost:5173";

async function getOrCreateCustomer(userId: string) {
  const [user] = await db.select().from(users).where(eq(users.id, userId));
  if (!user) throw new Error("user not found");

  if (user.stripeCustomerId) {
    try {
      const existing = await stripe.customers.retrieve(user.stripeCustomerId);
      if (!existing.deleted) return user.stripeCustomerId;
    } catch (err) {
      const code = (err as { code?: string })?.code;
      if (code !== "resource_missing") throw err;
    }
  }

  const customer = await stripe.customers.create({
    email: user.email,
    name: user.name ?? undefined,
    metadata: { userId: user.id },
  });

  await db
    .update(users)
    .set({
      stripeCustomerId: customer.id,
      stripeSubscriptionId: null,
      subscriptionStatus: null,
      subscriptionPriceId: null,
      currentPeriodEnd: null,
    })
    .where(eq(users.id, user.id));

  return customer.id;
}

billingRouter.post("/billing/checkout", requireAuth, async (c) => {
  if (!STRIPE_PRICE_ID) return c.json({ error: "price not configured" }, 500);

  const userId = c.get("userId");
  const customerId = await getOrCreateCustomer(userId);

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    line_items: [{ price: STRIPE_PRICE_ID, quantity: 1 }],
    subscription_data: { trial_period_days: TRIAL_DAYS },
    success_url: `${frontendUrl}/?billing=success`,
    cancel_url: `${frontendUrl}/?billing=cancel`,
    allow_promotion_codes: true,
  });

  if (!session.url) return c.json({ error: "no session url" }, 500);
  return c.json({ url: session.url });
});

billingRouter.post("/billing/portal", requireAuth, async (c) => {
  const userId = c.get("userId");
  const customerId = await getOrCreateCustomer(userId);

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${frontendUrl}/`,
  });

  return c.json({ url: session.url });
});

async function syncSubscription(sub: Stripe.Subscription) {
  const customerId =
    typeof sub.customer === "string" ? sub.customer : sub.customer.id;

  const item = sub.items.data[0];
  const periodEnd = item?.current_period_end ?? null;

  await db
    .update(users)
    .set({
      stripeSubscriptionId: sub.id,
      subscriptionStatus: sub.status,
      subscriptionPriceId: item?.price.id ?? null,
      currentPeriodEnd: periodEnd ? new Date(periodEnd * 1000) : null,
    })
    .where(eq(users.stripeCustomerId, customerId));
}

billingRouter.post("/webhooks/stripe", async (c) => {
  if (!STRIPE_WEBHOOK_SECRET)
    return c.json({ error: "webhook secret missing" }, 500);

  const sig = c.req.header("stripe-signature");
  if (!sig) return c.json({ error: "no signature" }, 400);

  const body = await c.req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    const msg = err instanceof Error ? err.message : "invalid signature";
    return c.json({ error: msg }, 400);
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      const subId = session.subscription;
      if (typeof subId === "string") {
        const sub = await stripe.subscriptions.retrieve(subId);
        await syncSubscription(sub);
      }
      break;
    }
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      await syncSubscription(event.data.object);
      break;
    }
    case "invoice.payment_failed": {
      const invoice = event.data.object;
      const customerId =
        typeof invoice.customer === "string"
          ? invoice.customer
          : invoice.customer?.id;
      if (customerId) {
        await db
          .update(users)
          .set({ subscriptionStatus: "past_due" })
          .where(eq(users.stripeCustomerId, customerId));
      }
      break;
    }
  }

  return c.json({ received: true });
});
