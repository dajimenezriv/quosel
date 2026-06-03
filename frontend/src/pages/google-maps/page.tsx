import { useCreateFromGooglePlace } from '@/api/websites/use-create-from-google-place';
import { BaseLayout } from '@/components/layouts/base-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Page() {
  const { mutate: addGooglePlace, isPending } = useCreateFromGooglePlace();
  const [googlePlaceId, setGooglePlaceId] = useState('ChIJRWnYS1BHYA0RK5rHEosqXcQ');
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<Element>) {
    e.preventDefault();
    addGooglePlace(googlePlaceId, {
      onSuccess: (data) => {
        navigate(`/editor/${data.websiteId}`);
      },
    });
  }

  return (
    <BaseLayout title="Google Maps">
      <form onSubmit={handleSubmit} className="flex max-w-xl gap-2">
        <Input placeholder="ChIJRWnYS1BHYA0RK5rHEosqXcQ" value={googlePlaceId} onChange={(e) => setGooglePlaceId(e.target.value)} />
        <Button type="submit" disabled={isPending}>
          Submit
        </Button>
      </form>
    </BaseLayout>
  );
}
