import { useGetWebsiteDomain } from '@/api/websites/use-get-website-domain';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Props {
  websiteId: string;
}

export function DomainStatus({ websiteId }: Props) {
  const { data, refetch, isFetching } = useGetWebsiteDomain(websiteId);

  if (!data || data.status === 'none') return null;

  const isActive = data.status === 'active';

  return (
    <div className="flex flex-col gap-3 border-t pt-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{data.host}</span>
        {isActive ? <Badge className="bg-green-500">Live</Badge> : <Badge variant="outline">Pending DNS</Badge>}
      </div>

      <p className="text-muted-foreground text-xs">Add this record at your domain provider:</p>
      <div className="bg-muted/50 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 rounded-md p-3 font-mono text-xs">
        <span className="text-muted-foreground">Type</span>
        <span>CNAME</span>
        <span className="text-muted-foreground">Name</span>
        <span>{data.host.split('.')[0]}</span>
        <span className="text-muted-foreground">Value</span>
        <span>customers.quosel.app</span>
      </div>

      <p className="text-muted-foreground text-xs">
        Then set your provider to redirect <span className="font-medium">{data.host.split('.').slice(1).join('.')}</span> to https://
        {data.host}.
      </p>

      {!isActive && (
        <>
          <p className="text-muted-foreground text-xs">
            The certificate issues automatically once the record is live. This can take a few minutes.
          </p>
          <Button variant="outline" onClick={() => void refetch()} disabled={isFetching} className="cursor-pointer">
            {isFetching ? 'Checking…' : 'Verify'}
          </Button>
        </>
      )}
    </div>
  );
}
