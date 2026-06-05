import { About } from "./blocks/about";
import { CTA } from "./blocks/cta";
import { Footer } from "./blocks/footer";
import { Gallery } from "./blocks/gallery";
import { Hero } from "./blocks/hero";
import { Location } from "./blocks/location";
import { Navigation } from "./blocks/navigation";
import { Reviews } from "./blocks/reviews";
import { Services } from "./blocks/services";
import { Stats } from "./blocks/stats";
import { tweakcnThemes } from "./tweakcn-themes";
import type { WebsiteData } from "./types";

const SANS = "var(--font-sans)";

function buildRootStyles(data: WebsiteData) {
  const theme = tweakcnThemes[data.tweakcnThemeKey];
  const style = data.isDarkMode ? theme?.dark : theme?.light;

  const themeVars = Object.entries(style ?? {})
    .filter(([, v]) => v != null)
    .map(([k, v]) => `  --${k}: ${v};`)
    .join("\n");

  const opacityEntries: [string, number[]][] = [
    ["primary", [10, 20, 30, 60, 70]],
    ["foreground", [10, 25, 30, 40, 50, 60, 70, 80]],
  ];

  const opacityVars = opacityEntries
    .flatMap(([name, opacities]) =>
      opacities.map(
        (op) =>
          `  --${name}-${op}: color-mix(in srgb, var(--${name}) ${op}%, transparent);`,
      ),
    )
    .join("\n");

  return `:root {\n${themeVars}\n${opacityVars}\n}`;
}

export function Template({ data }: { data: WebsiteData }) {
  return (
    <html lang="es">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{data.place.name}</title>
        <script src="https://cdn.tailwindcss.com" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
          document.addEventListener('click', function(e) {
            var a = e.target.closest('a[href^="#"]');
            if (!a) return;
            var id = a.getAttribute('href').slice(1);
            var el = document.getElementById(id);
            if (!el) return;
            e.preventDefault();
            el.scrollIntoView({ behavior: 'smooth' });
          });
        `,
          }}
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Montserrat:wght@300;400;500&display=swap"
        />
        <style dangerouslySetInnerHTML={{ __html: buildRootStyles(data) }} />
      </head>
      <body>
        <div
          className="min-h-screen bg-[var(--background)] text-[var(--foreground)]"
          style={{ fontFamily: SANS }}
        >
          <Navigation data={data} />
          <Hero data={data} />
          <Stats data={data} />
          <About data={data} />
          <Gallery data={data} />
          <Reviews data={data} />
          <Services />
          <Location data={data} />
          <CTA />
          <Footer data={data} />
        </div>
      </body>
    </html>
  );
}
