import type {
  Blocks,
  CtaBlock,
  FooterBlock,
  GalleryBlock,
  HeroBlock,
  InfoBlock,
  LocationBlock,
  ReviewsBlock,
  ServicePage,
  ServicesBlock,
} from '../types';

const BOOKING_URL = 'https://www.circolopopolare.com/restaurants/circolopopolare-london';

export const circoloPopolareContext = `Circolo Popolare is an Italian restaurant and pizzeria from the Big Mamma group, with locations in London, Manchester, Paris, Barcelona, and Madrid.\n\nOffering: Authentic Southern Italian food made for sharing — Neapolitan pizzas, handmade pasta (signature Carbonara served from a pecorino wheel), antipasti, grilled meats, and over-the-top desserts. Big draw is the maximalist setting: hanging plants, festoon lights, walls of vintage liquor bottles, long communal tables, bold cocktails.\n\nTone: Warm, playful, theatrical, unmistakably Italian. Leans into abundance and indulgence, drops in Italian phrases (la squadra, buon appetito), cheeky rather than formal.\n\nAudience: Groups, families, and couples after a lively, atmospheric night out — people who value vibe and Instagram-worthy interiors over quiet fine dining.`;

export const circoloPopolareHero: HeroBlock = {
  type: 'hero',
  title: 'Your italian restaurant,\n_~Circolo Popolare~_',
  text: '_This is Circolo Popolare, our stunning trattoria in the heart of Fitzrovia, where the atmosphere is as warm as the Sicilian sun and food is the love language._',
  ctaText: 'Book a Table',
  ctaLink: 'https://www.circolopopolare.com/restaurants/circolopopolare-london',
  imageUrl:
    'https://cdn.sanity.io/images/aa3sekul/production/d229986a2fe1430dd3ef952a4c294ed56441794d-7243x4831.jpg?w=3072&fit=crop&auto=format',
  imageAlt: 'Interior of Circolo Popolare with hanging plants, festoon lights and walls of vintage liquor bottles',
};

export const circoloPopolareInfo: InfoBlock = {
  type: 'info',
  nav: 'About Us',
  title: 'Circolo Popolare London - _~Italian Restaurant & Pizzeria~_ in Fitzrovia.',
  text1:
    '_Our limited-edition crockery finally landed! From Alemanna and Trinarchia in Sicily to Fima and Nataloni in Umbria, bring home the ultimate Italian tablescape._',
  text2:
    'The squadra in the kitchen is cooking up a generous Italo-feast: think crispy Neapolitan Pizzas, creamy burratas and Carbonara served from a Pecorino wheel, ~all handmade with fresh ingredients from the Bel Paese~.\n\nTake a seat at the long Mediterranean table and admire the 20,000 bottles of vintage spirits and wines, lining up the walls whilst sipping on your glass of Espresso Martini.\n\nThis is your ~Sicilian getaway in London~.',
  imageUrl:
    'https://cdn.sanity.io/images/aa3sekul/production/b02785058d8cc5dd327d343ae6bf54ab71e69cf5-9358x6239.jpg?w=3072&fit=crop&auto=format',
  imageAlt: 'Long Mediterranean communal table lined with vintage wine and spirit bottles',
};

