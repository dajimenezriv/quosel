import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { client } from '../client';

export function useSetWebsiteDomain() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ websiteId, domain }: { websiteId: string; domain: string }) => {
      const { error } = await client.PUT('/websites/{websiteId}/domain', {
        params: { path: { websiteId } },
        body: { domain },
      });

      if (error) throw error;
      return websiteId;
    },
    onSuccess: (websiteId) => {
      void queryClient.invalidateQueries({ queryKey: ['websites', websiteId, 'domain'] });
      toast.success('Domain saved — add the DNS record to finish.');
    },
    onError: (error) => {
      toast.error(`Cannot set domain: ${error.message}`);
    },
  });
}
