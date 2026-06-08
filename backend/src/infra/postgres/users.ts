import type { UserId } from '@/core/types';
import { templateBlocks } from '@/modules/websites/transform-place-to-blocks';
import { prisma } from './client';
import type { Prisma } from './prisma/client';
import { Websites } from './websites';

const SEED_PLACE_ID = '00000000-0000-0000-0000-000000000000';

export class Users {
  static async getById(id: UserId) {
    return await prisma.user.findUnique({ where: { id } });
  }

  static async update(id: UserId, data: Prisma.UserUncheckedUpdateInput) {
    return await prisma.user.update({ where: { id }, data });
  }

  static async updateByStripeCustomerId(stripeCustomerId: string, data: Prisma.UserUncheckedUpdateInput) {
    return await prisma.user.update({ where: { stripeCustomerId }, data });
  }

  static async createOrUpdate(googleId: string, data: Omit<Prisma.UserUncheckedCreateInput, 'googleId'>) {
    return await prisma.$transaction(async (tx) => {
      const existing = await tx.user.findUnique({ where: { googleId } });

      if (existing) {
        return await tx.user.update({ where: { googleId }, data });
      }

      const userRow = await tx.user.create({ data: { googleId, ...data } });

      await seedPlace(tx);

      const domain = Websites.randomDomain('default');
      await tx.website.create({
        data: {
          userId: userRow.id,
          placeId: SEED_PLACE_ID,
          domain,
          blocks: templateBlocks,
          styles: {},
        },
      });

      return userRow;
    });
  }
}

async function seedPlace(tx: Prisma.TransactionClient) {
  const place: Prisma.PlaceCreateInput = {
    id: SEED_PLACE_ID,
    googleId: 'ChIJK4j9CagbdkgRluwkqYLufoE',
    name: 'Circolo Popolare',
    formattedAddress: '40-41 Rathbone Pl, London W1T 1HX, UK',
    shortFormattedAddress: '40-41 Rathbone Pl, London',
    internationalPhoneNumber: '',
    latitude: 51.5171895,
    longitude: -0.13386789999999998,
    raw: {},
    googleMapsPhotosUri:
      'https://www.google.com/maps/place//data=!4m3!3m2!1s0x48761ba809fd882b:0x817eee82a924ec96!10e5?g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYBCAA',
    googleMapsReviewsUri:
      'https://www.google.com/maps/place//data=!4m4!3m3!1s0x48761ba809fd882b:0x817eee82a924ec96!9m1!1b1?g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYBCAA',
    googleMapsPlaceUri:
      'https://maps.google.com/?cid=9331157722909174934&g_mp=CiVnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLkdldFBsYWNlEAIYBCAA',
  };

  const reviews: Prisma.ReviewUncheckedCreateInput[] = [
    {
      id: '00000000-0000-0000-0000-000000000000',
      googleId: 'places/ChIJK4j9CagbdkgRluwkqYLufoE/reviews/Ci9DQUlRQUNvZENodHljRjlvT20xR2FFOHpWelY2WlVOd1RFTkVXbWRYUzBjMU9HYxAB',
      placeId: SEED_PLACE_ID,
      authorName: 'Pratik Rajiv Shah',
      publishTime: '2026-03-06T20:29:14.140011116Z',
      rating: 5,
      text: 'Amazing spot. The ambience is honestly one of the best parts of the place. Very relaxed, warm and perfect for a slow meal.\n\nThe food completely lived up to it as well. I had the mushroom truffle toast and the truffle pasta and both were excellent. The truffle flavour was spot on and the pasta in particular really blew me away.\n\nEverything just worked together the atmosphere, the food, the overall vibe. Left the place genuinely impressed and had a great time.\n\nThe team also mentioned they have opened a sister branch in Dublin, so I will definitely be checking that one out as well.',
      authorPhotoUri:
        'https://lh3.googleusercontent.com/a-/ALV-UjWmtpdGdXtDH56u7q6dIiN0L4aXGvhcPuCJhqW3AFJPuC-WG4us=s128-c0x00000000-cc-rp-mo-ba5',
      googleMapsUri:
        'https://www.google.com/maps/reviews/data=!4m6!14m5!1m4!2m3!1sCi9DQUlRQUNvZENodHljRjlvT20xR2FFOHpWelY2WlVOd1RFTkVXbWRYUzBjMU9HYxAB!2m1!1s0x48761ba809fd882b:0x817eee82a924ec96',
    },
  ];

  await tx.place.upsert({
    where: { id: SEED_PLACE_ID },
    create: place,
    update: place,
  });

  await Promise.all(
    reviews.map(async (review) => {
      await tx.review.upsert({
        where: { id: review.id },
        create: review,
        update: review,
      });
    }),
  );
}
