import Link from "next/link";
import { BarChart3, Bot, Car, LayoutDashboard, LogOut, Settings, UserCog, Users } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";

const nav = [
  ["Dashboard", "/staff/dashboard", LayoutDashboard],
  ["Mobil", "/staff/mobil", Car],
  ["Leads", "/staff/leads", Users],
  ["Laporan", "/staff/laporan", BarChart3],
  ["Admin Users", "/staff/admin-users", UserCog],
  ["AI Tools", "/staff/ai-tools", Bot],
  ["Settings", "/staff/settings", Settings]
];

export function StaffShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f2f1ee] text-ink">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-ink/10 bg-white p-5 lg:block">
        <BrandLogo />
        <nav className="mt-8 grid gap-1">
          {nav.map(([label, href, Icon]) => (
            <Link key={String(href)} href={String(href)} className="flex min-h-11 items-center gap-3 rounded-panel px-3 text-sm font-bold text-coal/72 transition hover:bg-pearl hover:text-redbrand">
              <Icon size={18} /> {String(label)}
            </Link>
          ))}
        </nav>
        <Link href="/staff/login" className="absolute bottom-5 left-5 right-5 flex min-h-11 items-center gap-3 rounded-panel border border-ink/10 px-3 text-sm font-bold text-coal/62">
          <LogOut size={18} /> Keluar
        </Link>
      </aside>
      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-ink/10 bg-white/88 px-4 py-4 backdrop-blur lg:px-8">
          <div className="flex items-center justify-between">
            <div className="lg:hidden"><BrandLogo compact /></div>
            <div><p className="text-xs font-black uppercase tracking-[0.16em] text-redbrand">Hidden Staff Area</p><p className="text-sm text-coal/58">Mock data, siap untuk Supabase nanti</p></div>
          </div>
        </header>
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
