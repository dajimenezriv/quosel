import { useCreateWebsite } from '@/api/websites/use-create-website';
import { useDeleteWebsite } from '@/api/websites/use-delete-website';
import { DataTable } from '@/components/data-table';
import { BaseLayout } from '@/components/layouts/base-layout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Page() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { mutate: createWebsite, isPending } = useCreateWebsite();
  const { mutate: deleteWebsite, isPending: isDeleting } = useDeleteWebsite();

  function create() {
    if (!name.trim()) return;
    createWebsite(
      { name: name.trim() },
      {
        onSuccess: () => {
          setOpen(false);
          setName('');
        },
      },
    );
  }

  function confirmDelete() {
    if (!deleteId) return;
    deleteWebsite({ websiteId: deleteId }, { onSuccess: () => setDeleteId(null) });
  }

  return (
    <BaseLayout
      title="Websites"
      extra={
        <Button onClick={() => setOpen(true)} className="cursor-pointer">
          <Plus className="h-[1.2rem] w-[1.2rem]" />
          Create
        </Button>
      }>
      <div className="flex-1 p-6">
        <DataTable onRowClick={(id) => navigate(`/editor/${id}`)} onDelete={setDeleteId} />
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create website</DialogTitle>
          </DialogHeader>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && create()}
            placeholder="Website name"
          />
          <DialogFooter>
            <Button onClick={create} disabled={isPending || !name.trim()} className="cursor-pointer">
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteId !== null} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete website</DialogTitle>
            <DialogDescription>Are you sure you want to delete this website? This action cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteId(null)} className="cursor-pointer">
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete} disabled={isDeleting} className="cursor-pointer">
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </BaseLayout>
  );
}
