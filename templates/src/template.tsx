import type { WebsiteData } from "./types";

const SERIF = "'Cormorant Garamond', Georgia, serif";
const SANS = "'Montserrat', sans-serif";

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
      { name: "Corte Degradado", desc: "Un corte diseñado según tu estilo, tipo de rostro y personalidad.", duration: "30 MIN", price: "16€" },
      { name: "Corte + Barba", desc: "El combo de la casa: corte preciso y barba perfectamente arreglada.", duration: "40 MIN", price: "21€" },
      { name: "Corte + Cejas", desc: "Corte profesional según tu estilo, acompañado del perfilado de cejas.", duration: "35 MIN", price: "17€" },
    ],
  },
  {
    name: "PREMIUM",
    tag: "EXPERIENCIA COMPLETA",
    items: [
      { name: "Detox capilar", desc: "Limpieza profunda del cuero cabelludo que elimina residuos, grasa y toxinas.", duration: "35 MIN", price: "20€" },
      { name: "Corte de cabello full", desc: "Servicio completo: asesoría personalizada y corte preciso según tu rostro.", duration: "50 MIN", price: "25€" },
      { name: "Corte y barba — ritual afeitado", desc: "Experiencia premium. Corte + arreglo de barba con ritual de toalla caliente.", duration: "90 MIN", price: "30€" },
    ],
  },
  {
    name: "SERVICIO ACTUAL",
    tag: null,
    items: [
      { name: "Servicio de barba full", desc: "Barba y limpieza con ozono. Perfilamos, definimos y damos forma.", duration: "30 MIN", price: "15€" },
      { name: "Corte solo a tijera", desc: "Servicio de corte a tijera para cabello largo.", duration: "45 MIN", price: "17€" },
      { name: "Retoque cejas, oídos y nariz", desc: "Servicio de higiene y detalle (pinzas o cera). Mejora la apariencia del rostro.", duration: "10 MIN", price: "5€" },
    ],
  },
  {
    name: "NIÑOS",
    tag: null,
    items: [
      { name: "Corte niño - hasta 10 años", desc: "Corte adaptado a los más pequeños. Con paciencia y buen ambiente.", duration: "10 MIN", price: "12€" },
    ],
  },
  {
    name: "DECOLORACIÓN & RIZADO PERMANENTE",
    tag: null,
    items: [
      { name: "Color, alisados y permanente", desc: "El precio se define tras una evaluación previa del cabello.", duration: "s.c.", price: "60€+" },
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
      </head>
      <body>
      <div
        className="min-h-screen bg-black text-white"
        style={{ fontFamily: SANS }}
      >
        {/* Navigation */}
        <nav className="fixed top-0 right-0 left-0 z-50 flex items-center justify-between px-10 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-400">
              <span className="text-xs font-light tracking-wider text-amber-400">
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
                className="text-xs tracking-[0.15em] uppercase text-white/70 transition-colors hover:text-white"
              >
                {link}
              </a>
            ))}
          </div>

          <a
            href="#"
            className="border border-amber-400 px-6 py-2 text-xs tracking-[0.2em] uppercase text-amber-400 transition-all hover:bg-amber-400 hover:text-black"
          >
            Reservar
          </a>
        </nav>

        {/* Hero */}
        <section className="relative flex min-h-screen items-center">
          <div className="absolute inset-0">
            <div className="h-full w-full bg-zinc-900" />
          </div>

          <div className="relative z-10 px-16 pb-24 md:px-24">
            <h1 className="leading-none" style={{ fontFamily: SERIF }}>
              <span className="block text-7xl font-light text-white md:text-8xl">
                Tu barbero,
              </span>
              <span className="block text-7xl font-light italic text-amber-400 md:text-8xl">
                {data.place.name}.
              </span>
            </h1>

            {data.place.formattedAddress && (
              <p
                className="mt-8 max-w-sm text-base italic text-white/70"
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

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#"
                className="bg-amber-400 px-8 py-3 text-xs tracking-[0.25em] uppercase text-black transition-colors hover:bg-amber-300"
              >
                Reservar Cita
              </a>
              {data.place.internationalPhoneNumber && (
                <a
                  href={`tel:${data.place.internationalPhoneNumber}`}
                  className="border border-white/40 px-8 py-3 text-xs tracking-[0.2em] uppercase transition-colors hover:border-white"
                >
                  {data.place.internationalPhoneNumber}
                </a>
              )}
            </div>
          </div>

          <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3">
            <span className="text-xs tracking-[0.3em] uppercase text-white/40">
              Scroll
            </span>
            <div className="h-12 w-px bg-white/30" />
          </div>
        </section>

        {/* Stats bar */}
        <section className="grid grid-cols-4 border-b border-t border-white/10 bg-zinc-950">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={`px-10 py-8 text-center${i < stats.length - 1 ? " border-r border-white/10" : ""}`}
            >
              <div
                className="text-3xl font-light italic text-amber-400"
                style={{ fontFamily: SERIF }}
              >
                {stat.value}
              </div>
              <div className="mt-2 text-xs tracking-[0.2em] uppercase text-white/40">
                {stat.label}
              </div>
            </div>
          ))}
        </section>

        {/* About section */}
        <section className="grid gap-16 bg-zinc-950 px-24 py-24 md:grid-cols-2">
          <div>
            <p className="mb-6 text-xs tracking-[0.25em] uppercase text-amber-400">
              — Sobre Nosotros
            </p>
            <h2
              className="text-5xl font-light leading-tight"
              style={{ fontFamily: SERIF }}
            >
              Una barbería{" "}
              <em className="italic text-amber-400">{data.place.name}</em>, para
              el barrio.
            </h2>
            <blockquote
              className="mt-10 border-l-2 border-amber-400 pl-6 text-lg italic text-white/70"
              style={{ fontFamily: SERIF }}
            >
              Cortes de calidad, atención personalizada y el ambiente del
              barrio. Sin prisas, sin trámites, sin sorpresas.
            </blockquote>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-white/60">
              <p>
                Llevamos años haciendo lo mismo:{" "}
                <span className="text-amber-400">
                  cortes precisos, barbas trabajadas con calma y un acabado que
                  se nota a la mano.
                </span>{" "}
                Cada cliente, un caso. Cada visita, un trato cercano.
              </p>
              <p>
                Por la silla pasan vecinos de toda la vida, estudiantes, padres
                con sus hijos y gente que viene desde otros barrios buscando un
                corte que dure. Nos preocupa más tu próxima visita que la caja
                de hoy.
              </p>
              {data.place.formattedAddress && (
                <p>
                  Reserva online o ven a conocernos. Estamos en{" "}
                  <span className="text-amber-400">
                    {data.place.formattedAddress}
                  </span>
                  .
                </p>
              )}
            </div>
          </div>

          <div className="relative min-h-80 bg-zinc-800" />
        </section>

        {/* Services section */}
        <section className="bg-black px-24 py-20">
          {/* Header */}
          <div className="mb-16 grid grid-cols-2 items-start gap-16">
            <div>
              <p className="mb-4 text-xs tracking-[0.25em] uppercase text-amber-400">
                — Carta
              </p>
              <h2
                className="text-5xl font-light leading-tight text-white"
                style={{ fontFamily: SERIF }}
              >
                Servicios{" "}
                <em className="italic text-amber-400">&amp;</em> precios.
              </h2>
            </div>
            <p
              className="pt-14 text-sm italic leading-relaxed text-white/50"
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
                <div className="mb-4 flex items-center justify-between border-b border-amber-400/30 pb-2">
                  <span className="text-xs tracking-[0.2em] uppercase text-amber-400">
                    {group.name}
                  </span>
                  {group.tag && (
                    <span className="text-xs tracking-[0.2em] uppercase text-white/25">
                      + {group.tag}
                    </span>
                  )}
                </div>

                {/* Items */}
                <div>
                  {group.items.map((item, i) => (
                    <div key={item.name}>
                      <div className="flex items-start gap-8 py-5">
                        <div className="flex-1">
                          <p className="text-base text-white">{item.name}</p>
                          <p className="mt-1 text-xs leading-relaxed text-white/40">
                            {item.desc}
                          </p>
                        </div>
                        <span className="shrink-0 pt-0.5 text-xs tracking-[0.15em] uppercase text-white/30">
                          {item.duration}
                        </span>
                        <span
                          className="shrink-0 w-16 text-right text-xl font-light italic text-amber-400"
                          style={{ fontFamily: SERIF }}
                        >
                          {item.price}
                        </span>
                      </div>
                      {i < group.items.length - 1 && (
                        <div className="border-t border-white/8" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-16 flex items-center justify-between border-t border-white/10 pt-8">
            <p className="text-xs tracking-[0.2em] uppercase text-white/30">
              Carta completa disponible en Booksy.
            </p>
            <a
              href="#"
              className="border border-amber-400 bg-amber-400/10 px-6 py-3 text-xs tracking-[0.2em] uppercase text-amber-400 transition-all hover:bg-amber-400 hover:text-black"
            >
              Reservar Ahora →
            </a>
          </div>
        </section>

        {/* Gallery section */}
        <section className="bg-black px-24 py-20">
          <div className="mb-12 grid grid-cols-2 items-start gap-16">
            <div>
              <p className="mb-4 text-xs tracking-[0.25em] uppercase text-amber-400">
                — Galería
              </p>
              <h2
                className="text-5xl font-light text-white"
                style={{ fontFamily: SERIF }}
              >
                Trabajos{" "}
                <em className="italic text-amber-400">recientes</em>.
              </h2>
            </div>
            <p
              className="pt-12 text-sm italic leading-relaxed text-white/50"
              style={{ fontFamily: SERIF }}
            >
              Cortes, degradados, barba y detalle. Lo que sale por la puerta
              cada día. Más fotos y vídeos en Instagram.
            </p>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-square bg-zinc-800" />
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <a
              href="#"
              className="border border-amber-400/60 px-8 py-3 text-xs tracking-[0.2em] uppercase text-amber-400 transition-all hover:bg-amber-400 hover:text-black"
            >
              Ver Más en Instagram →
            </a>
          </div>
        </section>

        {/* Reviews section */}
        <section className="bg-zinc-950 px-24 py-20">
          <div className="mb-16 flex items-start justify-between gap-16">
            <div>
              <p className="mb-4 text-xs tracking-[0.25em] uppercase text-amber-400">
                — Opiniones
              </p>
              <h2
                className="text-5xl font-light text-white"
                style={{ fontFamily: SERIF }}
              >
                La voz{" "}
                <em className="italic text-amber-400">del cliente</em>.
              </h2>
            </div>

            <div className="shrink-0 border border-amber-400/30 p-6">
              <div className="grid grid-cols-2 divide-x divide-amber-400/20">
                <div className="pr-8 text-center">
                  <div
                    className="text-4xl font-light italic text-amber-400"
                    style={{ fontFamily: SERIF }}
                  >
                    {data.place.rating
                      ? data.place.rating.toString().replace(".", ",")
                      : "–"}
                  </div>
                  <div className="mt-1 text-amber-400">★★★★★</div>
                  <div className="mt-2 text-xs tracking-[0.15em] uppercase text-white/30">
                    Google · {data.place.userRatingCount ?? 0}
                  </div>
                </div>
                <div className="pl-8 text-center">
                  <div
                    className="text-4xl font-light italic text-amber-400"
                    style={{ fontFamily: SERIF }}
                  >
                    4,9
                  </div>
                  <div className="mt-1 text-amber-400">★★★★★</div>
                  <div className="mt-2 text-xs tracking-[0.15em] uppercase text-white/30">
                    Booksy · 324
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            {REVIEWS.map((review) => (
              <div
                key={review.author}
                className="flex flex-col border border-white/10 bg-zinc-900 p-8"
              >
                <div className="text-lg text-amber-400">★★★★★</div>
                <p
                  className="mt-4 flex-1 text-sm italic leading-relaxed text-white/80"
                  style={{ fontFamily: SERIF }}
                >
                  "{review.text}"
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-xs tracking-[0.15em] uppercase text-white/30">
                    {review.author}
                  </span>
                  <span className="text-xs tracking-[0.15em] uppercase text-white/25">
                    {review.source}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Visit section */}
        <section className="grid grid-cols-2 bg-black">
          {/* Left: info */}
          <div className="px-24 py-20">
            <p className="mb-6 text-xs tracking-[0.25em] uppercase text-amber-400">
              — Visítanos
            </p>
            <h2
              className="mb-14 text-7xl font-light leading-tight text-white"
              style={{ fontFamily: SERIF }}
            >
              {data.place.formattedAddress.split(",")[0]?.trim()},{" "}
              <em className="italic text-amber-400">
                {data.place.formattedAddress.split(",")[1]?.trim()}
              </em>
              .
            </h2>

            <div>
              {/* Dirección */}
              <div className="flex gap-12 border-t border-white/10 py-6">
                <span className="w-20 shrink-0 text-xs tracking-[0.2em] uppercase text-amber-400/70">
                  Dirección
                </span>
                <div>
                  <p className="text-sm text-white">
                    {data.place.formattedAddress.split(",").slice(0, 2).join(",").trim()} — bajo
                  </p>
                  <p className="mt-1 text-xs text-white/40">
                    {data.place.formattedAddress.split(",").slice(2).join(",").trim()}
                  </p>
                </div>
              </div>

              {/* Teléfono */}
              {data.place.internationalPhoneNumber && (
                <div className="flex gap-12 border-t border-white/10 py-6">
                  <span className="w-20 shrink-0 text-xs tracking-[0.2em] uppercase text-amber-400/70">
                    Teléfono
                  </span>
                  <div>
                    <p className="text-sm text-white">
                      {data.place.internationalPhoneNumber}
                    </p>
                    <p className="mt-1 text-xs text-white/40">
                      WhatsApp · reservas y consultas
                    </p>
                  </div>
                </div>
              )}

              {/* Horario */}
              <div className="flex gap-12 border-t border-white/10 py-6">
                <span className="w-20 shrink-0 text-xs tracking-[0.2em] uppercase text-amber-400/70">
                  Horario
                </span>
                <div className="space-y-1.5 text-sm">
                  <div className="flex gap-8">
                    <span className="w-36 text-white">Lunes — Viernes</span>
                    <span className="text-white/60">10:00 — 14:00 · 16:00 — 20:00</span>
                  </div>
                  <div className="flex gap-8">
                    <span className="w-36 text-white">Sábado</span>
                    <span className="text-white/60">10:00 — 14:00</span>
                  </div>
                  <div className="flex gap-8">
                    <span className="w-36 text-amber-400">Domingo</span>
                    <span className="text-amber-400">Cerrado</span>
                  </div>
                </div>
              </div>

              {/* Reservas */}
              <div className="flex gap-12 border-t border-white/10 py-6">
                <span className="w-20 shrink-0 text-xs tracking-[0.2em] uppercase text-amber-400/70">
                  Reservas
                </span>
                <p className="text-sm text-white">Booksy · barberodebenimaclet</p>
              </div>

              {/* Redes */}
              <div className="flex gap-12 border-t border-b border-white/10 py-6">
                <span className="w-20 shrink-0 text-xs tracking-[0.2em] uppercase text-amber-400/70">
                  Redes
                </span>
                <p className="text-sm text-white">Instagram · @barberobenimaclet</p>
              </div>
            </div>

            <div className="mt-10">
              <a
                href="#"
                className="bg-amber-400 px-8 py-4 text-xs tracking-[0.2em] uppercase text-black transition-colors hover:bg-amber-300"
              >
                Reservar Cita →
              </a>
            </div>
          </div>

          {/* Right: Map */}
          <iframe
            src={`https://maps.google.com/maps?q=${encodeURIComponent(data.place.formattedAddress)}&output=embed`}
            className="h-full w-full border-0"
            loading="lazy"
          />
        </section>

        {/* CTA section */}
        <section className="relative flex min-h-96 items-center justify-center py-32 text-center">
          <div className="absolute inset-0 bg-zinc-900" />
          <div className="relative z-10 max-w-2xl px-8">
            <h2
              className="text-6xl font-light italic leading-tight text-amber-400"
              style={{ fontFamily: SERIF }}
            >
              Tu próxima cita empieza aquí.
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-white/60">
              Reserva en Booksy o síguenos en Instagram. Las dos puertas para
              entrar en la barbería antes incluso de cruzarla.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <a
                href="#"
                className="bg-amber-400 px-8 py-4 text-xs tracking-[0.2em] uppercase text-black transition-colors hover:bg-amber-300"
              >
                Reservar en Booksy →
              </a>
              <a
                href="#"
                className="border border-white/40 px-8 py-4 text-xs tracking-[0.2em] uppercase text-white transition-colors hover:border-white"
              >
                Seguir en Instagram →
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-zinc-950 px-24 py-16">
          <div className="grid grid-cols-4 gap-12">
            {/* Logo + description */}
            <div>
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-amber-400">
                  <span className="text-xs font-light tracking-wider text-amber-400">
                    {initials}
                  </span>
                </div>
                <span className="text-xs tracking-[0.25em] uppercase text-white">
                  {data.place.name}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-white/40">
                Barbería en el corazón del barrio. Cortes, degradados, barba y
                conversación. Reserva online o pásate a conocernos.
              </p>
            </div>

            {/* Navegar */}
            <div>
              <p className="mb-4 text-xs tracking-[0.2em] uppercase text-amber-400">
                Navegar
              </p>
              <ul className="space-y-2">
                {["Sobre nosotros", "Barbero", "Servicios", "Galería", "Visitas", "Reseñas"].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-xs text-white/40 transition-colors hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contacto */}
            <div>
              <p className="mb-4 text-xs tracking-[0.2em] uppercase text-amber-400">
                Contacto
              </p>
              <div className="space-y-2">
                {data.place.internationalPhoneNumber && (
                  <p className="text-xs font-medium text-white">
                    {data.place.internationalPhoneNumber}
                  </p>
                )}
                <p className="text-xs font-medium text-white">
                  {data.place.formattedAddress.split(",").slice(0, 2).join(",").trim()}
                </p>
                <p className="text-xs text-white/40">
                  {data.place.formattedAddress.split(",").slice(2, 3).join(",").trim()}
                </p>
              </div>
            </div>

            {/* Reserva & Redes */}
            <div>
              <p className="mb-4 text-xs tracking-[0.2em] uppercase text-amber-400">
                Reserva &amp; Redes
              </p>
              <ul className="space-y-2">
                {["Booksy", "Instagram"].map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-xs text-white/40 transition-colors hover:text-white"
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
