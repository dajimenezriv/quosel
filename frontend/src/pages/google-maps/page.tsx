import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAddGooglePlace } from '@/api/places/use-add-google-place';
import { BaseLayout } from '@/components/layouts/base-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Page() {
  const { mutate: addGooglePlace, isPending } = useAddGooglePlace();

  const [googlePlaceId, setGooglePlaceId] = React.useState('ChIJRWnYS1BHYA0RK5rHEosqXcQ');
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<Element>) {
    e.preventDefault();
    addGooglePlace(googlePlaceId, {
      onSuccess: (data) => {
        navigate(`/editor/${data.placeId}`);
      },
    });
  }

  return (
    <BaseLayout title="Google Maps">
      <div className="px-4 lg:px-6">
        <form onSubmit={handleSubmit} className="flex max-w-xl gap-2">
          <Input placeholder="ChIJRWnYS1BHYA0RK5rHEosqXcQ" value={googlePlaceId} onChange={(e) => setGooglePlaceId(e.target.value)} />
          <Button type="submit" disabled={isPending}>
            Submit
          </Button>
        </form>
      </div>
    </BaseLayout>
  );
}
