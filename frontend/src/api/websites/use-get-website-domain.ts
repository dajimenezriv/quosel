import { useQuery } from '@tanstack/react-query';
import { client } from '../client';
import type { components } from '../schema';

export type WebsiteDomainStatus = components['schemas']['WebsiteDomainStatus'];

export function useGetWebsiteDomain(websiteId: string) {
  return useQuery({
    queryKey: ['websites', websiteId, 'domain'],
    queryFn: async () => {
      const { data, error } = await client.GET('/websites/{websiteId}/domain', {
        params: { path: { websiteId } },
      });

      if (error) throw error;
      return data;
    },
  });
}
