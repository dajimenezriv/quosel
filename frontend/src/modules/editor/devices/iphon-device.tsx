import type { TemplateData } from '@quosel/core/templates';
import { ContentFrame } from './utils';

interface Props {
  domain: string;
  data: TemplateData;
}

export function IPhoneDevice({ domain, data }: Props) {
  return (
    <div className="flex h-full items-center justify-center">
      {/* Outer phone body */}
      <div
        className="relative flex flex-col overflow-hidden"
        style={{
          width: 390,
          height: 760,
          borderRadius: 50,
          background: '#f5f0eb',
          boxShadow: '0 0 0 1.5px #c8b89a, 0 0 0 3px #e8d8c0, 0 30px 80px rgba(0,0,0,0.25), inset 0 0 0 1px rgba(255,255,255,0.5)',
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
            background: '#c8b89a',
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
            background: '#c8b89a',
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
            background: '#c8b89a',
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
          <ContentFrame data={data} />

          {/* Safari bottom bar */}
          <div className="shrink-0" style={{ background: '#f2f2f7', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
            {/* Address bar */}
            <div
              className="flex cursor-pointer items-center px-4 py-2"
              onClick={() => window.open(data.domain, '_blank', 'noopener,noreferrer')}>
              <div
                className="flex flex-1 items-center justify-center gap-2 px-3 py-2"
                style={{
                  background: '#fff',
                  border: '1px solid rgba(0,0,0,0.12)',
                  borderRadius: 10,
                }}>
                <span className="flex-1 text-center text-[13px]" style={{ color: '#333' }}>
                  {domain}
                </span>
              </div>
            </div>
            {/* Nav row */}
            <div className="flex items-center justify-around px-2 pb-1" style={{ color: '#555' }}>
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
              <div className="h-1 w-32 rounded-full" style={{ background: 'rgba(0,0,0,0.2)' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
