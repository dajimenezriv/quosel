import { useGetWebsite } from '@/api/websites/use-get-website';
import { useUpdateWebsite } from '@/api/websites/use-update-website';
import { BaseLayout } from '@/components/layouts/base-layout';
import { Button } from '@/components/ui/button';
import { useEditorStore } from '@/core/editor/use-editor-store';
import { Customizer } from '@/modules/editor/customizer/customizer';
import { IPhoneDevice } from '@/modules/editor/devices/iphon-device';
import { SafariDevice } from '@/modules/editor/devices/safari-device';
import { renderTemplate } from '@quosel/core/templates';
import { Download, Globe, Laptop, RotateCcw, Save, Settings, Smartphone } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const DEMO_WEBSITE_ID = '9acafda9-c93c-4a78-9351-44b0367cc4c9';

interface Props {
  isUserLogged?: boolean;
}

export default function Page({ isUserLogged = false }: Props) {
  const { websiteId } = useParams<{ websiteId: string }>();
  const { data } = useGetWebsite(websiteId!);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(true);

  const hydrate = useEditorStore((s) => s.hydrate);
  const draft = useEditorStore((s) => s.draft);
  const device = useEditorStore((s) => s.device);
  const setDevice = useEditorStore((s) => s.setDevice);
  const reset = useEditorStore((s) => s.reset);

  useEffect(() => {
    if (data) hydrate(data);
  }, [data, hydrate]);

  const { mutate: updateWebsite, isPending } = useUpdateWebsite();

  function toggleCustomizer() {
    setIsCustomizerOpen(!isCustomizerOpen);
  }

  function save() {
    if (!draft || !websiteId) return;
    if (!isUserLogged && websiteId === DEMO_WEBSITE_ID) {
      toast.warning('This site is a demo and cannot be edited');
      return;
    }
    updateWebsite({ websiteId, data: draft });
  }

  function publish() {
    if (!draft || !websiteId) return;
    updateWebsite({ websiteId, publish: true, data: draft });
  }

  function exportHtml() {
    if (!draft) return;
    const html = renderTemplate(draft);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <BaseLayout
      title="Editor"
      showSidebar={isUserLogged}
      extra={
        <>
          {isUserLogged && (
            <Button
              variant="link"
              onClick={() => window.open(`${window.location.origin}/public-editor/${websiteId}`, '_blank')}
              className="cursor-pointer">
              <Globe className="h-[1.2rem] w-[1.2rem]" />
              Public
            </Button>
          )}

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
          <Button variant="outline" onClick={reset} className="cursor-pointer">
            <RotateCcw className="h-[1.2rem] w-[1.2rem]" />
            Reset
          </Button>
          <Button variant="outline" onClick={save} disabled={isPending} className="cursor-pointer">
            <Save className="h-[1.2rem] w-[1.2rem]" />
            Save
          </Button>

          {isUserLogged && (
            <>
              <Button onClick={publish} disabled={isPending} className="cursor-pointer">
                <Globe className="h-[1.2rem] w-[1.2rem]" />
                Publish
              </Button>
              <Button variant="outline" onClick={exportHtml} className="cursor-pointer">
                <Download className="h-[1.2rem] w-[1.2rem]" />
                Export
              </Button>
            </>
          )}

          <Button variant="outline" size="icon" onClick={toggleCustomizer} className="cursor-pointer">
            <Settings className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </>
      }>
      {draft && (
        <>
          <div className="flex flex-1 items-center justify-center p-6">
            {device === 'laptop' ? (
              <SafariDevice domain={`https://sites.quosel.com/${draft.slug}`} data={draft} />
            ) : (
              <IPhoneDevice data={draft} />
            )}
          </div>

          <Customizer data={draft} open={isCustomizerOpen} isUserLogged={isUserLogged} />
        </>
      )}
    </BaseLayout>
  );
}
