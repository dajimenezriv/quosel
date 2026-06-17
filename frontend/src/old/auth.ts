import { client } from '@/api/client';
import { env } from '@/core/env';
import { useEffect, useState } from 'react';
import type { SubscriptionStatus } from './billing';

export type User = {
  id: string;
  email: string;
  name: string | null;
  picture: string | null;
  subscriptionStatus: SubscriptionStatus;
};

export function loginWithGoogle() {
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
