import { useGetWebsite } from '@/api/websites/use-get-website';
import { BaseLayout } from '@/components/layouts/base-layout';
import { Button } from '@/components/ui/button';
import { useEditorStore } from '@/core/editor/use-editor-store';
import { useThemeStore } from '@/core/theme/use-theme-store';
import { renderTemplate } from '@quosel/templates';
import { Download, Laptop, Settings, Smartphone } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Customizer } from './customizer';

function SafariFrame({ html }: { html: string }) {
  const d = useThemeStore((s) => s.isDarkMode);

  return (
    <div
      className="flex h-full w-full flex-col overflow-hidden rounded-xl shadow-2xl"
      style={{ border: `1px solid ${d ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.12)'}` }}>
      {/* Toolbar */}
      <div className="flex shrink-0 items-center gap-2 px-4" style={{ background: d ? '#323232' : '#f5f5f5', height: 52 }}>
        {/* Traffic lights */}
        <div className="flex shrink-0 items-center gap-1.5">
          <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <div className="h-3 w-3 rounded-full bg-[#ffbc2e]" />
          <div className="h-3 w-3 rounded-full bg-[#28c841]" />
        </div>

        {/* Sidebar toggle */}
        <div className="ml-1 shrink-0" style={{ color: d ? '#666' : '#aaa' }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="1.5" y="2.5" width="15" height="13" rx="2" stroke="currentColor" strokeWidth="1.3" />
            <line x1="6" y1="2.5" x2="6" y2="15.5" stroke="currentColor" strokeWidth="1.3" />
          </svg>
        </div>

        {/* Nav arrows */}
        <div className="flex shrink-0 items-center gap-0.5" style={{ color: d ? '#777' : '#aaa' }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M11 4L6 9l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ opacity: 0.35 }}>
            <path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Address bar — pill, spans available space */}
        <div className="flex min-w-0 flex-1 items-center justify-center px-2">
          <div
            className="flex w-full items-center gap-2 px-3 py-1.25"
            style={{
              background: d ? '#1e1e1e' : '#ffffff',
              border: `1px solid ${d ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.15)'}`,
              borderRadius: 8,
              boxShadow: d ? 'none' : '0 1px 2px rgba(0,0,0,0.06)',
            }}>
            {/* Lock icon */}
            <svg width="11" height="13" viewBox="0 0 11 13" fill="none" className="shrink-0" style={{ color: d ? '#666' : '#999' }}>
              <rect x="0.75" y="5.75" width="9.5" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
              <path d="M3 5.5V4a2.5 2.5 0 015 0v1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            <span className="flex-1 text-center text-[12px] select-none" style={{ color: d ? '#aaa' : '#444', letterSpacing: 0.1 }}>
              preview
            </span>
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div
        className="flex shrink-0 items-stretch"
        style={{
          background: d ? '#282828' : '#ebebeb',
          borderTop: `1px solid ${d ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.08)'}`,
          height: 34,
        }}>
        {/* Active tab */}
        <div
          className="flex items-center gap-1.5 px-5"
          style={{
            background: d ? '#323232' : '#f5f5f5',
            borderRight: `1px solid ${d ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.1)'}`,
          }}>
          {/* favicon placeholder */}
          <div className="h-3.5 w-3.5 shrink-0 rounded-[3px]" style={{ background: d ? '#4a4a4a' : '#d0d0d0' }} />
          <span className="text-[12px] select-none" style={{ color: d ? '#ccc' : '#333' }}>
            Preview
          </span>
          <button
            className="ml-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px]"
            style={{ color: d ? '#555' : '#aaa' }}>
            ✕
          </button>
        </div>
      </div>

      {/* Page content */}
      <div className="min-h-0 flex-1 bg-white">
        <iframe srcDoc={html} className="h-full w-full border-0" />
      </div>
    </div>
  );
}

