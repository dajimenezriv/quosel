import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { client } from '../client';

export function useCheckout() {
  return useMutation({
    mutationFn: async () => {
      const { data, error } = await client.POST('/billing/checkout');
      if (error) throw error;
      return data;
    },
    onSuccess: ({ url }) => {
      window.location.href = url;
    },
    onError: (error) => {
      toast.error(`Cannot start checkout: ${error.message}`);
    },
  });
}
