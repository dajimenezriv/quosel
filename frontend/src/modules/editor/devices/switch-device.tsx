import { useEditorStore, type Device } from '@/core/editor/use-editor-store';
import { Laptop, Smartphone } from 'lucide-react';

interface Props {
  device: Device;
}

export function DeviceSwitcher({ device }: Props) {
  const setDevice = useEditorStore((s) => s.setDevice);

  return (
    <div className="flex">
      <div className="bg-muted text-muted-foreground flex rounded-lg p-1">
        <button
          onClick={() => setDevice('laptop')}
          className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm ${device === 'laptop' ? 'bg-background text-foreground' : 'cursor-pointer'}`}>
          <Laptop className="h-4 w-4" />
          Laptop
        </button>
        <button
          onClick={() => setDevice('phone')}
          className={`flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm ${device === 'phone' ? 'bg-background text-foreground' : 'cursor-pointer'}`}>
          <Smartphone className="h-4 w-4" />
          Phone
        </button>
      </div>
    </div>
  );
}
