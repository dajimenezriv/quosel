import posthog from 'posthog-js';
import { useEffect, useState } from 'react';
import { env } from '@/core/env';
import type { SubscriptionStatus } from './billing';

export const API_URL = env.VITE_API_URL;

export type User = {
  id: string;
  email: string;
  name: string | null;
  picture: string | null;
  subscriptionStatus: SubscriptionStatus;
  currentPeriodEnd: string | null;
};

function loginWithGoogle() {
  posthog.capture('login');
  window.location.href = `${API_URL}/auth/google`;
}

async function logout() {
  posthog.capture('logout');
  await fetch(`${API_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
  });
}

async function fetchMe(): Promise<User | null> {
  const res = await fetch(`${API_URL}/auth/me`, { credentials: 'include' });
  if (!res.ok) return null;
  const data = (await res.json()) as { user: User | null };
  return data.user;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = () =>
    fetchMe().then((u) => {
      setUser(u);
      if (u) {
        posthog.identify(u.id, {
          email: u.email,
          name: u.name,
          subscription_status: u.subscriptionStatus,
        });
      }
    });

  useEffect(() => {
    refresh().finally(() => setLoading(false));
  }, []);

  return {
    user,
    loading,
    login: loginWithGoogle,
    logout: async () => {
      await logout();
      setUser(null);
      posthog.reset();
    },
    refresh,
  };
}
