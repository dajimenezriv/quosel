import { Input } from '@/components/ui/input';
import { sidebarCollapsibleOptions } from './theme-customizer-constants';

export function LayoutTab() {
  return (
    <div className="space-y-6 p-4">
      {/* Sidebar Collapsible Mode */}
      <div className="space-y-3">
        <div className="grid grid-cols-1 gap-3">
          <div className={`relative cursor-pointer rounded-md border p-4 transition-colors ${'border-border hover:border-border/60'}`}>
            <div className="space-y-2">
              <div className="text-center text-xs font-semibold">Hero</div>
              <Input value="Tu barbero," />
              <Input value="Barbero Benimaclet." />
              <Input value="Cortes, degradados y barba en el corazón de Benimaclet. Atención personalizada, ambiente del barrio y reserva online en Booksy." />
              <Input value="Reservar cita" />
              <Input value="https://booksy.com/es-es/17924_barbero-benimaclet_barberia_58087_valencia" />
              <Input value="+34 622 73 02 33" />
            </div>
          </div>
          {sidebarCollapsibleOptions.map((option) => (
            <div
              key={option.value}
              className={`relative cursor-pointer rounded-md border p-4 transition-colors ${'border-border hover:border-border/60'}`}>
              <div className="space-y-2">
                <div className="text-center text-xs font-semibold">{option.name}</div>
                <div className="bg-background flex h-12 rounded border"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
