import { client } from '@/api/client';
import { env } from '@/core/env';
import posthog from 'posthog-js';
import { useEffect, useState } from 'react';
import type { SubscriptionStatus } from './billing';

export type User = {
  id: string;
  email: string;
  name: string | null;
  picture: string | null;
  subscriptionStatus: SubscriptionStatus;
  currentPeriodEnd: string | null;
};

export function loginWithGoogle() {
  posthog.capture('login');
  window.location.href = `${env.VITE_API_URL}/auth/google`;
}

async function fetchMe(): Promise<User | null> {
  const { data, error } = await client.GET('/auth/me');
  if (error) return null;
  return data.user as User | null;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function logout() {
    posthog.capture('logout');
    await client.POST('/auth/logout');
    setUser(null);
    posthog.reset();
  }

  async function refresh() {
    return await fetchMe().then((u) => {
      setUser(u);
      if (u) {
        posthog.identify(u.id, {
          email: u.email,
          name: u.name,
          subscription_status: u.subscriptionStatus,
        });
      }
    });
  }

  useEffect(() => {
    refresh().finally(() => setLoading(false));
  }, []);

  return {
    user,
    loading,
    logout,
    refresh,
  };
}
