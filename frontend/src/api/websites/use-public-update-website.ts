import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { client } from '../client';
import type { components } from '../schema';

interface Props {
  editToken: string;
  data: components['schemas']['PublicUpdateWebsite'];
}

export function usePublicUpdateWebsite() {
  return useMutation({
    mutationFn: async ({ editToken, data }: Props) => {
      const { error } = await client.PUT('/websites/public/{editToken}', {
        body: data,
        params: { path: { editToken } },
      });

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Website saved successfully');
    },
    onError: (error) => {
      toast.error(`Cannot save website: ${error.message}`);
    },
  });
}
