import type { Blocks } from '../types';

export const circoloPopolareBlocks: Blocks = {
  schemaVersion: 1,
  name: 'Circolo Popolare',
  nav: {
    name: 'Circolo Popolare',
    ctaText: 'Book a Table',
    ctaLink: 'https://www.circolopopolare.com/restaurants/circolopopolare-london',
  },
  blocks: [
    {
      type: 'hero',
      firstTitle: 'Your italian restaurant,',
      secondTitle: 'Circolo Popolare',
      text: 'This is Circolo Popolare, our stunning trattoria in the heart of Fitzrovia, where the atmosphere is as warm as the Sicilian sun and food is the love language.',
      ctaText: 'Book a Table',
      ctaLink: 'https://www.circolopopolare.com/restaurants/circolopopolare-london',
      phone: '+44 204 578 4370',
      imageUrl:
        'https://cdn.sanity.io/images/aa3sekul/production/d229986a2fe1430dd3ef952a4c294ed56441794d-7243x4831.jpg?w=3072&fit=crop&auto=format',
    },
    {
      type: 'stats',
      stats: [
        { value: '4,8★', label: 'GOOGLE · 39.177 REVIEWS' },
        { value: '4,2★', label: 'TRIPADVISOR · 2.715 REVIEWS' },
        { value: '+87K', label: 'FOLLOWERS ON INSTAGRAM' },
        { value: 'M-S', label: 'MORNING AND AFTERNOON' },
      ],
    },
    {
      type: 'info',
      nav: 'About Us',
      title: 'Circolo Popolare London - Italian Restaurant & Pizzeria in Fitzrovia.',
      text1:
        'Our limited-edition crockery finally landed! From Alemanna and Trinarchia in Sicily to Fima and Nataloni in Umbria, bring home the ultimate Italian tablescape.',
      text2:
        'The squadra in the kitchen is cooking up a generous Italo-feast: think crispy Neapolitan Pizzas, creamy burratas and Carbonara served from a Pecorino wheel, all handmade with fresh ingredients from the Bel Paese.\n\nTake a seat at the long Mediterranean table and admire the 20,000 bottles of vintage spirits and wines, lining up the walls whilst sipping on your glass of Espresso Martini.\n\nThis is your Sicilian getaway in London.',
      imageUrl:
        'https://cdn.sanity.io/images/aa3sekul/production/b02785058d8cc5dd327d343ae6bf54ab71e69cf5-9358x6239.jpg?w=3072&fit=crop&auto=format',
    },
    {
      type: 'cta',
      title: 'El detalle lo es todo',
      text: '',
      ctaText: '',
      ctaLink: '',
      imageUrl: '',
    },
    {
      type: 'gallery',
      nav: 'Gallery',
      title: 'Our meals.',
      text: `Try our speedy lunch set menu with your colleagues, for when you're short on time but big on lunch! Available from Monday to Friday, from 12:00 15:45, from £23.`,
      images: [
        'https://cdn.sanity.io/images/aa3sekul/production/3f2fbe9463e75cfc24bbf7fe3f3e7935aabbe08b-3666x5499.jpg?w=3072&fit=crop&auto=format',
        'https://cdn.sanity.io/images/aa3sekul/production/86eabde60877aa041890869c5fa6c3ddcf7cf4ab-8691x5794.jpg?w=3072&fit=crop&auto=format',
        'https://media.timeout.com/images/105541105/image.jpg',
        'https://cdn.sanity.io/images/aa3sekul/production/d6dab7745c43fb455699b1e3f7e0b269a6c1df15-6104x8139.jpg?w=3072&fit=crop&auto=format',
        'https://cdn.sanity.io/images/aa3sekul/production/62210fbbc3bab7b6c554263f48c5090c843d8a83-5915x8873.jpg?w=3072&fit=crop&auto=format',
        'https://cdn.sanity.io/images/aa3sekul/production/6bfc32b2fc9202942d5ac593de4be4d6cfe21b2d-5715x8573.jpg?w=3072&fit=crop&auto=format',
        'https://cdn.prod.rexby.com/image/d965fc1d80984631af4b7a2a80f833c4?format=webp&width=1080&height=1350&quality=80',
        'https://cdn.sanity.io/images/aa3sekul/production/911e0e36c573f25347ba7e59cea3622f1c8a0369-6041x9062.jpg?w=3072&fit=crop&auto=format',
      ],
      ctaText: 'See more on Instagram →',
      ctaLink: 'https://www.instagram.com/circolopopolare',
    },
    {
      type: 'reviews',

      nav: 'Reviews',
      title: 'The voice of the customer.',
      stats: [
        { value: '4,8★', label: 'GOOGLE · 39.177 REVIEWS' },
        { value: '4,2★', label: 'TRIPADVISOR · 2.715 REVIEWS' },
      ],
      reviews: [
        {
          text: 'Amazing spot. The ambience is honestly one of the best parts of the place. Very relaxed, warm and perfect for a slow meal.\nThe food completely lived up to it as well. I had the mushroom truffle toast and the truffle pasta and both were excellent. The truffle flavour was spot on and the pasta in particular really blew me away.\nEverything just worked together the atmosphere, the food, the overall vibe. Left the place genuinely impressed and had a great time.\nThe team also mentioned they have opened a sister branch in Dublin, so I will definitely be checking that one out as well.',
          author: 'Patrik Rajiv Shah',
          source: 'Google',
          url: 'https://maps.app.goo.gl/hpyRZof6n4zB2A2u7',
        },
        {
          text: 'Such a great spot! 🍝✨ It is very popular, so definitely book ahead. We came here for a birthday and it was perfect. The pasta selection is big, but the staff was so helpful in guiding us. As for dessert... wow. We ordered almost everything! Do yourself a favor and get the profiteroles and the Lemon Cake (it is massive!). Highly recommend!',
          author: 'Doux Ella',
          source: 'Google',
          url: 'https://maps.app.goo.gl/PASEqM9LTAG7GgPr6',
        },
        {
          text: 'Firstly it’s one for the coolest looking restaurants in town that is located in a closed ground level in a busy area of London.\nHard to find such a well crafted restaurant.\nAs for the food, it’s has authentic Italian food very good veg and non veg options and an amazing dessert menu. The drinks are also good.\nWe tried the starters, pizzas and truffle pasta. In the desserts their pistachio profetti rolls with chocolate sauce.\nThe staff is very good and the service is really good.',
          author: 'Deepakh Bhojwani',
          source: 'Google',
          url: 'https://maps.app.goo.gl/RaKtpiyxeLKYLnDN9',
        },
      ],
    },
    {
      type: 'services',
      nav: 'Services',
      title: 'Services & prices',
      text: 'Reserva directo en Booksy: elige el servicio, el día y la hora. Sin sorpresas, sin letra pequeña.',
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
    },
    {
      type: 'cta',
      title: 'Tu próxima cita empieza aquí.',
      text: 'Reserva en Booksy o síguenos en Instagram. Las dos puertas para entrar en la barbería antes incluso de cruzarla.',
      ctaText: 'Reservar en Booksy →',
      ctaLink: '#',
      imageUrl: '',
    },
    {
      type: 'location',
      nav: 'Location',
      title: 'Dolores Marqués, 9.',
      formattedAddress: '40-41 Rathbone Pl, London W1T 1HX, UK',
      phone: '+44 20 3893 6800',
      ctaText: 'Book a Table',
      ctaLink: 'https://www.circolopopolare.com/restaurants/circolopopolare-london',
    },
  ],
};
