import { useGetWebsites } from '@/api/websites/use-get-websites';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { EllipsisVertical } from 'lucide-react';

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function DataTable({ onRowClick, onDelete }: { onRowClick?: (id: string) => void; onDelete?: (id: string) => void }) {
  const { data } = useGetWebsites();

  if (!data) return null;

  if (data.websites.length === 0) {
    return <div className="text-muted-foreground rounded-lg border p-12 text-center">No websites yet.</div>;
  }

  return (
    <div className="flex flex-wrap gap-4">
      {data.websites.map((website) => {
        const { styles, logoUrl, heroImageUrl, domain } = website;

        const publicEditor = `${window.location.origin}/public-editor/${website.editToken}`;

        return (
          <div
            key={website.id}
            onClick={() => onRowClick?.(website.id)}
            className={cn(
              'group relative flex aspect-2/3 w-72 flex-col justify-end overflow-hidden rounded-2xl text-white shadow-md transition-shadow hover:shadow-xl',
              onRowClick && 'cursor-pointer',
            )}>
            {/* Background */}
            {heroImageUrl ? (
              <img
                src={heroImageUrl}
                alt=""
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${styles.primary}, ${styles.accent})` }} />
            )}
            <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/35 to-black/5" />

            {/* Top bar */}
            <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4">
              <div className="size-10 shrink-0 overflow-hidden rounded-full border border-white/30 bg-white/10 backdrop-blur">
                {logoUrl ? (
                  <img src={logoUrl} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div
                    className="flex h-full w-full items-center justify-center text-sm font-semibold"
                    style={{ background: styles.primary }}>
                    {website.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => e.stopPropagation()}
                    className="size-8 cursor-pointer bg-black/30 text-white backdrop-blur hover:bg-black/50 hover:text-white">
                    <EllipsisVertical />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem asChild>
                    <a href={publicEditor} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                      Public editor
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    variant="destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete?.(website.id);
                    }}>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Content */}
            <div className="relative flex flex-col gap-3 p-5">
              <div className="flex flex-col gap-1">
                <h3 className="text-2xl leading-tight font-bold">{website.name}</h3>
                <p className="truncate text-sm text-white/70">{domain}</p>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs font-medium">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 backdrop-blur">
                  <span className={cn('size-1.5 rounded-full', website.publishedAt ? 'bg-green-400' : 'bg-amber-400')} />
                  {website.publishedAt ? 'Live' : 'Draft'}
                </span>
                <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 backdrop-blur">
                  Updated {formatDate(website.updatedAt)}
                </span>
              </div>

              <a
                href={`https://${domain}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="mt-1 inline-flex w-full items-center justify-center rounded-full bg-white px-4 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-white/90">
                Visit site
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
