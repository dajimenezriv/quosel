import { env } from '@/core/env';

const BASE_URL = `https://api.cloudflare.com/client/v4/accounts/${env.CLOUDFLARE_ACCOUNT_ID}/storage/kv/namespaces/${env.DOMAINS_KV_NAMESPACE_ID}/values`;

const headers = { Authorization: `Bearer ${env.CLOUDFLARE_API_TOKEN}` };

export class KV {
  static async put(key: string, value: string) {
    const res = await fetch(`${BASE_URL}/${encodeURIComponent(key)}`, { method: 'PUT', headers, body: value });
    if (!res.ok) {
      throw new Error(`KV put failed (${res.status}): ${await res.text()}`);
    }
  }

  static async delete(key: string) {
    const res = await fetch(`${BASE_URL}/${encodeURIComponent(key)}`, { method: 'DELETE', headers });
    // A missing key is already in the desired state.
    if (!res.ok && res.status !== 404) {
      throw new Error(`KV delete failed (${res.status}): ${await res.text()}`);
    }
  }
}