export const circoloPopolareGallery: GalleryBlock = {
  type: 'gallery',
  nav: 'Gallery',
  title: 'Our _~meals~_.',
  text: `_Try our speedy lunch set menu with your colleagues, for when you're short on time but big on lunch! Available from Monday to Friday, from 12:00 15:45, from £23._`,
  images: [
    {
      url: 'https://cdn.sanity.io/images/aa3sekul/production/3f2fbe9463e75cfc24bbf7fe3f3e7935aabbe08b-3666x5499.jpg?w=1024&q=60&fit=crop&auto=format',
      alt: 'Plate of handmade Italian pasta',
    },
    {
      url: 'https://cdn.sanity.io/images/aa3sekul/production/86eabde60877aa041890869c5fa6c3ddcf7cf4ab-8691x5794.jpg?w=1024&q=60&fit=crop&auto=format',
      alt: 'Dining room full of guests under festoon lights',
    },
    {
      url: 'https://media.timeout.com/images/105541105/image.jpg',
      alt: 'Creamy burrata antipasto served on a plate',
    },
    {
      url: 'https://cdn.sanity.io/images/aa3sekul/production/d6dab7745c43fb455699b1e3f7e0b269a6c1df15-6104x8139.jpg?w=1024&q=60&fit=crop&auto=format',
      alt: 'Neapolitan pizza fresh from the oven',
    },
    {
      url: 'https://cdn.sanity.io/images/aa3sekul/production/62210fbbc3bab7b6c554263f48c5090c843d8a83-5915x8873.jpg?w=1024&q=60&fit=crop&auto=format',
      alt: 'La Gran Carbonara being finished in a wheel of Pecorino',
    },
    {
      url: 'https://cdn.sanity.io/images/aa3sekul/production/6bfc32b2fc9202942d5ac593de4be4d6cfe21b2d-5715x8573.jpg?w=1024&q=60&fit=crop&auto=format',
      alt: 'Over-the-top Italian dessert plated for sharing',
    },
    {
      url: 'https://cdn.prod.rexby.com/image/d965fc1d80984631af4b7a2a80f833c4?format=webp&width=540&height=675&quality=50',
      alt: 'Espresso Martini cocktail on the bar',
    },
    {
      url: 'https://cdn.sanity.io/images/aa3sekul/production/911e0e36c573f25347ba7e59cea3622f1c8a0369-6041x9062.jpg?w=1024&q=60&fit=crop&auto=format',
      alt: 'Vintage liquor bottles lining the restaurant walls',
    },
  ],
  ctaText: 'See more on Instagram',
  ctaLink: 'https://www.instagram.com/circolopopolare',
};

export const circoloPopolareServices: ServicesBlock = {
  type: 'services',
  nav: 'Services',
  title: '_Services ~&~ prices._',
  text: 'Book directly online: pick the dish, the day and the time. No surprises, no fine print.',
  serviceGroups: [
    {
      title: 'To Share',
      services: [
        { title: 'FOCACCIA DELLA CASA', text: '', price: '4,50 GBP' },
        { title: 'STRACCIATELLA', text: '', price: '5,00 GBP' },
        { title: 'OLIVE & PARMIGIANO', text: '', price: '5,50 GBP' },
        { title: 'PROSCIUTTO DI PARMA DOP 24 MESI', text: '', price: '10,00 GBP' },
        { title: 'BRESAOLA DELLA VALTELLINA', text: '', price: '10,00 GBP' },
        { title: 'BURRATA E PAPPA AL POMODORO', text: '', price: '16,00 GBP' },
        { title: 'PIATTO DI PRODOTTI', text: '', price: '15,00 GBP' },
        { title: 'INSALATINA GRECA', text: '', price: '7,00 GBP' },
        { title: 'PIZZETTE FRITTE', text: '', price: '8,50 GBP' },
        { title: 'SUPPLI ALLA ROMANA', text: '', price: '9,00 GBP' },
        { title: 'BRUSCHETTA CAPRESE', text: '', price: '10,00 GBP' },
        { title: 'CARPACCIO DI BRANZINO E STRACCIATELLA', text: '', price: '12,00 GBP' },
      ],
    },
    {
      title: 'Primi Piatti',
      services: [
        { title: 'MAFALDINE AL PESTO', text: 'Mafaldine with pesto di basilico and Parmigiano', price: '15,00 GBP' },
        { title: 'MAFALDINE AL TARTUFO', text: 'Mafaldine with truffle sauce, mascarpone and fresh truffle', price: '20,50 GBP' },
        {
          title: 'PASTA ALLA NORMA',
          text: 'Mezzi rigatoni with San Marzano DOP tomato sauce, fried aubergine and lemon ricotta di bufala. *vegan version available*',
          price: '16,00 GBP',
        },
        { title: 'SPAGHETTONI AL RAGU', text: 'Spaghettoni with traditional ragù from Bologna and Parmigiano', price: '17,50 GBP' },
        {
          title: 'LA GRAN CARBONARA PER 2',
          text: 'Spaghetti, egg yolk, guanciale and black pepper, served in a wheel of Pecorino',
          price: '19,00 GBP',
        },
        {
          title: 'TAGLIARINI GRANCHIO E LIMONE',
          text: 'Home-made tagliarini with fresh local hand-picked crab, thyme, chilli in a langoustine bisque and lemony butter sauce.',
          price: '21,00 GBP',
        },
      ],
    },
    {
      title: 'Pizza Napoletana',
      services: [
        {
          title: 'MAMMARGHERITA DI BUFALA',
          text: 'San Marzano DOP tomato sauce, mozzarella di bufala and Parmigiano',
          price: '13,50 GBP',
        },
        {
          title: 'SOME LIKE IT HOT',
          text: "Ricotta, spicy 'nduja cream, mozzarella, salame piccante and ricotta salata",
          price: '17,00 GBP',
        },
        {
          title: 'REGINA ROSSA',
          text: 'San Marzano DOP tomato sauce, mozzarella, prosciutto cotto and sautéed mushrooms',
          price: '18,50 GBP',
        },
        {
          title: 'STRACCIATELLA VERSACE',
          text: 'San Marzano DOP tomato sauce, stracciatella, basil pesto and Taggiasche olives. *vegan version available*',
          price: '16,00 GBP',
        },
        {
          title: 'LA NORMA',
          text: 'San Marzano DOP tomato sauce, fried aubergine, mozzarella and ricotta salata. *vegan version available*',
          price: '15,00 GBP',
        },
        { title: 'DOPPIO TARTUFO', text: 'Truffle cream, mozzarella, sautéed mushrooms and fresh truffle', price: '21,00 GBP' },
      ],
    },
  ],
  ctaText: 'Book a Table',
  ctaLink: 'https://www.circolopopolare.com/restaurants/circolopopolare-london',
};

