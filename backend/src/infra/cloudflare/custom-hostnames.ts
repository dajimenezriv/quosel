import { env } from '@/core/env';

const BASE_URL = `https://api.cloudflare.com/client/v4/zones/${env.CLOUDFLARE_SITES_ZONE_ID}/custom_hostnames`;

const headers = {
  Authorization: `Bearer ${env.CLOUDFLARE_API_TOKEN}`,
  'Content-Type': 'application/json',
};

interface CustomHostname {
  id: string;
  status: string;
  ssl: { status: string };
}

export class CustomHostnames {
  // Register the custom hostname and request a DV cert validated over HTTP: no TXT
  // records, the cert issues once the customer's www CNAME points at us. Re-adding
  // an existing hostname is a no-op so retries are safe.
  static async create(hostname: string) {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers,
      body: JSON.stringify({ hostname, ssl: { method: 'http', type: 'dv' } }),
    });
    if (res.ok) return;

    // 1406 = "custom hostname already exists"; that is the desired state.
    const body = await res.text();
    if (body.includes('1406')) return;
    throw new Error(`Custom hostname create failed (${res.status}): ${body}`);
  }

  static async getByHostname(hostname: string): Promise<CustomHostname | null> {
    const res = await fetch(`${BASE_URL}?hostname=${encodeURIComponent(hostname)}`, { headers });
    if (!res.ok) {
      throw new Error(`Custom hostname lookup failed (${res.status}): ${await res.text()}`);
    }

    const data = await res.json();
    const { result } = data as { result: CustomHostname[] };
    return result[0] ?? null;
  }

  static async delete(hostname: string) {
    const existing = await this.getByHostname(hostname);
    if (!existing) return;

    const res = await fetch(`${BASE_URL}/${existing.id}`, { method: 'DELETE', headers });
    if (!res.ok && res.status !== 404) {
      throw new Error(`Custom hostname delete failed (${res.status}): ${await res.text()}`);
    }
  }
}
