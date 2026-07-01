import type { TemplateData } from '@quosel/core/templates';
import { ContentFrame } from './utils';

interface Props {
  domain: string;
  data: TemplateData;
}

function Favicon({ logoUrl }: { logoUrl: string }) {
  if (logoUrl) {
    return <img src={logoUrl} alt="" className="h-4 w-4 shrink-0 rounded-[3px] object-cover" />;
  }
  return <div className="h-4 w-4 shrink-0 rounded-[3px]" style={{ background: '#d0d0d0' }} />;
}

export function SafariDevice({ domain, data }: Props) {
  return (
    <div
      className="flex h-full w-full flex-col overflow-hidden rounded-xl shadow-2xl"
      style={{ border: '1px solid rgba(0,0,0,0.12)' }}>
      {/* Toolbar */}
      <div className="flex shrink-0 items-center gap-2 px-4" style={{ background: '#f5f5f5', height: 52 }}>
        {/* Traffic lights */}
        <div className="flex shrink-0 items-center gap-1.5">
          <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <div className="h-3 w-3 rounded-full bg-[#ffbc2e]" />
          <div className="h-3 w-3 rounded-full bg-[#28c841]" />
        </div>

        {/* Sidebar toggle */}
        <div className="ml-1 shrink-0" style={{ color: '#aaa' }}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect x="1.5" y="2.5" width="15" height="13" rx="2" stroke="currentColor" strokeWidth="1.3" />
            <line x1="6" y1="2.5" x2="6" y2="15.5" stroke="currentColor" strokeWidth="1.3" />
          </svg>
        </div>

        {/* Nav arrows */}
        <div className="flex shrink-0 items-center gap-0.5" style={{ color: '#aaa' }}>
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
              background: '#ffffff',
              border: '1px solid rgba(0,0,0,0.15)',
              borderRadius: 8,
              boxShadow: '0 1px 2px rgba(0,0,0,0.06)',
            }}>
            <span className="flex-1 text-center text-[12px] select-none" style={{ color: '#444', letterSpacing: 0.1 }}>
              {domain}
            </span>
          </div>
        </div>
      </div>

      {/* Tab bar */}
      <div
        className="flex shrink-0 items-stretch"
        style={{
          background: '#ebebeb',
          borderTop: '1px solid rgba(0,0,0,0.08)',
          height: 34,
        }}>
        {/* Active tab */}
        <div
          className="flex items-center gap-1.5 px-5"
          style={{
            background: '#f5f5f5',
            borderRight: '1px solid rgba(0,0,0,0.1)',
          }}>
          {/* favicon */}
          <Favicon logoUrl={data.blocks.logoUrl} />
          <span className="text-[12px] select-none" style={{ color: '#333' }}>
            Preview
          </span>
          <button
            className="ml-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px]"
            style={{ color: '#aaa' }}>
            ✕
          </button>
        </div>
      </div>

      <ContentFrame data={data} />
    </div>
  );
}
