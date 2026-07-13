import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { client } from '../client';

interface ExportWebsiteParams {
  websiteId: string;
  slug: string;
}

export function useExportWebsite() {
  return useMutation({
    mutationFn: async ({ websiteId }: ExportWebsiteParams) => {
      const { data, error } = await client.GET('/websites/{websiteId}/export', {
        params: { path: { websiteId } },
        parseAs: 'blob',
      });

      if (error) throw error;
      return data;
    },
    onSuccess: (zip, { slug }) => {
      const url = URL.createObjectURL(zip);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${slug}.zip`;
      a.click();
      URL.revokeObjectURL(url);
    },
    onError: (error) => {
      toast.error(`Cannot export website: ${error.message}`);
    },
  });
}
