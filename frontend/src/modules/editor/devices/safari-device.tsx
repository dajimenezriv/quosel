import { useThemeStore } from '@/core/theme/use-theme-store';
import type { TemplateData } from '@quosel/core/templates';
import { ContentFrame } from './utils';

interface Props {
  domain: string;
  data: TemplateData;
}

function Favicon({ logoUrl, dark }: { logoUrl: string; dark: boolean }) {
  if (logoUrl) {
    return <img src={logoUrl} alt="" className="h-4 w-4 shrink-0 rounded-[3px] object-cover" />;
  }
  return <div className="h-4 w-4 shrink-0 rounded-[3px]" style={{ background: dark ? '#4a4a4a' : '#d0d0d0' }} />;
}

export function SafariDevice({ domain, data }: Props) {
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
        <div
          className="flex min-w-0 flex-1 cursor-pointer items-center justify-center px-2"
          onClick={() => window.open(domain, '_blank', 'noopener,noreferrer')}>
          <div
            className="flex w-full items-center gap-2 px-3 py-1.25"
            style={{
              background: d ? '#1e1e1e' : '#ffffff',
              border: `1px solid ${d ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.15)'}`,
              borderRadius: 8,
              boxShadow: d ? 'none' : '0 1px 2px rgba(0,0,0,0.06)',
            }}>
            <span className="flex-1 text-center text-[12px] select-none" style={{ color: d ? '#aaa' : '#444', letterSpacing: 0.1 }}>
              {domain}
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
          {/* favicon */}
          <Favicon logoUrl={data.blocks.logoUrl} dark={d} />
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

      <ContentFrame data={data} />
    </div>
  );
}
