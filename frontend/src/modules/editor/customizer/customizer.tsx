import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface Props {
  open: boolean;
  children: ReactNode;
}

export function Customizer({ open, children }: Props) {
  return (
    <div className={cn('shrink-0 overflow-hidden', open ? 'w-120' : 'w-0')}>
      <div className="flex h-full w-120 flex-col border-l">{children}</div>
    </div>
  );
}
