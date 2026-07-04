import { Bell, ChevronDown, Menu, Building2 } from "lucide-react";

export function Topbar({ onMenu, secondCompany }) {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-field-border bg-white px-4 sm:px-6">
      <button onClick={onMenu} className="lg:hidden" aria-label="Open menu">
        <Menu className="h-6 w-6 text-heading" />
      </button>

      <button className="flex items-center gap-2 rounded-lg border border-field-border bg-white px-3 py-2 text-sm font-semibold text-heading shadow-sm">
        <Building2 className="h-4 w-4 text-subtle" />
        <span className="hidden sm:inline">Gracia Advisory Group</span>
        <span className="sm:hidden">Gracia</span>
        <ChevronDown className="h-4 w-4 text-subtle" />
      </button>

      {secondCompany && (
        <button className="hidden items-center gap-2 rounded-lg border border-field-border bg-white px-3 py-2 text-sm font-semibold text-heading shadow-sm md:flex">
          <Building2 className="h-4 w-4 text-subtle" />
          ABC Advisory Group
          <ChevronDown className="h-4 w-4 text-subtle" />
        </button>
      )}

      <div className="ml-auto flex items-center gap-4">
        <button className="relative" aria-label="Notifications">
          <Bell className="h-5 w-5 text-subtle" />
          <span className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-req text-[10px] font-semibold text-white">
            2
          </span>
        </button>
        <img
          src="https://i.pravatar.cc/80?img=12"
          alt="Account"
          className="h-9 w-9 rounded-full object-cover"
        />
      </div>
    </header>
  );
}
