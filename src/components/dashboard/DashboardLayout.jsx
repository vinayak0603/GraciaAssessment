import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function DashboardLayout({
  children,
  active = "Loans",
  secondCompany = false,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-page">
      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <Sidebar active={active} />
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-0 h-full z-50">
            <Sidebar active={active} onClose={() => setOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onMenu={() => setOpen(true)} secondCompany={secondCompany} />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
