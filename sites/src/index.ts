interface Env {
  SITES: R2Bucket;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);

    const slug = pathname.split("/")[1]; // "/acme" -> "acme"
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
