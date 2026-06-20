import { useGetWebsites } from '@/api/websites/use-get-websites';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { EllipsisVertical, ExternalLink } from 'lucide-react';

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

export function DataTable({ onRowClick, onDelete }: { onRowClick?: (id: string) => void; onDelete?: (id: string) => void }) {
  const { data } = useGetWebsites();

  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader className="bg-muted sticky top-0 z-10">
          <TableRow>
            <TableHead>Place</TableHead>
            <TableHead>Domain</TableHead>
            <TableHead>Client Link</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Updated</TableHead>
            <TableHead>Published</TableHead>
            <TableHead />
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {data ? (
            data.websites.map((website) => {
              const domain = `https://sites.quosel.com/${website.slug}`;

              return (
                <TableRow key={website.id} onClick={() => onRowClick?.(website.id)} className={onRowClick ? 'cursor-pointer' : ''}>
                  <TableCell>
                    <span className="font-medium">{website.name}</span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-blue-600 hover:underline dark:text-blue-400">
                      <a href={domain} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                        {domain}
                      </a>
                      <ExternalLink className="size-3 shrink-0" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-blue-600 hover:underline dark:text-blue-400">
                      <a href={domain} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                        {domain}
                      </a>
                      <ExternalLink className="size-3 shrink-0" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-muted-foreground">{formatDate(website.createdAt)}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-muted-foreground">{formatDate(website.updatedAt)}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-muted-foreground">{website.publishedAt && formatDate(website.publishedAt)}</span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="data-[state=open]:bg-muted text-muted-foreground flex size-8 cursor-pointer"
                          size="icon"
                          onClick={(e) => e.stopPropagation()}>
                          <EllipsisVertical />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-32">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
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
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={10} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
