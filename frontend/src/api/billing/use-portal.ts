import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { client } from '../client';

export function usePortal() {
  return useMutation({
    mutationFn: async () => {
      const { data, error } = await client.POST('/billing/portal');
      if (error) throw error;
      return data;
    },
    onSuccess: ({ url }) => {
      window.location.href = url;
    },
    onError: (error) => {
      toast.error(`Cannot open billing portal: ${error.message}`);
    },
  });
}
