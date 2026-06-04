import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

export function CustomizerTrigger({ onClick }: { onClick: () => void }) {
  return (
    <Button
      onClick={onClick}
      size="icon"
      className="bg-primary hover:bg-primary/90 text-primary-foreground fixed top-1/2 right-4 z-50 h-12 w-12 -translate-y-1/2 cursor-pointer rounded-full shadow-lg">
      <Settings className="h-5 w-5" />
    </Button>
  );
}
