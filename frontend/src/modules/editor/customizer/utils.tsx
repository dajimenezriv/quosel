import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { createContext, useContext, useState, type ReactNode } from 'react';

// Controls whether sections can be moved or removed. Disabled for non-logged-in users.
const SectionControlsContext = createContext(true);
export const SectionControlsProvider = SectionControlsContext.Provider;

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
  const showControls = useContext(SectionControlsContext);
  const [open, setOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <button onClick={() => setOpen((o) => !o)} className="flex flex-1 cursor-pointer items-center gap-2 py-2">
          <span className="text-muted-foreground">{icon}</span>
          <span className="text-sm font-semibold">{title}</span>
        </button>
        {showControls && (
          <>
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
              <>
                <button onClick={() => setConfirmOpen(true)} className="text-muted-foreground hover:text-destructive cursor-pointer">
                  <Trash2 className="h-4 w-4" />
                </button>
                <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Remove section</DialogTitle>
                      <DialogDescription>This will remove the "{title}" section from your website.</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button variant="destructive" onClick={onRemove}>
                        Remove
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </>
        )}
      </div>
      {open && children}
    </div>
  );
}

export function Subgroup({ title, onRemove, children }: { title: string; onRemove?: () => void; children: ReactNode }) {
  return (
    <div className="bg-muted/40 flex flex-col gap-3 rounded-md p-3">
      <div className="flex items-center justify-between">
        <span className="text-muted-foreground text-[11px] font-medium tracking-wide uppercase">{title}</span>
        {onRemove && (
          <button onClick={onRemove} className="text-muted-foreground hover:text-destructive cursor-pointer">
            <Trash2 className="h-4 w-4" />
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

export function Field({ label, action, children }: { label: string; action?: ReactNode; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <Label className="text-muted-foreground text-xs">{label}</Label>
        {action}
      </div>
      {children}
    </div>
  );
}
