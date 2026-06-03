import { useMutation } from '@tanstack/react-query';
import { client } from '../client';

export function useCreateFromGooglePlace() {
  return useMutation({
    mutationFn: async (googlePlaceId: string) => {
      const { data, error } = await client.POST('/websites/create-from-google-place', {
        params: { query: { googlePlaceId } },
      });

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      // ApiNotification.success(
      //   "Manual entry updated",
      //   "Manual entry have been modified correctly.",
      // );
      // queryClient.invalidateQueries({
      //   queryKey: queryKeys.getManualEntry(manualEntryId),
      // });
    },
    onError: (error) => {
      console.log('ERRRROR', error);
      // ApiNotification.error("Error when modifying manual entry", error.message);
    },
  });
}
