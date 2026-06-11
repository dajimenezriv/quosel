import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import { useState, type ReactNode } from 'react';

export function Section({ title, icon, children }: { title: string; icon: ReactNode; children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <button onClick={() => setOpen((o) => !o)} className="flex cursor-pointer items-center gap-2 py-2">
        <span className="text-muted-foreground">{icon}</span>
        <span className="text-sm font-semibold">{title}</span>
        <ChevronRight className={cn('text-muted-foreground ml-auto h-4 w-4 transition-transform', open && 'rotate-90')} />
      </button>
      {open && children}
    </div>
  );
}

export function Subgroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="bg-muted/40 flex flex-col gap-3 rounded-md p-3">
      <span className="text-muted-foreground text-[11px] font-medium tracking-wide uppercase">{title}</span>
      {children}
    </div>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label className="text-muted-foreground text-xs">{label}</Label>
      {children}
    </div>
  );
}