export const circoloPopolareReviews: ReviewsBlock = {
  type: 'reviews',
  nav: 'Reviews',
  title: 'The voice of the ~customer~.',
  stats: [
    { value: '4,8', label: 'GOOGLE · 39.177 REVIEWS' },
    { value: '4,2', label: 'TRIPADVISOR · 2.715 REVIEWS' },
  ],
  reviews: [
    {
      text: '_Amazing spot. The ambience is honestly one of the best parts of the place. Very relaxed, warm and perfect for a slow meal.\n\nThe food completely lived up to it as well. I had the mushroom truffle toast and the truffle pasta and both were excellent. The truffle flavour was spot on and the pasta in particular really blew me away.\n\nEverything just worked together the atmosphere, the food, the overall vibe. Left the place genuinely impressed and had a great time.\n\nThe team also mentioned they have opened a sister branch in Dublin, so I will definitely be checking that one out as well._',
      author: 'Patrik Rajiv Shah',
      source: 'Google',
      url: 'https://maps.app.goo.gl/hpyRZof6n4zB2A2u7',
    },
    {
      text: '_Such a great spot! 🍝✨ It is very popular, so definitely book ahead. We came here for a birthday and it was perfect. The pasta selection is big, but the staff was so helpful in guiding us. As for dessert... wow.\n\nWe ordered almost everything! Do yourself a favor and get the profiteroles and the Lemon Cake (it is massive!). Highly recommend!_',
      author: 'Doux Ella',
      source: 'Google',
      url: 'https://maps.app.goo.gl/PASEqM9LTAG7GgPr6',
    },
    {
      text: '_Firstly it’s one for the coolest looking restaurants in town that is located in a closed ground level in a busy area of London.\n\nHard to find such a well crafted restaurant.\n\nAs for the food, it’s has authentic Italian food very good veg and non veg options and an amazing dessert menu. The drinks are also good.\n\nWe tried the starters, pizzas and truffle pasta. In the desserts their pistachio profetti rolls with chocolate sauce.\n\nThe staff is very good and the service is really good._',
      author: 'Deepakh Bhojwani',
      source: 'Google',
      url: 'https://maps.app.goo.gl/RaKtpiyxeLKYLnDN9',
    },
  ],
};

export const circoloPopolareLocation: LocationBlock = {
  type: 'location',
  nav: 'Location',
  title: '_Visit us._',
  details: [{ label: 'Social Media', value: 'Instagram · *@circolopopolare*' }],
  schedule: {
    title: 'Schedule',
    items: [
      { label: 'Monday — Friday', value: '10:00 — 14:00 · 16:00 — 20:00' },
      { label: 'Saturday', value: '10:00 — 14:00' },
      { label: 'Sunday', value: 'Closed' },
    ],
  },
  mapUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d620.6958523025477!2d-0.13451297141411575!3d51.517189498231176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761ba809fd882b%3A0x817eee82a924ec96!2sCircolo%20Popolare!5e0!3m2!1sen!2ses!4v1781019604772!5m2!1sen!2ses',
  ctaText: 'Book a Table',
  ctaLink: 'https://www.circolopopolare.com/restaurants/circolopopolare-london',
};

