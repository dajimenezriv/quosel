import { useEffect, useState } from "react";

export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export type User = {
  id: string;
  email: string;
  name: string | null;
  picture: string | null;
};

export function loginWithGoogle() {
  window.location.href = `${API_URL}/auth/google`;
}

export async function logout() {
  await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
}

export async function fetchMe(): Promise<User | null> {
  const res = await fetch(`${API_URL}/auth/me`, { credentials: "include" });
  if (!res.ok) return null;
  const data = (await res.json()) as { user: User | null };
  return data.user;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMe()
      .then(setUser)
      .finally(() => setLoading(false));
  }, []);

  return {
    user,
    loading,
    login: loginWithGoogle,
    logout: async () => {
      await logout();
      setUser(null);
    },
  };
}
