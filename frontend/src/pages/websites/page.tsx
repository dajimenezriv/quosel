import { DataTable } from '@/components/data-table';
import { BaseLayout } from '@/components/layouts/base-layout';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateWebsite } from './create-website';
import { DeleteWebsite } from './delete-website';

export default function Page() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

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

      {open && <CreateWebsite close={() => setOpen(false)} />}
      {deleteId && <DeleteWebsite deleteId={deleteId} close={() => setDeleteId(null)} />}
    </BaseLayout>
  );
}
