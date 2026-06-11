import { useGetWebsite } from '@/api/websites/use-get-website';
import { useUpdateWebsite } from '@/api/websites/use-update-website';
import { BaseLayout } from '@/components/layouts/base-layout';
import { Button } from '@/components/ui/button';
import { useEditorStore } from '@/core/editor/use-editor-store';
import { Customizer } from '@/modules/editor/customizer/customizer';
import { IPhoneDevice } from '@/modules/editor/devices/iphon-device';
import { SafariDevice } from '@/modules/editor/devices/safari-device';
import { Laptop, Save, Settings, Smartphone } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

export default function Page() {
  const { websiteId } = useParams<{ websiteId: string }>();
  const { data } = useGetWebsite(websiteId!);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(true);

  const hydrate = useEditorStore((s) => s.hydrate);
  const draft = useEditorStore((s) => s.draft);
  const device = useEditorStore((s) => s.device);
  const setDevice = useEditorStore((s) => s.setDevice);

  useEffect(() => {
    if (data) hydrate(data);
  }, [data, hydrate]);

  const { mutate: updateWebsite, isPending } = useUpdateWebsite();

  function toggleCustomizer() {
    setIsCustomizerOpen(!isCustomizerOpen);
  }

  function save() {
    if (!draft || !websiteId) return;
    updateWebsite(
      { websiteId, ...draft },
      {
        onSuccess: () => toast.success('Website saved successfully'),
        onError: (error) => toast.error(`Cannot save website: ${error.message}`),
      },
    );
  }

  return (
    <BaseLayout
      showSidebar={false}
      title="Editor"
      extra={
        <>
          <div className="flex">
            <div className="bg-muted text-muted-foreground flex rounded-lg p-1">
              <button
                onClick={() => setDevice('laptop')}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm ${device === 'laptop' ? 'bg-background text-foreground' : 'cursor-pointer'}`}>
                <Laptop className="h-4 w-4" />
                Laptop
              </button>
              <button
                onClick={() => setDevice('phone')}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm ${device === 'phone' ? 'bg-background text-foreground shadow-sm' : 'cursor-pointer'}`}>
                <Smartphone className="h-4 w-4" />
                Phone
              </button>
            </div>
          </div>
          <Button variant="outline" onClick={save} disabled={isPending} className="cursor-pointer">
            <Save className="h-[1.2rem] w-[1.2rem]" />
            Save
          </Button>
          <Button variant="outline" size="icon" onClick={toggleCustomizer} className="cursor-pointer">
            <Settings className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </>
      }>
      {draft && (
        <>
          <div className="flex flex-1 items-center justify-center p-6">
            {device === 'laptop' ? <SafariDevice data={draft} /> : <IPhoneDevice data={draft} />}
          </div>

          <Customizer data={draft} open={isCustomizerOpen} />
        </>
      )}
    </BaseLayout>
  );
}
