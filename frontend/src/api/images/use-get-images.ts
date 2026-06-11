import { useQuery } from '@tanstack/react-query';
import { client } from '../client';

export function useGetImages() {
  return useQuery({
    queryKey: ['images'],
    queryFn: async () => {
      const { data, error } = await client.GET('/images');
      if (error) throw error;
      return data;
    },
  });
}
