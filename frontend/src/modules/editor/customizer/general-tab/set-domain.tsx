import { useSetWebsiteDomain } from '@/api/websites/use-set-website-domain';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { DomainStatus } from './domain-status';

interface Props {
  websiteId: string;
  currentDomain: string;
  close: () => void;
}

function bareHost(domain: string) {
  return domain.replace(/^https?:\/\//, '');
}

export function SetDomain({ websiteId, currentDomain, close }: Props) {
  const initial = bareHost(currentDomain);
  const isDefault = initial.endsWith('.quosel.app');

  const [host, setHost] = useState(isDefault ? '' : initial);
  const [saved, setSaved] = useState(false);
  const { mutate: setDomain, isPending } = useSetWebsiteDomain();

  const valid = /^[a-z0-9.-]+$/.test(host.trim()) && host.trim().split('.').length >= 3;

  function save() {
    if (!valid) return;
    setDomain({ websiteId, domain: host.trim().toLowerCase() }, { onSuccess: () => setSaved(true) });
  }

  return (
    <Dialog open onOpenChange={(open) => !open && close()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Custom domain</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-2">
          <Input
            value={host}
            onChange={(e) => setHost(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && save()}
            placeholder="www.example.com"
          />
          <p className="text-muted-foreground text-xs">
            Enter your domain with <span className="font-medium">www</span>. Your bare domain (example.com) redirects to it.
          </p>
          <Button onClick={save} disabled={isPending || !valid} className="cursor-pointer">
            Save
          </Button>
        </div>

        {(!isDefault || saved) && <DomainStatus websiteId={websiteId} />}
      </DialogContent>
    </Dialog>
  );
}
