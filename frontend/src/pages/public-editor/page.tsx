import { usePublicGetWebsite } from '@/api/websites/use-public-get-website';
import { usePublicUpdateWebsite } from '@/api/websites/use-public-update-website';
import { BaseLayout } from '@/components/layouts/base-layout';
import { Button } from '@/components/ui/button';
import { useEditorStore } from '@/core/editor/use-editor-store';
import { Customizer } from '@/modules/editor/customizer/customizer';
import { LayoutTab } from '@/modules/editor/customizer/layout-tab';
import { Device } from '@/modules/editor/devices/device';
import { DeviceSwitcher } from '@/modules/editor/devices/switch-device';
import { RotateCcw, Save, Settings } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'sonner';

const DEMO_WEBSITE_ID = '9acafda9-c93c-4a78-9351-44b0367cc4c9';

export default function Page() {
  const { editToken } = useParams<{ editToken: string }>();
  const { data } = usePublicGetWebsite(editToken!);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(true);

  const hydrate = useEditorStore((s) => s.hydrate);
  const draft = useEditorStore((s) => s.draft);
  const device = useEditorStore((s) => s.device);
  const reset = useEditorStore((s) => s.reset);

  useEffect(() => {
    if (data) hydrate(data);
  }, [data, hydrate]);

  const { mutate: updateWebsite, isPending } = usePublicUpdateWebsite();

  function toggleCustomizer() {
    setIsCustomizerOpen(!isCustomizerOpen);
  }

  function save() {
    if (!draft || !editToken) return;
    if (draft.id === DEMO_WEBSITE_ID) {
      toast.warning('This site is a demo and cannot be edited');
      return;
    }
    updateWebsite({ editToken, data: draft });
  }

  return (
    <BaseLayout
      title="Editor"
      showSidebar={false}
      extra={
        <>
          <DeviceSwitcher device={device} />

          <Button variant="outline" onClick={reset} className="cursor-pointer">
            <RotateCcw className="h-[1.2rem] w-[1.2rem]" />
            Reset
          </Button>
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
          <Device device={device} website={draft} />

          <Customizer open={isCustomizerOpen}>
            <div className="flex min-h-0 flex-1 flex-col overflow-auto p-4">
              <LayoutTab data={draft} user={null} />
            </div>
          </Customizer>
        </>
      )}
    </BaseLayout>
  );
}
