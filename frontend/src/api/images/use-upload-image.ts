import { client } from '@/api/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

export function useUploadImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ file, websiteId }: { file: File; websiteId: string }) => {
      const { data, error } = await client.POST('/images/upload', {
        body: { file, websiteId },
        bodySerializer: (body) => {
          const { file, websiteId } = body!;
          const form = new FormData();
          form.append('file', file);
          form.append('websiteId', websiteId);
          return form;
        },
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['images'] });
    },
    onError: (error) => {
      toast.error(`Cannot upload image: ${error.message}`);
    },
  });
}