function IPhoneFrame({ html }: { html: string }) {
  const isDarkMode = useThemeStore((s) => s.isDarkMode);
  const d = isDarkMode;

  return (
    <div className="flex h-full items-center justify-center">
      {/* Outer phone body */}
      <div
        className="relative flex flex-col overflow-hidden"
        style={{
          width: 390,
          height: 760,
          borderRadius: 50,
          background: d ? '#1a1a1c' : '#f5f0eb',
          boxShadow: d
            ? '0 0 0 1.5px #3a3a3c, 0 0 0 3px #2a2a2c, 0 30px 80px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.06)'
            : '0 0 0 1.5px #c8b89a, 0 0 0 3px #e8d8c0, 0 30px 80px rgba(0,0,0,0.25), inset 0 0 0 1px rgba(255,255,255,0.5)',
        }}>
        {/* Side buttons — volume up */}
        <div
          className="absolute"
          style={{
            left: -4,
            top: 130,
            width: 4,
            height: 32,
            borderRadius: '3px 0 0 3px',
            background: d ? '#3a3a3c' : '#c8b89a',
          }}
        />
        <div
          className="absolute"
          style={{
            left: -4,
            top: 172,
            width: 4,
            height: 32,
            borderRadius: '3px 0 0 3px',
            background: d ? '#3a3a3c' : '#c8b89a',
          }}
        />
        {/* Power button */}
        <div
          className="absolute"
          style={{
            right: -4,
            top: 150,
            width: 4,
            height: 60,
            borderRadius: '0 3px 3px 0',
            background: d ? '#3a3a3c' : '#c8b89a',
          }}
        />

        {/* Screen bezel inset */}
        <div
          className="relative mx-auto flex h-full w-full flex-col overflow-hidden"
          style={{
            borderRadius: 44,
            margin: 8,
            width: 'calc(100% - 16px)',
            height: 'calc(100% - 16px)',
            background: '#000',
          }}>
          {/* Status bar */}
          <div className="relative z-10 flex shrink-0 items-center justify-between px-8" style={{ height: 54, background: '#fff' }}>
            <span className="text-[15px] font-semibold" style={{ color: '#000', letterSpacing: -0.3 }}>
              9:41
            </span>
            {/* Dynamic Island */}
            <div
              className="absolute top-3 left-1/2 -translate-x-1/2"
              style={{ width: 120, height: 34, borderRadius: 20, background: '#000' }}
            />
            {/* Right icons */}
            <div className="flex items-center gap-1.5">
              {/* Signal */}
              <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
                <rect x="0" y="7" width="3" height="5" rx="0.8" fill="#000" />
                <rect x="4.5" y="4.5" width="3" height="7.5" rx="0.8" fill="#000" />
                <rect x="9" y="2" width="3" height="10" rx="0.8" fill="#000" />
                <rect x="13.5" y="0" width="3" height="12" rx="0.8" fill="#000" />
              </svg>
              {/* Wifi */}
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                <path d="M8 9.5a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" fill="#000" />
                <path d="M3.5 6.5a6.5 6.5 0 019 0" stroke="#000" strokeWidth="1.5" strokeLinecap="round" fill="none" />
                <path d="M1 4a10 10 0 0114 0" stroke="#000" strokeWidth="1.5" strokeLinecap="round" fill="none" />
              </svg>
              {/* Battery */}
              <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
                <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="#000" strokeOpacity="0.35" />
                <rect x="2" y="2" width="16" height="8" rx="2" fill="#000" />
                <path d="M23 4v4a2 2 0 000-4z" fill="#000" fillOpacity="0.4" />
              </svg>
            </div>
          </div>

          {/* Page content */}
          <div className="min-h-0 flex-1 bg-white">
            <iframe srcDoc={html} className="h-full w-full border-0" />
          </div>

          {/* Safari bottom bar */}
          <div
            className="shrink-0"
            style={{ background: d ? '#1c1c1e' : '#f2f2f7', borderTop: `1px solid ${d ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}` }}>
            {/* Address bar */}
            <div className="flex items-center px-4 py-2">
              <div
                className="flex flex-1 items-center justify-center gap-2 px-3 py-2"
                style={{
                  background: d ? '#2c2c2e' : '#fff',
                  border: `1px solid ${d ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.12)'}`,
                  borderRadius: 10,
                }}>
                <svg width="12" height="14" viewBox="0 0 12 14" fill="none" className="shrink-0" style={{ color: d ? '#888' : '#888' }}>
                  <rect x="0.75" y="5.75" width="10.5" height="7.5" rx="1.75" stroke="currentColor" strokeWidth="1.3" />
                  <path d="M3.5 5.5V4a2.5 2.5 0 015 0v1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
                <span className="flex-1 text-center text-[13px]" style={{ color: d ? '#aaa' : '#333' }}>
                  localhost
                </span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0" style={{ color: d ? '#666' : '#aaa' }}>
                  <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            {/* Nav row */}
            <div className="flex items-center justify-around px-2 pb-1" style={{ color: d ? '#888' : '#555' }}>
              <button className="flex h-10 w-10 items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M11 4L6 9l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button className="flex h-10 w-10 items-center justify-center opacity-30">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button className="flex h-10 w-10 items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 1v10M5 4l4-3 4 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <rect x="2.5" y="7.5" width="13" height="9" rx="2" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
              <button className="flex h-10 w-10 items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 2a5.5 5.5 0 100 11A5.5 5.5 0 009 2z" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M9 2c-1.5 0-2.5 2.5-2.5 5.5S7.5 13 9 13s2.5-2.5 2.5-5.5S10.5 2 9 2z" stroke="currentColor" strokeWidth="1.3" />
                  <line x1="3" y1="7.5" x2="15" y2="7.5" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              </button>
              <button className="flex h-10 w-10 items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <rect x="2" y="4" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
                  <path
                    d="M5 4V3a2 2 0 012-2h6a2 2 0 012 2v9a2 2 0 01-2 2h-1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>
            {/* Home indicator */}
            <div className="flex justify-center pt-1 pb-2">
              <div className="h-1 w-32 rounded-full" style={{ background: d ? 'rgba(255,255,255,0.25)' : 'rgba(0,0,0,0.2)' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const { websiteId } = useParams<{ websiteId: string }>();
  const { data } = useGetWebsite(websiteId!);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(true);

  const hydrate = useEditorStore((s) => s.hydrate);
  const draft = useEditorStore((s) => s.draft);
  const device = useEditorStore((s) => s.device);
  const setDevice = useEditorStore((s) => s.setDevice);

  useEffect(() => {
    if (data)
      hydrate({
        ...data,
        tweakcnThemeKey: 'Claude',
        isDarkMode: false,
        blocks: {
          hero: {
            firstTitle: 'Tu barbero,',
            secondTitle: 'Barbero Benimaclet',
            text: 'Cortes, degradados y barba en el corazón de Benimaclet. Atención personalizada, ambiente del barrio y reserva online en Booksy.',
            ctaText: 'Reservar cita',
            ctaLink: 'https://booksy.com/es-es/17924_barbero-benimaclet_barberia_58087_valencia',
            phone: '+34 622 73 02 33',
          },
        },
      });
  }, [data, hydrate]);

  const html = useMemo(() => (draft ? renderTemplate(draft) : ''), [draft]);

  function toggleCustomizer() {
    setIsCustomizerOpen(!isCustomizerOpen);
  }

  function exportHtml() {
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
      extra={
        <>
          <div className="flex shrink-0 justify-center py-3">
            <div className="bg-muted flex gap-1 rounded-lg p-1">
              <button
                onClick={() => setDevice('laptop')}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors ${device === 'laptop' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
                <Laptop className="h-4 w-4" />
                Laptop
              </button>
              <button
                onClick={() => setDevice('phone')}
                className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors ${device === 'phone' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
                <Smartphone className="h-4 w-4" />
                Phone
              </button>
            </div>
          </div>
          <Button variant="outline" size="icon" onClick={exportHtml} className="cursor-pointer">
            <Download className="h-[1.2rem] w-[1.2rem]" />
          </Button>
          <Button variant="outline" size="icon" onClick={toggleCustomizer} className="cursor-pointer">
            <Settings className="h-[1.2rem] w-[1.2rem]" />
          </Button>
        </>
      }>
      {draft && (
        <div className="flex h-full">
          <div className="w-full p-6">{device === 'laptop' ? <SafariFrame html={html} /> : <IPhoneFrame html={html} />}</div>

          <Customizer data={draft} open={isCustomizerOpen} onOpenChange={setIsCustomizerOpen} />
        </div>
      )}
    </BaseLayout>
  );
}
