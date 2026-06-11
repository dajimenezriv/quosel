/** @jsxRuntime automatic @jsxImportSource react */
import type { WebsiteData } from '../types';

export function Footer({ data }: { data: WebsiteData }) {
  return (
    <footer className="px-6 py-12 md:px-24 md:py-16">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
        {/* Logo + description */}
        <div className="col-span-2 md:col-span-1">
          <div className="mb-5 flex items-center gap-3">
            <span className="text-foreground text-xs tracking-[0.25em] uppercase">{data.blocks.name}</span>
          </div>
          <p className="text-xs leading-relaxed text-(--foreground-40)">
            Barbería en el corazón del barrio. Cortes, degradados, barba y conversación. Reserva online o pásate a conocernos.
          </p>
        </div>

        {/* Navegar */}
        <div>
          <p className="text-primary mb-4 text-xs tracking-[0.2em] uppercase">Navegar</p>
          <ul className="space-y-2">
            {['Sobre nosotros', 'Barbero', 'Servicios', 'Galería', 'Visitas', 'Reseñas'].map((link) => (
              <li key={link}>
                <a href="#" className="hover:text-foreground text-xs text-(--foreground-40) transition-colors">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contacto */}
        <div>
          <p className="text-primary mb-4 text-xs tracking-[0.2em] uppercase">Contacto</p>
          <div className="space-y-2">
            <p className="text-foreground text-xs font-medium">Phone</p>
            <p className="text-foreground text-xs font-medium">Adress</p>
            <p className="text-xs text-(--foreground-40)">Adress</p>
          </div>
        </div>

        {/* Reserva & Redes */}
        <div className="col-span-2 md:col-span-1">
          <p className="text-primary mb-4 text-xs tracking-[0.2em] uppercase">Reserva &amp; Redes</p>
          <ul className="space-y-2">
            {['Booksy', 'Instagram'].map((link) => (
              <li key={link}>
                <a href="#" className="hover:text-foreground text-xs text-(--foreground-40) transition-colors">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
