import { Link } from "react-router-dom";
import logoImg from "../../assets/logo.png";
import {
  Search,
  Home,
  Landmark,
  Clock,
  Building2,
  ShieldCheck,
  Users,
  Wand2,
  FileText,
  ChevronDown,
  ChevronUp,
  LayoutGrid,
  CreditCard,
  Send,
  CheckSquare,
  Receipt,
  BarChart3,
  X,
} from "lucide-react";

const topItems = [
  { label: "Dashboard", icon: Home, chevron: false },
  { label: "Finance", icon: Landmark, chevron: true },
  { label: "Sales CRM", icon: Clock, chevron: true },
];

const rmsSub = [
  { label: "Dashboard", icon: LayoutGrid, path: "/" },
  { label: "Loans", icon: CreditCard, path: "/" },
  { label: "Disbursement", icon: Send, path: "/disbursement" },
  { label: "Onboard Customer", icon: Users, path: "/task2/onboarding" },
  { label: "Invoices", icon: CheckSquare, path: "#" },
  { label: "Bills", icon: Receipt, path: "#" },
  { label: "RMS Reports", icon: BarChart3, path: "#" },
];

const bottomItems = [
  { label: "Compliance", icon: ShieldCheck, chevron: true },
  { label: "Vendors", icon: Users, chevron: true },
  { label: "AI Suite", icon: Wand2, chevron: true },
  { label: "Reports", icon: FileText, chevron: true },
];

export function Sidebar({ onClose, active = "Loans" }) {
  return (
    <aside className="flex h-full w-[264px] shrink-0 flex-col bg-gradient-to-b from-sb-top via-sb-mid to-sb-bottom text-white/90">
      {/* Logo */}
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <img src={logoImg} alt="FinBowl Logo" className="h-30 w-30 object-contain" />
        </div>
        {onClose && (
          <button onClick={onClose} className="lg:hidden" aria-label="Close menu">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-6">
        {/* Search */}
        <div className="relative mb-4">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/60" />
          <input
            placeholder="Search"
            className="h-10 w-full rounded-lg bg-white/10 pl-9 pr-3 text-sm text-white placeholder:text-white/60 outline-none focus:bg-white/15"
          />
        </div>

        <nav className="space-y-1">
          {topItems.map((it) => (
            <NavRow key={it.label} icon={it.icon} label={it.label} chevron={it.chevron} />
          ))}

          {/* RMS expanded */}
          <div className="rounded-lg">
            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white">
              <Building2 className="h-[18px] w-[18px]" />
              <span className="flex-1 text-left">RMS</span>
              <ChevronUp className="h-4 w-4 text-white/70" />
            </button>
            <div className="mt-1 space-y-1 pl-4">
              {rmsSub.map((s) => {
                const isLink = s.path !== "#";
                const className = `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm ${s.label === active
                  ? "bg-white/15 font-semibold text-white"
                  : "font-medium text-white/80 hover:bg-white/10"
                  }`;

                if (isLink) {
                  return (
                    <Link
                      key={s.label}
                      to={s.path}
                      onClick={onClose}
                      className={className}
                    >
                      <s.icon className="h-[18px] w-[18px]" />
                      {s.label}
                    </Link>
                  );
                }

                return (
                  <a
                    key={s.label}
                    href="#"
                    className={className}
                  >
                    <s.icon className="h-[18px] w-[18px]" />
                    {s.label}
                  </a>
                );
              })}
            </div>
          </div>

          {bottomItems.map((it) => (
            <NavRow key={it.label} icon={it.icon} label={it.label} chevron={it.chevron} />
          ))}
        </nav>
      </div>
      <div className="px-6 pb-5">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/80">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Version 1.0
        </span>
      </div>
    </aside>
  );
}

function NavRow({
  icon: Icon,
  label,
  chevron,
}) {
  return (
    <a
      href="#"
      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/85 hover:bg-white/10"
    >
      <Icon className="h-[18px] w-[18px]" />
      <span className="flex-1">{label}</span>
      {chevron && <ChevronDown className="h-4 w-4 text-white/60" />}
    </a>
  );
}
