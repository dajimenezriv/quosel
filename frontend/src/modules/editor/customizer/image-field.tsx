import { useDeleteImage } from '@/api/images/use-delete-image';
import { useGetImages } from '@/api/images/use-get-images';
import { useUploadImage } from '@/api/images/use-upload-image';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, FolderOpen, Images, Trash2, Upload, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

const PAGE_SIZE = 12;

interface Props {
  value: string;
  onChange: (url: string) => void;
}

export function ImageField({ value, onChange }: Props) {
  const { websiteId } = useParams<{ websiteId: string }>();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { data } = useGetImages();
  const upload = useUploadImage();
  const deleteImage = useDeleteImage();

  const images = data?.images ?? [];
  const totalPages = Math.ceil(images.length / PAGE_SIZE);
  const paged = images.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !websiteId) return;
    upload.mutate(
      { file, websiteId },
      {
        onSuccess: (img) => {
          onChange(img.url);
          setOpen(false);
        },
      },
    );
    e.target.value = '';
  }

  function formatDate(raw: string | Date) {
    return new Date(raw).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: '2-digit' });
  }

  return (
    <>
      <div className="flex gap-2">
        <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder="https://..." />
        <Button variant="outline" size="icon" onClick={() => setOpen(true)} className="shrink-0 cursor-pointer">
          <FolderOpen className="h-4 w-4" />
        </Button>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent showCloseButton={false} className="flex max-w-5xl flex-col gap-4 p-0">
          {/* Header */}
          <div className="flex items-center justify-between border-b px-6 py-4">
            <div className="flex items-center gap-2.5">
              <div className="bg-primary/10 text-primary flex h-8 w-8 items-center justify-center rounded-md">
                <Images className="h-4 w-4" />
              </div>
              <div>
                <DialogTitle className="text-base font-semibold">Image library</DialogTitle>
                <p className="text-muted-foreground text-xs">
                  {images.length} image{images.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="cursor-pointer"
                disabled={upload.isPending}
                onClick={() => fileInputRef.current?.click()}>
                <Upload className="mr-1.5 h-3.5 w-3.5" />
                {upload.isPending ? 'Uploading…' : 'Upload'}
              </Button>
              <DialogClose asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 cursor-pointer">
                  <X className="h-4 w-4" />
                </Button>
              </DialogClose>
            </div>
          </div>
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />

          {/* Body */}
          <div className="px-6 pb-6">
            {images.length === 0 ? (
              <p className="text-muted-foreground py-16 text-center text-sm">No images yet. Upload one to get started.</p>
            ) : (
              <>
                <div className="grid grid-cols-4 gap-4">
                  {paged.map((img) => (
                    <div
                      key={img.id}
                      className={cn(
                        'group relative aspect-square overflow-hidden rounded-md border-2 transition-colors',
                        value === img.url ? 'border-primary' : 'hover:border-muted-foreground/40 border-transparent',
                      )}>
                      <button
                        onClick={() => {
                          onChange(img.url);
                          setOpen(false);
                        }}
                        className="h-full w-full cursor-pointer">
                        <img src={img.url} alt="" className="h-full w-full object-cover" />
                      </button>
                      <span className="absolute right-1.5 bottom-1.5 rounded bg-black/60 px-1.5 py-1 text-xs leading-none text-white">
                        {formatDate(img.createdAt)}
                      </span>
                      <button
                        onClick={() => deleteImage.mutate(img.id)}
                        disabled={deleteImage.isPending}
                        className="absolute top-1 right-1 hidden cursor-pointer rounded-md bg-black/60 p-1 text-white group-hover:flex">
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="mt-4 flex items-center justify-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 cursor-pointer"
                      disabled={page === 0}
                      onClick={() => setPage((p) => p - 1)}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-muted-foreground text-sm">
                      {page + 1} / {totalPages}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 cursor-pointer"
                      disabled={page === totalPages - 1}
                      onClick={() => setPage((p) => p + 1)}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
