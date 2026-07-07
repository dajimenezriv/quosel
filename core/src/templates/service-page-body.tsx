/** @jsxRuntime automatic @jsxImportSource react */
import { Footer } from './blocks/footer';
import { Nav } from './blocks/nav';
import { RichText, RichTextBody } from './core/rich-text';
import { pageHref, parseRawData, telHref } from './core/utils';
import type { ServicePage, TemplateData } from './types';

interface Props {
  data: TemplateData;
  page: ServicePage;
}

export function ServicePageBody({ data: rawData, page }: Props) {
  const data = parseRawData(rawData);
  const relatedPages = data.blocks.pages.filter((p) => p.slug !== page.slug);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Nav data={data} />

      <header className="relative flex min-h-[70vh] items-end">
        {page.heroImageUrl && (
          <>
            <img src={page.heroImageUrl} alt={page.heroImageAlt} className="absolute h-full w-full object-cover" />
            <div className="from-background via-background/70 to-background/50 absolute inset-0 bg-linear-to-t" />
          </>
        )}
        <div className="z-10 m-6 flex max-w-full flex-col md:m-30">
          <nav aria-label="Breadcrumb" className="mb-4 text-xs tracking-[0.2em] uppercase">
            <a href={data.homeUrl} className="text-foreground/70 hover:text-foreground transition-colors">
              {data.blocks.name}
            </a>
            <span className="text-foreground/40"> / </span>
            <span className="text-foreground/40">{page.h1}</span>
          </nav>
          <h1 className="text-4xl font-light wrap-break-word sm:text-5xl md:text-7xl">
            <RichText text={page.h1} />
          </h1>
          {page.intro && (
            <p className="mt-8 md:max-w-150">
              <RichText text={page.intro} />
            </p>
          )}
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            {page.ctaText && (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={page.ctaLink}
                className="bg-primary text-primary-foreground px-8 py-3 text-center text-xs tracking-[0.25em] uppercase hover:opacity-90">
                {page.ctaText}
              </a>
            )}
            {data.blocks.phone && (
              <a
                href={telHref(data.blocks.phone)}
                className="hover:border-foreground border-foreground/40 border px-8 py-3 text-center text-xs tracking-[0.2em] uppercase">
                {data.blocks.phone}
              </a>
            )}
          </div>
        </div>
      </header>

      {page.body && (
        <section className="flex justify-center px-6 py-24 md:px-0">
          <div className="w-full max-w-3xl">
            <RichTextBody text={page.body} />
          </div>
        </section>
      )}

      {relatedPages.length > 0 && (
        <section className="flex justify-center px-6 py-24 md:px-0">
          <div className="flex w-full max-w-3xl flex-col gap-8">
            <h2 className="text-4xl">Other services</h2>
            <ul className="flex flex-col">
              {relatedPages.map((related) => (
                <li key={related.slug} className="border-foreground/10 border-t">
                  <a href={pageHref(data, related.slug)} className="hover:text-primary flex py-4 text-lg transition-colors">
                    {related.h1}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {page.ctaText && (
        <section className="flex justify-center px-6 py-24 text-center md:px-0">
          <div className="max-w-2xl px-6">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={page.ctaLink}
              className="bg-primary text-primary-foreground mt-8 inline-block px-8 py-4 text-xs tracking-[0.2em] uppercase transition-colors hover:opacity-90">
              {page.ctaText}
            </a>
          </div>
        </section>
      )}

      <Footer data={data} block={data.blocks.footer} />
    </div>
  );
}
