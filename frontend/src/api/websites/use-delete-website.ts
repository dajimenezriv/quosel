import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { client } from '../client';

interface DeleteWebsiteParams {
  websiteId: string;
}

export function useDeleteWebsite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ websiteId }: DeleteWebsiteParams) => {
      const { error } = await client.DELETE('/websites/{websiteId}', {
        params: {
          path: { websiteId },
        },
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['websites'] });
      toast.success('Website deleted successfully');
    },
    onError: (error) => {
      toast.error(`Cannot delete website: ${error.message}`);
    },
  });
}
