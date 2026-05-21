import { AdminTitle, StatCard } from "@/components/admin/AdminCards";
import { StaffShell } from "@/components/admin/StaffShell";

export default function LaporanPage() {
  return (
    <StaffShell>
      <AdminTitle title="Leads Report" body="Analisis sumber leads, performa unit, status follow up, dan ringkasan konversi." />
      <div className="mb-4 flex flex-col justify-between gap-3 rounded-panel border border-ink/10 bg-white p-4 shadow-soft md:flex-row">
        <div className="flex gap-3"><input className="field rounded-panel" type="date" /><input className="field rounded-panel" type="date" /></div>
        <button className="touch rounded-panel bg-ink px-5 py-3 text-sm font-black text-white">Export CSV</button>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Leads" value="128" />
        <StatCard label="WhatsApp Clicks" value="342" />
        <StatCard label="Test Drive Bookings" value="27" />
        <StatCard label="Credit Simulation Inquiries" value="41" />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {["Leads by Source", "Leads by Car", "Leads by Status", "Conversion Summary"].map((title, idx) => (
          <div key={title} className="rounded-panel border border-ink/10 bg-white p-6 shadow-soft">
            <h2 className="text-2xl font-black">{title}</h2>
            <div className="mt-6 grid gap-3">
              {["WhatsApp", "Test Drive", "Credit", "Trade-in"].map((label, i) => (
                <div key={label}>
                  <div className="flex justify-between text-sm font-bold"><span>{label}</span><span>{(idx + 2) * (i + 8)}</span></div>
                  <div className="mt-2 h-3 rounded-full bg-pearl"><div className="h-3 rounded-full bg-redbrand" style={{ width: `${45 + i * 12}%` }} /></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </StaffShell>
  );
}
