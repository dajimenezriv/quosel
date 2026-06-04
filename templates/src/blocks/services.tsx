import { SERIF } from "../utils";

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

export function Services() {
  return (
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
            Servicios <em className="italic text-[var(--primary)]">&amp;</em>{" "}
            precios.
          </h2>
        </div>
        <p
          className="text-sm italic leading-relaxed text-[var(--foreground-50)] md:pt-14"
          style={{ fontFamily: SERIF }}
        >
          Reserva directo en Booksy: elige el servicio, el día y la hora. Sin
          sorpresas, sin letra pequeña.
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
  );
}
