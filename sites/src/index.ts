interface Env {
  SITES: R2Bucket;
  DOMAINS: KVNamespace;
}

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);
    const host = request.headers.get("host") ?? "";

    const slug = host.endsWith("quosel.com")
      ? // Platform hosts route by path ("/acme" -> "acme").
        url.pathname.split("/")[1]
      : // Custom domains (gestelsl.es) route by hostname via KV lookup.
        await env.DOMAINS.get(host);
    if (!slug) return new Response("Not found", { status: 404 });

    const object = await env.SITES.get(`websites/${slug}.html`);
    if (!object) return new Response("Not found", { status: 404 });

    return new Response(object.body, {
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "public, max-age=60",
      },
    });
  },
};
