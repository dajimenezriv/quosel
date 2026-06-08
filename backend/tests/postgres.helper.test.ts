import type { UserId } from '@/core/types';
import { prisma } from '@/infra/postgres/client';

export async function createMockUser() {
  const user = await prisma.user.create({
    data: {
      googleId: crypto.randomUUID(),
      email: crypto.randomUUID(),
      name: 'name',
      givenName: 'givenName',
      familyName: 'familyName',
      picture: 'picture',
      stripeCustomerId: crypto.randomUUID(),
      subscriptionStatus: 'subscriptionStatus',
      subscriptionPriceId: 'subscriptionPriceId',
    },
  });

  return { ...user, id: user.id as UserId };
}

// export async function createMockPlace() {
//   return await prisma.place.create({
//     data: {
//       googleId: crypto.randomUUID(),
//       name: 'name',
//       formattedAddress: 'formattedAddress',
//       shortFormattedAddress: 'shortFormattedAddress',
//       googleMapsPhotosUri: 'googleMapsPhotosUri',
//       googleMapsPlaceUri: 'googleMapsPlaceUri',
//       googleMapsReviewsUri: 'googleMapsReviewsUri',
//       internationalPhoneNumber: 'internationalPhoneNumber',
//       latitude: 0,
//       longitude: 0,
//       raw: {},
//     },
//   });
// }

// export async function createMockWebsite(userId: UserId, placeId: string) {
//   return await prisma.website.create({
//     data: {
//       userId,
//       placeId,
//       blocks: {},
//       styles: {},
//     },
//   });
// }

export async function createMockImage(userId: UserId) {
  return await prisma.websiteImage.create({
    data: {
      id: crypto.randomUUID(),
      sizeBytes: 1024,
      userId,
    },
  });
}
