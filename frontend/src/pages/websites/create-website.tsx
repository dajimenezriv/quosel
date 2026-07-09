import { useCreateWebsite } from '@/api/websites/use-create-website';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { slugifyInput } from '@quosel/core/templates';
import { useState } from 'react';

interface Props {
  close: () => void;
}

export function CreateWebsite({ close }: Props) {
  const { mutate: createWebsite, isPending } = useCreateWebsite();
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [slugEdited, setSlugEdited] = useState(false);

  const valid = name.trim() && slug;

  // Keep the slug in sync with the name until the user edits it themselves. The slug is
  // permanent once the site is created, so this is the only chance to choose it.
  function changeName(value: string) {
    setName(value);
    if (!slugEdited) setSlug(slugifyInput(value));
  }

  function changeSlug(value: string) {
    setSlugEdited(true);
    setSlug(slugifyInput(value));
  }

  function create() {
    if (!valid) return;
    createWebsite({ name: name.trim(), slug }, { onSuccess: close });
  }

  return (
    <Dialog open onOpenChange={(open) => !open && close()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create website</DialogTitle>
        </DialogHeader>
        <Input
          value={name}
          onChange={(e) => changeName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && create()}
          placeholder="Website name"
        />
        <div className="flex flex-col gap-2">
          <Input
            value={slug}
            onChange={(e) => changeSlug(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && create()}
            placeholder="website-url"
          />
          <p className="text-muted-foreground text-xs">https://{slug || 'website-url'}.quosel.app · this can't be changed later</p>
        </div>
        <DialogFooter>
          <Button onClick={create} disabled={isPending || !valid} className="cursor-pointer">
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
