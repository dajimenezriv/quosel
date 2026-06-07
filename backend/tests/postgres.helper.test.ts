import type { UserId } from '@/core/types';
import { prisma } from '@/infra/postgres/client';

export async function createMockUser() {
  const unique = crypto.randomUUID();
  const user = await prisma.user.create({
    data: {
      googleId: unique,
      email: unique,
      name: 'name',
      givenName: 'givenName',
      familyName: 'familyName',
      picture: 'picture',
      subscriptionStatus: 'subscriptionStatus',
      subscriptionPriceId: 'subscriptionPriceId',
    },
  });

  return { ...user, userId: user.id as UserId };
}

export async function createMockPlace() {
  return await prisma.place.create({
    data: {
      googleId: crypto.randomUUID(),
      name: 'name',
      formattedAddress: 'formattedAddress',
      shortFormattedAddress: 'shortFormattedAddress',
      googleMapsPhotosUri: 'googleMapsPhotosUri',
      googleMapsPlaceUri: 'googleMapsPlaceUri',
      googleMapsReviewsUri: 'googleMapsReviewsUri',
      internationalPhoneNumber: 'internationalPhoneNumber',
      latitude: 0,
      longitude: 0,
      raw: {},
    },
  });
}

export async function createMockWebsite(userId: UserId, placeId: string) {
  return await prisma.website.create({
    data: {
      userId,
      placeId,
      blocks: {},
      domain: 'domain,',
    },
  });
}

export async function createMockImage(userId: UserId) {
  return await prisma.websiteImage.create({
    data: {
      key: 'key',
      sizeBytes: 1024,
      userId,
    },
  });
}