export const circoloPopolareCta: CtaBlock = {
  type: 'cta',
  title: '_~Your next visit\nstarts here.~_',
  text: '_Book a table or follow us on Instagram.\nTwo ways into the restaurant before you even step inside._',
  ctaText: 'Book a Table',
  ctaLink: 'https://www.circolopopolare.com/restaurants/circolopopolare-london',
  imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/circolo-popolare-barcelona-jerome-galland-bar-1-693e68003cbcf.jpg',
  imageAlt: 'Circolo Popolare bar with backlit shelves of bottles',
};

export const circoloPopolareFooter: FooterBlock = {
  type: 'footer',
  description:
    'Your Sicilian getaway in London. Crispy Neapolitan pizzas, creamy burratas and Carbonara served from a Pecorino wheel, in the heart of Fitzrovia.',
  contactTitle: 'Contact',
  linksTitle: 'Booking & Social',
  links: [
    { label: 'Book a Table', url: 'https://www.circolopopolare.com/restaurants/circolopopolare-london' },
    { label: 'Instagram', url: 'https://www.instagram.com/circolopopolare' },
  ],
  legalLinks: [
    { label: 'Legal Notice', url: '/legal-notice' },
    { label: 'Privacy Policy', url: '/privacy-policy' },
    { label: 'Cookie Policy', url: '/cookie-policy' },
  ],
};

const privateDiningPage: ServicePage = {
  type: 'service',
  slug: 'private-dining-london',
  h1: 'Private Dining in London',
  metaTitle: 'Private Dining in London · Circolo Popolare',
  metaDescription:
    'Host your celebration at Circolo Popolare in Fitzrovia — private dining for groups with sharing Italian feasts, Neapolitan pizza and free-flowing cocktails.',
  heroImageUrl:
    'https://cdn.sanity.io/images/aa3sekul/production/d229986a2fe1430dd3ef952a4c294ed56441794d-7243x4831.jpg?w=3072&fit=crop&auto=format',
  heroImageAlt: 'Long communal table set for a large group under festoon lights at Circolo Popolare',
  intro: '_A room built for a table full of people — sharing platters, 20,000 bottles on the walls and the warmest welcome in Fitzrovia._',
  body: `## A restaurant made for your big night out

Circolo Popolare was *made* for a table full of people. Long Mediterranean tables, walls lined with vintage bottles and platters built for sharing — it is the kind of room that turns a dinner into an event.

Whether it is a birthday, a work squadra celebration or a slow Sunday with friends, la squadra will help you put together a generous Italo-feast and keep the Espresso Martinis coming.

## What a private group gets

- Sharing menus of ~Neapolitan pizza~, handmade pasta and antipasti
- Free-flowing cocktails and wine from the Bel Paese
- Space for groups from 8 to 30 guests
- A team that handles the details so you don't have to

### Where to find us

We are in the heart of Fitzrovia, a short walk from Tottenham Court Road. Check the [address and opening hours](./#location) before you visit.

Ready to plan it? [Book a table](${BOOKING_URL}) and we will take care of the rest.`,
  ctaText: 'Enquire about private dining',
  ctaLink: BOOKING_URL,
};

const bottomlessBrunchPage: ServicePage = {
  type: 'service',
  slug: 'bottomless-brunch-london',
  h1: 'Bottomless Brunch in London',
  metaTitle: 'Bottomless Brunch in London · Circolo Popolare',
  metaDescription:
    'Bottomless brunch at Circolo Popolare in Fitzrovia — Neapolitan pizza, pasta and free-flowing cocktails in the most Instagrammable room in London.',
  heroImageUrl:
    'https://cdn.sanity.io/images/aa3sekul/production/86eabde60877aa041890869c5fa6c3ddcf7cf4ab-8691x5794.jpg?w=3072&fit=crop&auto=format',
  heroImageAlt: 'Dining room full of guests enjoying brunch under festoon lights',
  intro: '_Weekend brunch, Italian style — pizza, pasta and cocktails that keep on coming._',
  body: `## The most Italian brunch in town

Swap the same old eggs for a proper Italo-feast. Our bottomless brunch pairs crispy ~Neapolitan pizza~ and handmade pasta with free-flowing cocktails, all under the festoon lights of our Fitzrovia trattoria.

Bring your friends, take a seat at the long table and settle in — this is brunch made for lingering.

## What's included

- A main from our brunch menu — pizza or pasta
- 90 minutes of free-flowing Aperol Spritz, Prosecco or Espresso Martini
- The liveliest room in London to enjoy it in

### Good to know

Brunch is popular and books up fast, so reserve ahead. Planning a bigger group? See our [private dining](private-dining-london) option instead.`,
  ctaText: 'Book bottomless brunch',
  ctaLink: BOOKING_URL,
};

