/** @jsxRuntime automatic @jsxImportSource react */
import { HomepageBody } from './homepage-body';
import { ServicePageBody } from './service-page-body';
import { buildRootStyles } from './styles';
import type { ServicePage, TemplateData } from './types';

function DocumentHead({
  data,
  title,
  description,
  canonicalUrl,
  imageUrl,
  jsonLd,
}: {
  data: TemplateData;
  title: string;
  description: string;
  canonicalUrl: string;
  imageUrl: string;
  jsonLd: string;
}) {
  return (
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {data.blocks.logoUrl && <link rel="icon" href={data.blocks.logoUrl} />}

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      {imageUrl && <meta property="og:image" content={imageUrl} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
      <style type="text/tailwindcss" dangerouslySetInnerHTML={{ __html: buildRootStyles(data) }} />
    </head>
  );
}

export function Template({ data }: { data: TemplateData }) {
  const title = data.blocks.metaTitle || data.blocks.name;
  const description = data.blocks.metaDescription;

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: data.blocks.name,
    address: data.blocks.address,
    telephone: data.blocks.phone,
  });

  return (
    <html lang="en" className="scroll-smooth">
      <DocumentHead
        data={data}
        title={title}
        description={description}
        canonicalUrl={data.canonicalUrl}
        imageUrl={data.blocks.homepage.hero.imageUrl}
        jsonLd={jsonLd}
      />
      <body>
        <HomepageBody data={data} />
      </body>
    </html>
  );
}

export function ServicePageTemplate({ data, page }: { data: TemplateData; page: ServicePage }) {
  const title = page.metaTitle || page.h1;
  const description = page.metaDescription;
  const canonicalUrl = data.canonicalUrl ? `${data.canonicalUrl}/${page.slug}` : '';

  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: page.h1,
        provider: {
          '@type': 'LocalBusiness',
          name: data.blocks.name,
          address: data.blocks.address,
          telephone: data.blocks.phone,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: data.blocks.name, item: data.canonicalUrl },
          { '@type': 'ListItem', position: 2, name: page.h1, item: canonicalUrl },
        ],
      },
    ],
  });

  return (
    <html lang="en" className="scroll-smooth">
      <DocumentHead
        data={data}
        title={title}
        description={description}
        canonicalUrl={canonicalUrl}
        imageUrl={page.heroImageUrl}
        jsonLd={jsonLd}
      />
      <body>
        <ServicePageBody data={data} page={page} />
      </body>
    </html>
  );
}
