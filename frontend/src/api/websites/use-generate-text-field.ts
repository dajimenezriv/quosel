import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { client } from '../client';

export function useGenerateTextField() {
  return useMutation({
    mutationFn: async ({ prompt }: { prompt: string }) => {
      const { data, error } = await client.POST('/websites/generate-field-text', {
        body: { prompt },
      });

      if (error) throw error;
      return data.text;
    },
    onError: (error) => {
      toast.error(`Cannot generate text: ${error.message}`);
    },
  });
}
