/** @jsxRuntime automatic @jsxImportSource react */
import { HomepageBody } from './homepage-body';
import { ServicePageBody } from './service-page-body';
import { renderHomepageJsonLd, renderServicePageJsonLd } from './structured-data';
import { buildRootStyles } from './styles';
import type { ServicePage, TemplateData } from './types';

function DocumentHead({
  data,
  title,
  description,
  domain,
  imageUrl,
  jsonLd,
}: {
  data: TemplateData;
  title: string;
  description: string;
  domain: string;
  imageUrl: string;
  jsonLd: string;
}) {
  return (
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {domain && <link rel="canonical" href={domain} />}
      {data.blocks.logoUrl && <link rel="icon" href={data.blocks.logoUrl} />}

      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      {description && <meta property="og:description" content={description} />}
      {domain && <meta property="og:url" content={domain} />}
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

  return (
    <html lang="en" className="scroll-smooth">
      <DocumentHead
        data={data}
        title={title}
        description={description}
        domain={data.domain}
        imageUrl={data.blocks.homepage.hero.imageUrl}
        jsonLd={renderHomepageJsonLd(data)}
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
  const domain = data.domain ? `${data.domain}/${page.slug}` : '';

  return (
    <html lang="en" className="scroll-smooth">
      <DocumentHead
        data={data}
        title={title}
        description={description}
        domain={domain}
        imageUrl={page.heroImageUrl}
        jsonLd={renderServicePageJsonLd(data, page)}
      />
      <body>
        <ServicePageBody data={data} page={page} />
      </body>
    </html>
  );
}
