import type { Blocks, Styles } from '@quosel/templates';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { client } from '../client';

export interface WebsiteData {
  slug: string;
  blocks: Blocks;
  styles: Styles;
}

interface Props {
  websiteId: string;
  publish?: boolean;
  data: WebsiteData;
}

export function useUpdateWebsite() {
  return useMutation({
    mutationFn: async ({ websiteId, publish, data }: Props) => {
      const { error } = await client.PUT('/websites/{websiteId}', {
        params: {
          path: { websiteId },
          query: { publish },
        },
        body: data,
      });

      if (error) throw error;
    },
    onSuccess: (_, { publish }) => {
      if (publish) toast.success('Website published successfully');
      else toast.success('Website saved successfully');
    },
    onError: (error, { publish }) => {
      if (publish) toast.error(`Cannot publish website: ${error.message}`);
      else toast.error(`Cannot save website: ${error.message}`);
    },
  });
}
