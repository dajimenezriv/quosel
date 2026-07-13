import { useExportWebsite } from '@/api/websites/use-export-website';
import { useGetWebsite } from '@/api/websites/use-get-website';
import { useUpdateWebsite } from '@/api/websites/use-update-website';
import { BaseLayout } from '@/components/layouts/base-layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEditorStore } from '@/core/editor/use-editor-store';
import { Customizer } from '@/modules/editor/customizer/customizer';
import { GeneralTab } from '@/modules/editor/customizer/general-tab/general-tab';
import { LayoutTab } from '@/modules/editor/customizer/layout-tab';
import { ThemeTab } from '@/modules/editor/customizer/theme-tab';
import { Device } from '@/modules/editor/devices/device';
import { DeviceSwitcher } from '@/modules/editor/devices/switch-device';
import { useAuth } from '@/old/auth';
import { Download, Globe, Layout, Palette, RotateCcw, Save, Settings, SlidersHorizontal } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Page() {
  const { user } = useAuth();
  const { websiteId } = useParams<{ websiteId: string }>();
  const { data } = useGetWebsite(websiteId!);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('layout');

  const hydrate = useEditorStore((s) => s.hydrate);
  const draft = useEditorStore((s) => s.draft);
  const device = useEditorStore((s) => s.device);
  const reset = useEditorStore((s) => s.reset);

  useEffect(() => {
    if (data) hydrate(data);
  }, [data, hydrate]);

  const { mutate: updateWebsite, isPending: isUpdating } = useUpdateWebsite();
  const { mutate: exportZip, isPending: isExporting } = useExportWebsite();

  function toggleCustomizer() {
    setIsCustomizerOpen(!isCustomizerOpen);
  }

  function save() {
    if (!draft || !websiteId) return;
    updateWebsite({ websiteId, data: draft });
  }

  function publish() {
    if (!draft || !websiteId) return;
    updateWebsite({ websiteId, publish: true, data: draft });
  }

  function exportWebsite() {
    if (!draft || !websiteId) return;
    exportZip({ websiteId, slug: draft.slug });
  }

  return (
    <BaseLayout
      title="Editor"
      extra={
        <>
          <Button
            variant="link"
            onClick={() => window.open(`${window.location.origin}/public-editor/${draft?.editToken}`, '_blank')}
            className="cursor-pointer">
            <Globe className="h-[1.2rem] w-[1.2rem]" />
            Public
          </Button>

          <DeviceSwitcher device={device} />

          <Button variant="outline" onClick={reset} className="cursor-pointer">
            <RotateCcw className="h-[1.2rem] w-[1.2rem]" />
            Reset
          </Button>
          <Button variant="outline" onClick={save} disabled={isUpdating} className="cursor-pointer">
            <Save className="h-[1.2rem] w-[1.2rem]" />
            Save
          </Button>

          <Button onClick={publish} disabled={isUpdating} className="cursor-pointer">
            <Globe className="h-[1.2rem] w-[1.2rem]" />
            Publish
          </Button>

          {user?.subscriptionStatus === 'active' && (
            <Button variant="outline" onClick={exportWebsite} disabled={isExporting} className="cursor-pointer">
              <Download className="h-[1.2rem] w-[1.2rem]" />
              Export
            </Button>
          )}

          <Button variant="outline" size="icon" onClick={toggleCustomizer} className="cursor-pointer">
            <Settings className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </>
      }>
      {draft && (
        <>
          <Device device={device} website={draft} />

          <Customizer open={isCustomizerOpen}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex min-h-0 flex-1 flex-col">
              <TabsList className="flex h-12 rounded-none p-1.5">
                <TabsTrigger value="general" className="data-[state=active]:bg-background cursor-pointer">
                  <SlidersHorizontal className="mr-1 h-4 w-4" /> General
                </TabsTrigger>
                <TabsTrigger value="layout" className="data-[state=active]:bg-background cursor-pointer">
                  <Layout className="mr-1 h-4 w-4" /> Layout
                </TabsTrigger>
                <TabsTrigger value="theme" className="data-[state=active]:bg-background cursor-pointer">
                  <Palette className="mr-1 h-4 w-4" /> Theme
                </TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="flex min-h-0 flex-1 flex-col overflow-auto p-4">
                <GeneralTab user={user} data={draft} />
              </TabsContent>

              <TabsContent value="layout" className="flex min-h-0 flex-1 flex-col overflow-auto p-4">
                <LayoutTab user={user} data={draft} />
              </TabsContent>

              <TabsContent value="theme" className="flex min-h-0 flex-1 flex-col overflow-auto p-4">
                <ThemeTab data={draft} />
              </TabsContent>
            </Tabs>
          </Customizer>
        </>
      )}
    </BaseLayout>
  );
}
