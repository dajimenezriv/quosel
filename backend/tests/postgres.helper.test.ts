import type { UserId } from '@/core/types';
import { prisma } from '@/infra/postgres/client';
import { Websites } from '@/infra/postgres/websites';

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

export async function createMockWebsite(userId: UserId) {
  return await Websites.create(userId, crypto.randomUUID(), crypto.randomUUID());
}

export async function createMockImage(userId: UserId) {
  return await prisma.websiteImage.create({
    data: {
      id: crypto.randomUUID(),
      sizeBytes: 1024,
      userId,
    },
  });
}
