import { useQuery } from '@tanstack/react-query';
import { client } from '../client';

export function useGetWebsites() {
  return useQuery({
    queryKey: ['websites'],
    queryFn: async () => {
      const { data, error } = await client.GET('/websites');
      if (error) throw error;
      return data;
    },
  });
}
