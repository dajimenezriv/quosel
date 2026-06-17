export type SubscriptionStatus =
  | 'trialing'
  | 'active'
  | 'past_due'
  | 'canceled'
  | 'incomplete'
  | 'incomplete_expired'
  | 'unpaid'
  | 'paused'
  | null;

export function isSubscribed(status: SubscriptionStatus): boolean {
  return status === 'active' || status === 'trialing';
}
