import { tweakcnThemes } from "./tweakcn-themes";
import type { WebsiteData } from "./types";

const SERIF = "var(--font-serif)";
const SANS = "var(--font-sans)";

function buildRootStyles(data: WebsiteData): string {
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

function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

const NAV_LINKS = [
  "Sobre Nosotros",
  "Barbero",
  "Servicios",
  "Galería",
  "Visitas",
  "Reseñas",
  "Visítanos",
];

const REVIEWS = [
  {
    text: "Llevo años yendo a esta barbería y la verdad que estoy tan contento como el primer día. Cuidan mucho del cliente, precios muy económicos y muy buen ambiente.",
    author: "Miguel Ángel S.",
    source: "Google",
  },
  {
    text: "Más de 2 años acudiendo a la barbería y un tratamiento perfecto y buen ambiente. 10/10.",
    author: "Álvaro M.",
    source: "Google",
  },
  {
    text: "La mejor barbería de Valencia. La atención muy buena y el corte perfecto. Repetiré sin duda.",
    author: "Adrián S.",
    source: "Booksy · Cliente Verificado",
  },
];

const SERVICE_GROUPS = [
  {
    name: "MÁS POPULARES",
    tag: "TOP DE LA BARBERÍA",
    items: [
      {
        name: "Corte Degradado",
        desc: "Un corte diseñado según tu estilo, tipo de rostro y personalidad.",
        duration: "30 MIN",
        price: "16€",
      },
      {
        name: "Corte + Barba",
        desc: "El combo de la casa: corte preciso y barba perfectamente arreglada.",
        duration: "40 MIN",
        price: "21€",
      },
      {
        name: "Corte + Cejas",
        desc: "Corte profesional según tu estilo, acompañado del perfilado de cejas.",
        duration: "35 MIN",
        price: "17€",
      },
    ],
  },
  {
    name: "PREMIUM",
    tag: "EXPERIENCIA COMPLETA",
    items: [
      {
        name: "Detox capilar",
        desc: "Limpieza profunda del cuero cabelludo que elimina residuos, grasa y toxinas.",
        duration: "35 MIN",
        price: "20€",
      },
      {
        name: "Corte de cabello full",
        desc: "Servicio completo: asesoría personalizada y corte preciso según tu rostro.",
        duration: "50 MIN",
        price: "25€",
      },
      {
        name: "Corte y barba — ritual afeitado",
        desc: "Experiencia premium. Corte + arreglo de barba con ritual de toalla caliente.",
        duration: "90 MIN",
        price: "30€",
      },
    ],
  },
  {
    name: "SERVICIO ACTUAL",
    tag: null,
    items: [
      {
        name: "Servicio de barba full",
        desc: "Barba y limpieza con ozono. Perfilamos, definimos y damos forma.",
        duration: "30 MIN",
        price: "15€",
      },
      {
        name: "Corte solo a tijera",
        desc: "Servicio de corte a tijera para cabello largo.",
        duration: "45 MIN",
        price: "17€",
      },
      {
        name: "Retoque cejas, oídos y nariz",
        desc: "Servicio de higiene y detalle (pinzas o cera). Mejora la apariencia del rostro.",
        duration: "10 MIN",
        price: "5€",
      },
    ],
  },
  {
    name: "NIÑOS",
    tag: null,
    items: [
      {
        name: "Corte niño - hasta 10 años",
        desc: "Corte adaptado a los más pequeños. Con paciencia y buen ambiente.",
        duration: "10 MIN",
        price: "12€",
      },
    ],
  },
  {
    name: "DECOLORACIÓN & RIZADO PERMANENTE",
    tag: null,
    items: [
      {
        name: "Color, alisados y permanente",
        desc: "El precio se define tras una evaluación previa del cabello.",
        duration: "s.c.",
        price: "60€+",
      },
    ],
  },
];

export function Template({ data }: { data: WebsiteData }) {
  const initials = getInitials(data.place.name);

  const stats = [
    {
      value: data.place.rating
        ? `${data.place.rating.toString().replace(".", ",")}★`
        : "–",
      label: `GOOGLE · ${data.place.userRatingCount ?? 0} RESEÑAS`,
    },
    { value: "4,9★", label: "BOOKSY · 324 RESEÑAS" },
    { value: "+1K", label: "SEGUIDORES EN INSTAGRAM" },
    { value: "L-S", label: "MAÑANA Y TARDE" },
  ];

  return (
    <html lang="es">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{data.place.name}</title>
        <script src="https://cdn.tailwindcss.com" />
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
          {/* Navigation */}
          <nav className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-10 py-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--primary)]">
                <span className="text-xs font-light tracking-wider text-[var(--primary)]">
                  {initials}
                </span>
              </div>
              <span className="text-xs tracking-[0.25em] uppercase">
                {data.place.name}
              </span>
            </div>

            <div className="hidden items-center gap-8 md:flex">
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-xs tracking-[0.15em] uppercase text-[var(--foreground-70)] transition-colors hover:text-[var(--foreground)]"
                >
                  {link}
                </a>
              ))}
            </div>

            <a
              href="#"
              className="border border-[var(--primary)] px-6 py-2 text-xs tracking-[0.2em] uppercase text-[var(--primary)] transition-all hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)]"
            >
              Reservar
            </a>
          </nav>

          {/* Hero */}
          <section className="relative flex min-h-screen items-center">
            <div className="absolute inset-0">
              <div className="h-full w-full bg-[var(--popover)]" />
            </div>

            <div className="relative z-10 px-6 pb-24 md:px-24">
              <h1 className="leading-none" style={{ fontFamily: SERIF }}>
                <span className="block text-5xl font-light text-[var(--foreground)] md:text-7xl lg:text-8xl">
                  Tu barbero,
                </span>
                <span className="block text-5xl font-light italic text-[var(--primary)] md:text-7xl lg:text-8xl">
                  {data.place.name}.
                </span>
              </h1>

              {data.place.formattedAddress && (
                <p
                  className="mt-8 max-w-xs text-base italic text-[var(--foreground-70)] md:max-w-sm"
                  style={{ fontFamily: SERIF }}
                >
                  {data.place.formattedAddress}
                  {data.place.rating !== null && (
                    <>
                      {" "}
                      · ★ {data.place.rating} ({data.place.userRatingCount}{" "}
                      reseñas)
                    </>
                  )}
                </p>
              )}

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a
                  href="#"
                  className="bg-[var(--primary)] px-8 py-3 text-center text-xs tracking-[0.25em] uppercase text-[var(--primary-foreground)] transition-colors hover:opacity-90"
                >
                  Reservar Cita
                </a>
                {data.place.internationalPhoneNumber && (
                  <a
                    href={`tel:${data.place.internationalPhoneNumber}`}
                    className="border border-[var(--foreground-40)] px-8 py-3 text-center text-xs tracking-[0.2em] uppercase transition-colors hover:border-[var(--foreground)]"
                  >
                    {data.place.internationalPhoneNumber}
                  </a>
                )}
              </div>
            </div>

            <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3">
              <span className="text-xs tracking-[0.3em] uppercase text-[var(--foreground-40)]">
                Scroll
              </span>
              <div className="h-12 w-px bg-[var(--foreground-30)]" />
            </div>
          </section>

          {/* Stats bar */}
          <section className="grid grid-cols-2 border-b border-t border-[var(--foreground-10)] bg-[var(--card)] md:grid-cols-4">
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`px-10 py-8 text-center border-[var(--foreground-10)]${
                  i % 2 === 0 ? " border-r" : ""
                }${i < 2 ? " border-b md:border-b-0" : ""}${
                  i % 2 !== 0 && i < 3 ? " md:border-r" : ""
                }`}
              >
                <div
                  className="text-3xl font-light italic text-[var(--primary)]"
                  style={{ fontFamily: SERIF }}
                >
                  {stat.value}
                </div>
                <div className="mt-2 text-xs tracking-[0.2em] uppercase text-[var(--foreground-40)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </section>

          {/* About section */}
          <section className="grid gap-8 bg-[var(--card)] px-6 py-12 md:gap-16 md:px-24 md:py-24 md:grid-cols-2">
            <div>
              <p className="mb-6 text-xs tracking-[0.25em] uppercase text-[var(--primary)]">
                — Sobre Nosotros
              </p>
              <h2
                className="text-5xl font-light leading-tight"
                style={{ fontFamily: SERIF }}
              >
                Una barbería{" "}
                <em className="italic text-[var(--primary)]">
                  {data.place.name}
                </em>
                , para el barrio.
              </h2>
              <blockquote
                className="mt-10 border-l-2 border-[var(--primary)] pl-6 text-lg italic text-[var(--foreground-70)]"
                style={{ fontFamily: SERIF }}
              >
                Cortes de calidad, atención personalizada y el ambiente del
                barrio. Sin prisas, sin trámites, sin sorpresas.
              </blockquote>
              <div className="mt-6 space-y-4 text-sm leading-relaxed text-[var(--foreground-60)]">
                <p>
                  Llevamos años haciendo lo mismo:{" "}
                  <span className="text-[var(--primary)]">
                    cortes precisos, barbas trabajadas con calma y un acabado
                    que se nota a la mano.
                  </span>{" "}
                  Cada cliente, un caso. Cada visita, un trato cercano.
                </p>
                <p>
                  Por la silla pasan vecinos de toda la vida, estudiantes,
                  padres con sus hijos y gente que viene desde otros barrios
                  buscando un corte que dure. Nos preocupa más tu próxima visita
                  que la caja de hoy.
                </p>
                {data.place.formattedAddress && (
                  <p>
                    Reserva online o ven a conocernos. Estamos en{" "}
                    <span className="text-[var(--primary)]">
                      {data.place.formattedAddress}
                    </span>
                    .
                  </p>
                )}
              </div>
            </div>

            <div className="relative min-h-80 bg-[var(--muted)]" />
          </section>

          {/* Services section */}
          <section className="bg-[var(--background)] px-6 py-12 md:px-24 md:py-20">
            {/* Header */}
            <div className="mb-8 grid gap-6 md:mb-16 md:grid-cols-2 md:items-start md:gap-16">
              <div>
                <p className="mb-4 text-xs tracking-[0.25em] uppercase text-[var(--primary)]">
                  — Carta
                </p>
                <h2
                  className="text-5xl font-light leading-tight text-[var(--foreground)]"
                  style={{ fontFamily: SERIF }}
                >
                  Servicios{" "}
                  <em className="italic text-[var(--primary)]">&amp;</em>{" "}
                  precios.
                </h2>
              </div>
              <p
                className="text-sm italic leading-relaxed text-[var(--foreground-50)] md:pt-14"
                style={{ fontFamily: SERIF }}
              >
                Reserva directo en Booksy: elige el servicio, el día y la hora.
                Sin sorpresas, sin letra pequeña.
              </p>
            </div>

            {/* Service groups */}
            <div className="space-y-12">
              {SERVICE_GROUPS.map((group) => (
                <div key={group.name}>
                  {/* Category header */}
                  <div className="mb-4 flex items-center justify-between border-b border-[var(--primary-30)] pb-2">
                    <span className="text-xs tracking-[0.2em] uppercase text-[var(--primary)]">
                      {group.name}
                    </span>
                    {group.tag && (
                      <span className="text-xs tracking-[0.2em] uppercase text-[var(--foreground-25)]">
                        + {group.tag}
                      </span>
                    )}
                  </div>

                  {/* Items */}
                  <div>
                    {group.items.map((item, i) => (
                      <div key={item.name}>
                        <div className="flex flex-wrap items-start gap-y-1 py-5 md:flex-nowrap md:gap-x-8">
                          <span className="order-1 text-xs tracking-[0.15em] uppercase text-[var(--foreground-30)] md:order-2 md:shrink-0 md:pt-0.5">
                            {item.duration}
                          </span>
                          <span
                            className="order-2 grow text-right text-xl font-light italic text-[var(--primary)] md:order-3 md:w-16 md:shrink-0 md:grow-0"
                            style={{ fontFamily: SERIF }}
                          >
                            {item.price}
                          </span>
                          <div className="order-3 w-full md:order-1 md:w-auto md:flex-1">
                            <p className="text-base text-[var(--foreground)]">
                              {item.name}
                            </p>
                            <p className="mt-1 text-xs leading-relaxed text-[var(--foreground-40)]">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                        {i < group.items.length - 1 && (
                          <div className="border-t border-[var(--foreground-10)]" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-10 flex flex-col gap-4 border-t border-[var(--foreground-10)] pt-8 md:mt-16 md:flex-row md:items-center md:justify-between">
              <p className="text-xs tracking-[0.2em] uppercase text-[var(--foreground-30)]">
                Carta completa disponible en Booksy.
              </p>
              <a
                href="#"
                className="border border-[var(--primary)] bg-[var(--primary-10)] px-6 py-3 text-xs tracking-[0.2em] uppercase text-[var(--primary)] transition-all hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)]"
              >
                Reservar Ahora →
              </a>
            </div>
          </section>

          {/* Gallery section */}
          <section className="bg-[var(--background)] px-6 py-12 md:px-24 md:py-20">
            <div className="mb-8 grid gap-6 md:mb-12 md:grid-cols-2 md:items-start md:gap-16">
              <div>
                <p className="mb-4 text-xs tracking-[0.25em] uppercase text-[var(--primary)]">
                  — Galería
                </p>
                <h2
                  className="text-5xl font-light text-[var(--foreground)]"
                  style={{ fontFamily: SERIF }}
                >
                  Trabajos{" "}
                  <em className="italic text-[var(--primary)]">recientes</em>.
                </h2>
              </div>
              <p
                className="text-sm italic leading-relaxed text-[var(--foreground-50)] md:pt-12"
                style={{ fontFamily: SERIF }}
              >
                Cortes, degradados, barba y detalle. Lo que sale por la puerta
                cada día. Más fotos y vídeos en Instagram.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-square bg-[var(--muted)]" />
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <a
                href="#"
                className="border border-[var(--primary-60)] px-8 py-3 text-xs tracking-[0.2em] uppercase text-[var(--primary)] transition-all hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)]"
              >
                Ver Más en Instagram →
              </a>
            </div>
          </section>

          {/* Reviews section */}
          <section className="bg-[var(--card)] px-6 py-12 md:px-24 md:py-20">
            <div className="mb-8 flex flex-col gap-6 md:mb-16 md:flex-row md:items-start md:justify-between md:gap-16">
              <div>
                <p className="mb-4 text-xs tracking-[0.25em] uppercase text-[var(--primary)]">
                  — Opiniones
                </p>
                <h2
                  className="text-5xl font-light text-[var(--foreground)]"
                  style={{ fontFamily: SERIF }}
                >
                  La voz{" "}
                  <em className="italic text-[var(--primary)]">del cliente</em>.
                </h2>
              </div>

              <div className="shrink-0 border border-[var(--primary-30)] p-6">
                <div className="grid grid-cols-2 divide-x divide-[var(--primary-20)]">
                  <div className="pr-8 text-center">
                    <div
                      className="text-4xl font-light italic text-[var(--primary)]"
                      style={{ fontFamily: SERIF }}
                    >
                      {data.place.rating
                        ? data.place.rating.toString().replace(".", ",")
                        : "–"}
                    </div>
                    <div className="mt-1 text-[var(--primary)]">★★★★★</div>
                    <div className="mt-2 text-xs tracking-[0.15em] uppercase text-[var(--foreground-30)]">
                      Google · {data.place.userRatingCount ?? 0}
                    </div>
                  </div>
                  <div className="pl-8 text-center">
                    <div
                      className="text-4xl font-light italic text-[var(--primary)]"
                      style={{ fontFamily: SERIF }}
                    >
                      4,9
                    </div>
                    <div className="mt-1 text-[var(--primary)]">★★★★★</div>
                    <div className="mt-2 text-xs tracking-[0.15em] uppercase text-[var(--foreground-30)]">
                      Booksy · 324
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {REVIEWS.map((review) => (
                <div
                  key={review.author}
                  className="flex flex-col border border-[var(--foreground-10)] bg-[var(--popover)] p-8"
                >
                  <div className="text-lg text-[var(--primary)]">★★★★★</div>
                  <p
                    className="mt-4 flex-1 text-sm italic leading-relaxed text-[var(--foreground-80)]"
                    style={{ fontFamily: SERIF }}
                  >
                    "{review.text}"
                  </p>
                  <div className="mt-6 flex items-center justify-between border-t border-[var(--foreground-10)] pt-4">
                    <span className="text-xs tracking-[0.15em] uppercase text-[var(--foreground-30)]">
                      {review.author}
                    </span>
                    <span className="text-xs tracking-[0.15em] uppercase text-[var(--foreground-25)]">
                      {review.source}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Visit section */}
          <section className="grid grid-cols-1 bg-[var(--background)] md:grid-cols-2">
            {/* Left: info */}
            <div className="px-6 py-12 md:px-24 md:py-20">
              <p className="mb-6 text-xs tracking-[0.25em] uppercase text-[var(--primary)]">
                — Visítanos
              </p>
              <h2
                className="mb-8 text-5xl font-light leading-tight text-[var(--foreground)] md:mb-14 md:text-7xl"
                style={{ fontFamily: SERIF }}
              >
                {data.place.formattedAddress.split(",")[0]?.trim()},{" "}
                <em className="italic text-[var(--primary)]">
                  {data.place.formattedAddress.split(",")[1]?.trim()}
                </em>
                .
              </h2>

              <div>
                {/* Dirección */}
                <div className="flex gap-12 border-t border-[var(--foreground-10)] py-6">
                  <span className="w-20 shrink-0 text-xs tracking-[0.2em] uppercase text-[var(--primary-70)]">
                    Dirección
                  </span>
                  <div>
                    <p className="text-sm text-[var(--foreground)]">
                      {data.place.formattedAddress
                        .split(",")
                        .slice(0, 2)
                        .join(",")
                        .trim()}{" "}
                      — bajo
                    </p>
                    <p className="mt-1 text-xs text-[var(--foreground-40)]">
                      {data.place.formattedAddress
                        .split(",")
                        .slice(2)
                        .join(",")
                        .trim()}
                    </p>
                  </div>
                </div>

                {/* Teléfono */}
                {data.place.internationalPhoneNumber && (
                  <div className="flex gap-12 border-t border-[var(--foreground-10)] py-6">
                    <span className="w-20 shrink-0 text-xs tracking-[0.2em] uppercase text-[var(--primary-70)]">
                      Teléfono
                    </span>
                    <div>
                      <p className="text-sm text-[var(--foreground)]">
                        {data.place.internationalPhoneNumber}
                      </p>
                      <p className="mt-1 text-xs text-[var(--foreground-40)]">
                        WhatsApp · reservas y consultas
                      </p>
                    </div>
                  </div>
                )}

                {/* Horario */}
                <div className="flex gap-12 border-t border-[var(--foreground-10)] py-6">
                  <span className="w-20 shrink-0 text-xs tracking-[0.2em] uppercase text-[var(--primary-70)]">
                    Horario
                  </span>
                  <div className="space-y-1.5 text-sm">
                    <div className="flex gap-8">
                      <span className="w-36 text-[var(--foreground)]">
                        Lunes — Viernes
                      </span>
                      <span className="text-[var(--foreground-60)]">
                        10:00 — 14:00 · 16:00 — 20:00
                      </span>
                    </div>
                    <div className="flex gap-8">
                      <span className="w-36 text-[var(--foreground)]">
                        Sábado
                      </span>
                      <span className="text-[var(--foreground-60)]">
                        10:00 — 14:00
                      </span>
                    </div>
                    <div className="flex gap-8">
                      <span className="w-36 text-[var(--primary)]">
                        Domingo
                      </span>
                      <span className="text-[var(--primary)]">Cerrado</span>
                    </div>
                  </div>
                </div>

                {/* Reservas */}
                <div className="flex gap-12 border-t border-[var(--foreground-10)] py-6">
                  <span className="w-20 shrink-0 text-xs tracking-[0.2em] uppercase text-[var(--primary-70)]">
                    Reservas
                  </span>
                  <p className="text-sm text-[var(--foreground)]">
                    Booksy · barberodebenimaclet
                  </p>
                </div>

                {/* Redes */}
                <div className="flex gap-12 border-t border-b border-[var(--foreground-10)] py-6">
                  <span className="w-20 shrink-0 text-xs tracking-[0.2em] uppercase text-[var(--primary-70)]">
                    Redes
                  </span>
                  <p className="text-sm text-[var(--foreground)]">
                    Instagram · @barberobenimaclet
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <a
                  href="#"
                  className="bg-[var(--primary)] px-8 py-4 text-xs tracking-[0.2em] uppercase text-[var(--primary-foreground)] transition-colors hover:opacity-90"
                >
                  Reservar Cita →
                </a>
              </div>
            </div>

            {/* Right: Map */}
            <iframe
              src={`https://maps.google.com/maps?q=${encodeURIComponent(data.place.formattedAddress)}&output=embed`}
              className="min-h-80 w-full border-0 md:h-full"
              loading="lazy"
            />
          </section>

          {/* CTA section */}
          <section className="relative flex min-h-96 items-center justify-center py-32 text-center">
            <div className="absolute inset-0 bg-[var(--popover)]" />
            <div className="relative z-10 max-w-2xl px-6 md:px-8">
              <h2
                className="text-4xl font-light italic leading-tight text-[var(--primary)] md:text-6xl"
                style={{ fontFamily: SERIF }}
              >
                Tu próxima cita empieza aquí.
              </h2>
              <p className="mt-6 text-sm leading-relaxed text-[var(--foreground-60)]">
                Reserva en Booksy o síguenos en Instagram. Las dos puertas para
                entrar en la barbería antes incluso de cruzarla.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <a
                  href="#"
                  className="bg-[var(--primary)] px-8 py-4 text-center text-xs tracking-[0.2em] uppercase text-[var(--primary-foreground)] transition-colors hover:opacity-90"
                >
                  Reservar en Booksy →
                </a>
                <a
                  href="#"
                  className="border border-[var(--foreground-40)] px-8 py-4 text-center text-xs tracking-[0.2em] uppercase text-[var(--foreground)] transition-colors hover:border-[var(--foreground)]"
                >
                  Seguir en Instagram →
                </a>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-[var(--card)] px-6 py-12 md:px-24 md:py-16">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
              {/* Logo + description */}
              <div className="col-span-2 md:col-span-1">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--primary)]">
                    <span className="text-xs font-light tracking-wider text-[var(--primary)]">
                      {initials}
                    </span>
                  </div>
                  <span className="text-xs tracking-[0.25em] uppercase text-[var(--foreground)]">
                    {data.place.name}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-[var(--foreground-40)]">
                  Barbería en el corazón del barrio. Cortes, degradados, barba y
                  conversación. Reserva online o pásate a conocernos.
                </p>
              </div>

              {/* Navegar */}
              <div>
                <p className="mb-4 text-xs tracking-[0.2em] uppercase text-[var(--primary)]">
                  Navegar
                </p>
                <ul className="space-y-2">
                  {[
                    "Sobre nosotros",
                    "Barbero",
                    "Servicios",
                    "Galería",
                    "Visitas",
                    "Reseñas",
                  ].map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-xs text-[var(--foreground-40)] transition-colors hover:text-[var(--foreground)]"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contacto */}
              <div>
                <p className="mb-4 text-xs tracking-[0.2em] uppercase text-[var(--primary)]">
                  Contacto
                </p>
                <div className="space-y-2">
                  {data.place.internationalPhoneNumber && (
                    <p className="text-xs font-medium text-[var(--foreground)]">
                      {data.place.internationalPhoneNumber}
                    </p>
                  )}
                  <p className="text-xs font-medium text-[var(--foreground)]">
                    {data.place.formattedAddress
                      .split(",")
                      .slice(0, 2)
                      .join(",")
                      .trim()}
                  </p>
                  <p className="text-xs text-[var(--foreground-40)]">
                    {data.place.formattedAddress
                      .split(",")
                      .slice(2, 3)
                      .join(",")
                      .trim()}
                  </p>
                </div>
              </div>

              {/* Reserva & Redes */}
              <div className="col-span-2 md:col-span-1">
                <p className="mb-4 text-xs tracking-[0.2em] uppercase text-[var(--primary)]">
                  Reserva &amp; Redes
                </p>
                <ul className="space-y-2">
                  {["Booksy", "Instagram"].map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-xs text-[var(--foreground-40)] transition-colors hover:text-[var(--foreground)]"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
