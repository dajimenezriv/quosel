import { useGetWebsites } from '@/api/websites/use-get-websites';
import { DataTable } from '@/components/data-table';
import { BaseLayout } from '@/components/layouts/base-layout';
import { useNavigate } from 'react-router-dom';

export default function Page() {
  const { data } = useGetWebsites();
  const navigate = useNavigate();

  return (
    <BaseLayout title="Websites">
      <div className="flex-1 p-6">
        <DataTable data={data?.websites ?? []} onRowClick={(id) => navigate(`/editor/${id}`)} />
      </div>
    </BaseLayout>
  );
}
