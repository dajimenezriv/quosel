type Loose = Record<string, unknown>;

// v3 stored gallery images as a flat array of URL strings. v4 makes each image an object
// `{ url, alt }` so an SEO/accessibility description can travel with the URL. New `imageAlt`
// fields on hero/info/cta blocks are filled by their schema defaults on parse.
export function v3ToV4(raw: Loose): Loose {
  const homepage = (raw.homepage ?? {}) as Loose;
  const list = (Array.isArray(homepage.blocks) ? homepage.blocks : []) as Loose[];

  const blocks = list.map((block) => {
    if (block.type !== 'gallery' || !Array.isArray(block.images)) return block;
    const images = block.images.map((image) => (typeof image === 'string' ? { url: image, alt: '' } : image));
    return { ...block, images };
  });

  return { ...raw, schemaVersion: 4, homepage: { ...homepage, blocks } };
}
