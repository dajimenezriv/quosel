import { sidebarCollapsibleOptions } from './theme-customizer-constants';

export function LayoutTab() {
  return (
    <div className="space-y-6 p-4">
      {/* Sidebar Collapsible Mode */}
      <div className="space-y-3">
        <div className="grid grid-cols-1 gap-3">
          {sidebarCollapsibleOptions.map((option) => (
            <div
              key={option.value}
              className={`relative cursor-pointer rounded-md border p-4 transition-colors ${'border-border hover:border-border/60'}`}>
              <div className="space-y-2">
                <div className="text-center text-xs font-semibold">{option.name}</div>
                <div className="bg-background flex h-12 rounded border">
                  <div className="bg-background/50 border-muted-foreground/20 m-1 flex flex-1 items-center justify-start rounded-sm border border-dashed pl-2">
                    <div className="flex flex-col gap-0.5">
                      <div className="bg-foreground/60 h-0.5 w-3 rounded"></div>
                      <div className="bg-foreground/60 h-0.5 w-3 rounded"></div>
                      <div className="bg-foreground/60 h-0.5 w-3 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
