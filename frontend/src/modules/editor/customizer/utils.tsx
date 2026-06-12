import { Label } from '@/components/ui/label';
import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { useState, type ReactNode } from 'react';

export function Section({
  title,
  icon,
  onMoveUp,
  onMoveDown,
  onRemove,
  children,
}: {
  title: string;
  icon: ReactNode;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onRemove?: () => void;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <button onClick={() => setOpen((o) => !o)} className="flex flex-1 cursor-pointer items-center gap-2 py-2">
          <span className="text-muted-foreground">{icon}</span>
          <span className="text-sm font-semibold">{title}</span>
        </button>
        <button
          onClick={onMoveUp}
          disabled={!onMoveUp}
          className="text-muted-foreground hover:text-foreground cursor-pointer disabled:invisible">
          <ChevronUp className="h-4 w-4" />
        </button>
        <button
          onClick={onMoveDown}
          disabled={!onMoveDown}
          className="text-muted-foreground hover:text-foreground cursor-pointer disabled:invisible">
          <ChevronDown className="h-4 w-4" />
        </button>
        {onRemove && (
          <button onClick={onRemove} className="text-muted-foreground hover:text-destructive cursor-pointer">
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>
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
