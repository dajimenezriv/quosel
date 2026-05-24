import posthog from "posthog-js";
import { API_URL } from "./auth";

async function postJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) throw new Error(`${path} failed: ${res.status}`);
  return (await res.json()) as T;
}

export async function startCheckout() {
  posthog.capture("subscribe_clicked");
  const { url } = await postJson<{ url: string }>("/billing/checkout");
  window.location.href = url;
}

export async function openPortal() {
  posthog.capture("portal_opened");
  const { url } = await postJson<{ url: string }>("/billing/portal");
  window.location.href = url;
}

export type SubscriptionStatus =
  | "trialing"
  | "active"
  | "past_due"
  | "canceled"
  | "incomplete"
  | "incomplete_expired"
  | "unpaid"
  | "paused"
  | null;

export function isSubscribed(status: SubscriptionStatus): boolean {
  return status === "active" || status === "trialing";
}