const groupBookingsPage: ServicePage = {
  type: 'service',
  slug: 'group-bookings-london',
  h1: 'Group Bookings in London',
  metaTitle: 'Group Bookings in London · Circolo Popolare',
  metaDescription:
    'Book a large table at Circolo Popolare in Fitzrovia — sharing Italian menus for birthdays, work celebrations and get-togethers in central London.',
  heroImageUrl:
    'https://cdn.sanity.io/images/aa3sekul/production/b02785058d8cc5dd327d343ae6bf54ab71e69cf5-9358x6239.jpg?w=3072&fit=crop&auto=format',
  heroImageAlt: 'Long Mediterranean communal table lined with bottles, ready for a large group',
  intro: '_Birthdays, work dos and get-togethers — the big table is ready when you are._',
  body: `## Gather your squadra

Some meals are better with a crowd. Our long communal tables and sharing menus make Circolo Popolare a natural home for birthdays, work celebrations and any excuse to get everyone together.

Tell us how many you are and what you are celebrating, and we will build a generous menu of pizza, pasta and antipasti around it.

## Why groups love it

- Sharing plates that keep the table talking
- Central Fitzrovia location, easy for everyone to reach
- Cocktails and Italian wine flowing all night

### Planning something special?

For a table of your own, ask about [private dining](private-dining-london), or make a weekend of it with [bottomless brunch](bottomless-brunch-london).`,
  ctaText: 'Enquire about group bookings',
  ctaLink: BOOKING_URL,
};

export const circoloPopolareBlocks: Blocks = {
  schemaVersion: 5,
  name: 'Circolo Popolare',
  address: '40-41 Rathbone Pl, London W1T 1HX, UK',
  phone: '+44 20 3893 6800',
  metaTitle: 'Circolo Popolare · Italian restaurant & pizzeria in London',
  metaDescription:
    'Circolo Popolare is a restaurant serves authentic Italian food: Neapolitan pizzas, fresh pasta and big tables made for sharing.',
  logoUrl: 'https://www.circolopopolare.com/favicon.ico',
  nav: {
    logoUrl: '',
    ctaText: 'Book a Table',
    ctaLink: 'https://www.circolopopolare.com/restaurants/circolopopolare-london',
  },
  footer: circoloPopolareFooter,
  homepage: {
    hero: circoloPopolareHero,
    blocks: [
      {
        type: 'stats',
        stats: [
          { value: '4,8★', label: 'GOOGLE · 39.177 REVIEWS' },
          { value: '4,2★', label: 'TRIPADVISOR · 2.715 REVIEWS' },
          { value: '+87K', label: 'FOLLOWERS ON INSTAGRAM' },
          { value: 'M-S', label: 'MORNING AND AFTERNOON' },
        ],
      },
      circoloPopolareInfo,
      {
        type: 'cta',
        title: '_The detail is\n~everything~_',
        text: '_Book a table or just show up — either way, enjoy your meal!_',
        ctaText: '',
        ctaLink: '',
        imageUrl:
          'https://cdn.sanity.io/images/aa3sekul/production/070dc569421cc19978858573b22ed27813435efb-7243x4831.jpg?w=3072&fit=crop&auto=format',
        imageAlt: 'Close-up of a plated Italian dish at Circolo Popolare',
      },
      circoloPopolareGallery,
      circoloPopolareServices,
      circoloPopolareReviews,
      circoloPopolareLocation,
      circoloPopolareCta,
    ],
  },
  pages: [privateDiningPage, bottomlessBrunchPage, groupBookingsPage],
};
