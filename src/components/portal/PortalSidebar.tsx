"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import {
  LayoutDashboard,
  LineChart,
  Briefcase,
  BadgeCheck,
  Building2,
  ShoppingBag,
  LifeBuoy,
  FileText,
  LogOut,
} from "lucide-react";
import { setRole, logout } from "@/app/actions/auth";
import type { Role } from "@/lib/auth/demo-session";

const NAV = [
  { href: "/portal", label: "Dashboard", icon: LayoutDashboard },
  { href: "/portal/intelligence", label: "PQT Intelligence", icon: LineChart },
  { href: "/portal/portfolio", label: "Portfolio", icon: Briefcase },
  { href: "/portal/citizenship", label: "Citizenship", icon: BadgeCheck },
  { href: "/portal/projects", label: "Browse projects", icon: Building2 },
  { href: "/portal/purchases", label: "My purchases", icon: ShoppingBag },
  { href: "/portal/aftersales", label: "Aftersales", icon: LifeBuoy },
  { href: "/portal/documents", label: "Documents", icon: FileText },
];

export function PortalSidebar({
  name,
  role,
  canAgent,
}: {
  name: string;
  role: Role;
  canAgent: boolean;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function switchRole(r: Role) {
    startTransition(async () => {
      await setRole(r);
      router.refresh();
    });
  }

  const isActive = (href: string) =>
    href === "/portal" ? pathname === "/portal" : pathname.startsWith(href);

  const roleToggle = canAgent && (
    <div className="flex rounded-lg bg-white/10 p-0.5 text-xs">
      {(["client", "agent"] as Role[]).map((r) => (
        <button
          key={r}
          disabled={pending}
          onClick={() => switchRole(r)}
          className={`flex-1 rounded-md px-2 py-1.5 font-semibold capitalize transition ${
            role === r ? "bg-gold text-ink" : "text-white/70"
          }`}
        >
          {r}
        </button>
      ))}
    </div>
  );

  return (
    <>
      {/* ===== Mobile: compact bar + horizontal pill nav ===== */}
      <div className="lg:hidden">
        <div className="flex items-center gap-3 rounded-xl bg-navy p-3.5 text-white">
          <div className="min-w-0 flex-1">
            <p className="text-[11px] text-white/60">Signed in as</p>
            <p className="truncate text-sm font-semibold">{name}</p>
          </div>
          {roleToggle && <div className="w-36 shrink-0">{roleToggle}</div>}
          <form action={logout}>
            <button
              type="submit"
              aria-label="Log out"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white/80 transition hover:bg-white/20"
            >
              <LogOut size={16} />
            </button>
          </form>
        </div>

        <nav
          aria-label="Portal sections"
          className="-mx-5 mt-3 flex gap-2 overflow-x-auto px-5 pb-1"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition ${
                isActive(item.href)
                  ? "bg-navy text-white"
                  : "border border-line bg-white text-ink/70"
              }`}
            >
              <item.icon size={14} /> {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* ===== Desktop: full vertical sidebar ===== */}
      <aside className="hidden w-full flex-col gap-1 lg:flex lg:h-full">
        <div className="mb-4 rounded-xl bg-navy p-4 text-white">
          <p className="text-xs text-white/60">Signed in as</p>
          <p className="truncate font-semibold">{name}</p>
          {roleToggle && <div className="mt-3">{roleToggle}</div>}
        </div>

        <nav className="flex flex-col gap-0.5" aria-label="Portal sections">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                isActive(item.href)
                  ? "bg-gold-soft text-navy"
                  : "text-ink/70 hover:bg-canvas hover:text-navy"
              }`}
            >
              <item.icon size={18} /> {item.label}
            </Link>
          ))}
        </nav>

        <form action={logout} className="mt-4">
          <button
            type="submit"
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red hover:bg-red/5"
          >
            <LogOut size={18} /> Log out
          </button>
        </form>
      </aside>
    </>
  );
}
