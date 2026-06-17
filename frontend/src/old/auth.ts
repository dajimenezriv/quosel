import { client } from '@/api/client';
import type { components } from '@/api/schema';
import { env } from '@/core/env';
import { useEffect, useState } from 'react';
import type { SubscriptionStatus } from './billing';

export type Me = components['schemas']['Me'] & {
  subscriptionStatus: SubscriptionStatus;
};

export function loginWithGoogle() {
  window.location.href = `${env.VITE_API_URL}/auth/google`;
}

async function fetchMe(): Promise<Me | null> {
  const { data, error } = await client.GET('/auth/me');
  if (error) return null;
  return data.user as Me | null;
}

export function useAuth() {
  const [user, setUser] = useState<Me | null>(null);
  const [loading, setLoading] = useState(true);

  async function logout() {
    await client.POST('/auth/logout');
    setUser(null);
  }

  async function refresh() {
    return await fetchMe().then((u) => {
      setUser(u);
    });
  }

  useEffect(() => {
    void refresh().finally(() => setLoading(false));
  }, []);

  return {
    user,
    loading,
    logout,
    refresh,
  };
}
