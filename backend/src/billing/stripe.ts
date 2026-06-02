import Stripe from 'stripe';
import { env } from '../core/env';

export const stripe = new Stripe(env.STRIPE_SECRET_KEY);

export const STRIPE_PRICE_ID = env.STRIPE_PRICE_ID;
export const STRIPE_WEBHOOK_SECRET = env.STRIPE_WEBHOOK_SECRET;
export const TRIAL_DAYS = 7;
