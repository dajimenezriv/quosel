import { client } from '@/api/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useDeleteImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (imageId: string) => {
      const { error } = await client.DELETE('/images/{imageId}', {
        params: { path: { imageId } },
      });
      if (error) throw error;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['images'] });
      toast.success('Image deleted successfully');
    },
    onError: (error) => {
      toast.error(`Cannot delete image: ${error.message}`);
    },
  });
}
