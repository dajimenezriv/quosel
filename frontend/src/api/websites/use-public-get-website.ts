import { useQuery } from '@tanstack/react-query';
import { client } from '../client';

export function usePublicGetWebsite(editToken: string) {
  return useQuery({
    queryKey: ['websites', editToken],
    queryFn: async () => {
      const { data, error } = await client.GET('/websites/public/{editToken}', {
        params: { path: { editToken } },
      });

      if (error) throw error;
      return data;
    },
  });
}
