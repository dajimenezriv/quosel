import { useGetWebsite } from '@/api/websites/use-get-website';
import { BaseLayout } from '@/components/layouts/base-layout';
import { useThemeStore } from '@/core/theme/use-theme-store';
import { renderTemplate } from '@quosel/templates';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

function SafariFrame({ html }: { html: string }) {
  const { isDarkMode } = useThemeStore();

  const d = isDarkMode;

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

export default function Page() {
  const { websiteId } = useParams<{ websiteId: string }>();
  const { data } = useGetWebsite(websiteId!);

  const html = useMemo(() => (data ? renderTemplate(data) : ''), [data]);

  return (
    <BaseLayout title="Editor">
      {data && (
        <div className="h-full">
          <SafariFrame html={html} />
        </div>
      )}
    </BaseLayout>
  );
}
