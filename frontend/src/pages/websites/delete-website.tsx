import { useDeleteWebsite } from '@/api/websites/use-delete-website';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Props {
  deleteId: string;
  close: () => void;
}

export function DeleteWebsite({ deleteId, close }: Props) {
  const { mutate: deleteWebsite, isPending: isDeleting } = useDeleteWebsite();

  function confirmDelete() {
    if (!deleteId) return;
    deleteWebsite({ websiteId: deleteId }, { onSuccess: close });
  }

  return (
    <Dialog open onOpenChange={(open) => !open && close()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete website</DialogTitle>
          <DialogDescription>Are you sure you want to delete this website? This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={close} className="cursor-pointer">
            Cancel
          </Button>
          <Button variant="destructive" onClick={confirmDelete} disabled={isDeleting} className="cursor-pointer">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
