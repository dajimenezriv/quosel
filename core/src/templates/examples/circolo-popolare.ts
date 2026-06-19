import type {
  Blocks,
  CtaBlock,
  FooterBlock,
  GalleryBlock,
  HeroBlock,
  InfoBlock,
  LocationBlock,
  ReviewsBlock,
  ServicesBlock,
} from '../types';

export const circoloPopolareContext = `Circolo Popolare is an Italian restaurant and pizzeria from the Big Mamma group, with locations in London, Manchester, Paris, Barcelona, and Madrid.\n\nOffering: Authentic Southern Italian food made for sharing — Neapolitan pizzas, handmade pasta (signature Carbonara served from a pecorino wheel), antipasti, grilled meats, and over-the-top desserts. Big draw is the maximalist setting: hanging plants, festoon lights, walls of vintage liquor bottles, long communal tables, bold cocktails.\n\nTone: Warm, playful, theatrical, unmistakably Italian. Leans into abundance and indulgence, drops in Italian phrases (la squadra, buon appetito), cheeky rather than formal.\n\nAudience: Groups, families, and couples after a lively, atmospheric night out — people who value vibe and Instagram-worthy interiors over quiet fine dining.`;

export const circoloPopolareHero: HeroBlock = {
  type: 'hero',
  title: 'Your italian restaurant,\n_~Circolo Popolare~_',
  text: '_This is Circolo Popolare, our stunning trattoria in the heart of Fitzrovia, where the atmosphere is as warm as the Sicilian sun and food is the love language._',
  ctaText: 'Book a Table',
  ctaLink: 'https://www.circolopopolare.com/restaurants/circolopopolare-london',
  phone: '+44 204 578 4370',
  imageUrl:
    'https://cdn.sanity.io/images/aa3sekul/production/d229986a2fe1430dd3ef952a4c294ed56441794d-7243x4831.jpg?w=3072&fit=crop&auto=format',
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
};

export const circoloPopolareGallery: GalleryBlock = {
  type: 'gallery',
  nav: 'Gallery',
  title: 'Our _~meals~_.',
  text: `_Try our speedy lunch set menu with your colleagues, for when you're short on time but big on lunch! Available from Monday to Friday, from 12:00 15:45, from £23._`,
  images: [
    'https://cdn.sanity.io/images/aa3sekul/production/3f2fbe9463e75cfc24bbf7fe3f3e7935aabbe08b-3666x5499.jpg?w=1024&q=60&fit=crop&auto=format',
    'https://cdn.sanity.io/images/aa3sekul/production/86eabde60877aa041890869c5fa6c3ddcf7cf4ab-8691x5794.jpg?w=1024&q=60&fit=crop&auto=format',
    'https://media.timeout.com/images/105541105/image.jpg',
    'https://cdn.sanity.io/images/aa3sekul/production/d6dab7745c43fb455699b1e3f7e0b269a6c1df15-6104x8139.jpg?w=1024&q=60&fit=crop&auto=format',
    'https://cdn.sanity.io/images/aa3sekul/production/62210fbbc3bab7b6c554263f48c5090c843d8a83-5915x8873.jpg?w=1024&q=60&fit=crop&auto=format',
    'https://cdn.sanity.io/images/aa3sekul/production/6bfc32b2fc9202942d5ac593de4be4d6cfe21b2d-5715x8573.jpg?w=1024&q=60&fit=crop&auto=format',
    'https://cdn.prod.rexby.com/image/d965fc1d80984631af4b7a2a80f833c4?format=webp&width=540&height=675&quality=50',
    'https://cdn.sanity.io/images/aa3sekul/production/911e0e36c573f25347ba7e59cea3622f1c8a0369-6041x9062.jpg?w=1024&q=60&fit=crop&auto=format',
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
  details: [
    { label: 'Address', value: '40-41 Rathbone Pl, London W1T 1HX, UK' },
    { label: 'Phone', value: '+44 20 3893 6800' },
    { label: 'Social Media', value: 'Instagram · *@circolopopolare*' },
  ],
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
};

export const circoloPopolareFooter: FooterBlock = {
  type: 'footer',
  description:
    'Your Sicilian getaway in London. Crispy Neapolitan pizzas, creamy burratas and Carbonara served from a Pecorino wheel, in the heart of Fitzrovia.',
  navigateTitle: 'Navigate',
  contactTitle: 'Contact',
  linksTitle: 'Booking & Social',
  phone: '+44 20 3893 6800',
  address: '40-41 Rathbone Pl, London W1T 1HX, UK',
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

export const circoloPopolareBlocks: Blocks = {
  schemaVersion: 1,
  name: 'Circolo Popolare',
  logoUrl: '',
  nav: {
    ctaText: 'Book a Table',
    ctaLink: 'https://www.circolopopolare.com/restaurants/circolopopolare-london',
  },
  blocks: [
    circoloPopolareHero,
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
    },
    circoloPopolareGallery,
    circoloPopolareServices,
    circoloPopolareReviews,
    circoloPopolareLocation,
    circoloPopolareCta,
    circoloPopolareFooter,
  ],
};
