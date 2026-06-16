import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { client } from '../client';

interface CreateWebsiteParams {
  name: string;
}

export function useCreateWebsite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: CreateWebsiteParams) => {
      const { data, error } = await client.POST('/websites', { body });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['websites'] });
      toast.success('Website created successfully');
    },
    onError: (error) => {
      toast.error(`Cannot create website: ${error.message}`);
    },
  });
}
