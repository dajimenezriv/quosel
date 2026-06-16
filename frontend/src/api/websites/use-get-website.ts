import { useQuery } from '@tanstack/react-query';
import { client } from '../client';

export function useGetWebsite(websiteId: string) {
  return useQuery({
    queryKey: ['websites', websiteId],
    queryFn: async () => {
      const { data, error } = await client.GET('/websites/{websiteId}', {
        params: { path: { websiteId } },
      });

      if (error) throw error;
      return data;
    },
  });
}
