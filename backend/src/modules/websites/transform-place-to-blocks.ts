import type { Blocks } from '@quosel/templates';

export const templateBlocks = transformPlaceToBlocks();

export function transformPlaceToBlocks() {
  const blocks: Blocks = {
    schemaVersion: 1,
    nav: {
      ctaText: 'Book a Table',
      ctaLink: 'https://www.circolopopolare.com/restaurants/circolopopolare-london',
    },
    hero: {
      firstTitle: 'Your italian restaurant,',
      secondTitle: 'Circolo Popolare',
      ctaText: 'Book a Table',
      ctaLink: 'https://www.circolopopolare.com/restaurants/circolopopolare-london',
      imageUrl:
        'https://cdn.sanity.io/images/aa3sekul/production/d229986a2fe1430dd3ef952a4c294ed56441794d-7243x4831.jpg?w=3072&fit=crop&auto=format',
      phone: '',
      text: 'This is Circolo Popolare, our stunning trattoria in the heart of Fitzrovia, where the atmosphere is as warm as the Sicilian sun and food is the love language. Grab a glass of Prosecco and a twisted cocktail, you just landed on the Island of the Sun.',
    },
    aboutUs: {
      nav: 'About Us',
      title: '',
      text1: 'Circolo Popolare London - Italian Restaurant & Pizzeria in Fitzrovia.',
      text2: `Llevamos años haciendo lo mismo: cortes precisos, barbas trabajadas con calma y un acabado que se nota a la mano. Cada cliente, un caso. Cada visita, un trato cercano.\nPor la silla pasan vecinos de toda la vida, estudiantes, padres con sus hijos y gente que viene desde otros barrios buscando un corte que dure. Nos preocupa más tu próxima visita que la caja de hoy.\nReserva online o ven a conocernos. Estamos en 40-41 Rathbone Pl, London W1T 1HX, UK.`,
      imageUrl:
        'https://cdn.sanity.io/images/aa3sekul/production/b02785058d8cc5dd327d343ae6bf54ab71e69cf5-9358x6239.jpg?w=3072&fit=crop&auto=format',
    },
    gallery: {
      nav: 'Gallery',
      title: 'Trabajos recientes.',
      text: 'Cortes, degradados, barba y detalle. Lo que sale por la puerta cada día. Más fotos y vídeos en Instagram.',
      ctaText: '',
      ctaLink: '',
    },
    location: {
      nav: 'Location',
      title: 'Dolores Marqués, 9.',
      address: 'C/ de Dolores Marqués, 9 — bajo',
      ctaLink: 'https://www.circolopopolare.com/restaurants/circolopopolare-london',
      ctaText: 'Book a Table',
    },
    reviews: {
      nav: 'Reviews',
      title: 'La voz del cliente.',
    },
    services: {
      nav: 'Services',
      title: 'Servicios & precios.',
      text: 'Reserva directo en Booksy: elige el servicio, el día y la hora. Sin sorpresas, sin letra pequeña.',
      ctaLink: 'https://www.circolopopolare.com/restaurants/circolopopolare-london',
      ctaText: 'Book a Table',
    },
  };

  return blocks;
}
