interface Env {
  SITES: R2Bucket;
  DOMAINS: KVNamespace;
}

export default {
  async fetch(request: Request, env: Env) {
    const url = new URL(request.url);
    const host = request.headers.get("host") ?? "";
    const segments = url.pathname.split("/").filter(Boolean);

    // On platform hosts the first path segment is the site ("/acme/service" -> "acme" + "service").
    // On custom domains the site comes from KV and the whole path is the page ("/service").
    const platform = host.endsWith("quosel.com");
    let slug: string | null;
    let pageSlug: string | undefined;
    if (platform) {
      slug = segments[0] ?? null;
      pageSlug = segments[1];
    } else {
      slug = await env.DOMAINS.get(host);
      pageSlug = segments[0];
    }
    if (!slug) return new Response("Not found", { status: 404 });

    // Everything lives under websites/{slug}/: the homepage is index.html, pages are {pageSlug}.html.
    // Requests with an extension (sitemap.xml, robots.txt) map to that literal file.
    const key = !pageSlug
      ? `websites/${slug}/index.html`
      : pageSlug.includes(".")
        ? `websites/${slug}/${pageSlug}`
        : `websites/${slug}/${pageSlug}.html`;

    const object = await env.SITES.get(key);
    if (!object) return new Response("Not found", { status: 404 });

    const contentType = key.endsWith(".xml")
      ? "application/xml; charset=utf-8"
      : key.endsWith(".txt")
        ? "text/plain; charset=utf-8"
        : "text/html; charset=utf-8";

    return new Response(object.body, {
      headers: {
        "content-type": contentType,
        "cache-control": "public, max-age=60",
      },
    });
  },
};
