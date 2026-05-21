import { AdminTitle, StatCard } from "@/components/admin/AdminCards";
import { StaffShell } from "@/components/admin/StaffShell";
import { leads } from "@/lib/admin";
import { cars } from "@/lib/cars";

export default function DashboardPage() {
  const available = cars.filter((c) => c.status === "Available").length;
  const booked = cars.filter((c) => c.status === "Booked").length;
  const sold = cars.filter((c) => c.status === "Sold").length;
  const featured = cars.filter((c) => c.isFeatured).length;
  return (
    <StaffShell>
      <AdminTitle title="Dashboard Showroom" body="Ringkasan inventori, leads, klik WhatsApp, booking test drive, dan performa harian." />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Cars" value={String(cars.length)} />
        <StatCard label="Available Cars" value={String(available)} />
        <StatCard label="Booked Cars" value={String(booked)} />
        <StatCard label="Sold Cars" value={String(sold)} />
        <StatCard label="Featured Cars" value={String(featured)} />
        <StatCard label="Total Leads" value="128" note="+18 minggu ini" />
        <StatCard label="WhatsApp Clicks" value="342" />
        <StatCard label="Test Drive Bookings" value="27" />
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <div className="rounded-panel border border-ink/10 bg-white p-6 shadow-soft">
          <h2 className="text-2xl font-black">Leads Growth</h2>
          <div className="mt-6 flex h-64 items-end gap-3">
            {[34, 48, 41, 66, 78, 92, 128].map((n) => <div key={n} className="flex-1 rounded-t-panel bg-redbrand/85" style={{ height: `${n}%` }} />)}
          </div>
        </div>
        <div className="rounded-panel border border-ink/10 bg-white p-6 shadow-soft">
          <h2 className="text-2xl font-black">Recent Inquiries</h2>
          <div className="mt-4 grid gap-3">
            {leads.map((lead) => <div key={lead.phone} className="rounded-panel bg-pearl p-4"><b>{lead.name}</b><p className="text-sm text-coal/58">{lead.car} - {lead.source}</p></div>)}
          </div>
        </div>
      </div>
      <div className="mt-6 grid gap-3 sm:grid-cols-4">
        {["Add Car", "View Leads", "Generate AI Description", "Report Leads"].map((action) => <button key={action} className="touch rounded-panel bg-ink px-4 py-3 font-bold text-white">{action}</button>)}
      </div>
    </StaffShell>
  );
}
