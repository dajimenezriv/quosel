type Loose = Record<string, unknown>;

const defaultFooter = {
  type: 'footer',
  description: '',
  navigateTitle: 'Navigate',
  contactTitle: 'Contact',
  linksTitle: 'Booking & Social',
  links: [],
  legalLinks: [],
};

// v2 kept the footer as a block inside `homepage.blocks`. v3 promotes it to a top-level,
// site-wide `footer` field (like `nav`), removing it from the homepage blocks.
export function v2ToV3(raw: Loose): Loose {
  const homepage = (raw.homepage ?? {}) as Loose;
  const list = (Array.isArray(homepage.blocks) ? homepage.blocks : []) as Loose[];
  const footer = list.find((b) => b.type === 'footer') ?? defaultFooter;
  const rest = list.filter((b) => b.type !== 'footer');

  return { ...raw, schemaVersion: 3, footer, homepage: { ...homepage, blocks: rest } };
}
