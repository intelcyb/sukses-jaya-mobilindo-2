import { AdminTitle } from "@/components/admin/AdminCards";
import { StaffShell } from "@/components/admin/StaffShell";
import { leads } from "@/lib/admin";
import { waLink } from "@/lib/showroom";

export default function LeadsPage() {
  return (
    <StaffShell>
      <AdminTitle title="Leads Management" body="Kelola inquiry WhatsApp, booking test drive, simulasi kredit, tukar tambah, dan form kontak." />
      <div className="mb-4 grid gap-3 rounded-panel border border-ink/10 bg-white p-4 shadow-soft md:grid-cols-4">
        <input className="field rounded-panel" placeholder="Search lead" />
        <select className="field rounded-panel"><option>Lead source</option><option>WhatsApp inquiry</option><option>Test drive booking</option><option>Credit simulation inquiry</option><option>Trade-in inquiry</option><option>Contact form</option></select>
        <select className="field rounded-panel"><option>Status</option><option>New</option><option>Contacted</option><option>Follow Up</option><option>Closed</option></select>
        <select className="field rounded-panel"><option>Assign to</option><option>Owner</option><option>Rina</option><option>Doni</option></select>
      </div>
      <div className="grid gap-4">
        {leads.length ? leads.map((lead) => (
          <article key={lead.phone} className="rounded-panel border border-ink/10 bg-white p-5 shadow-soft">
            <div className="grid gap-4 lg:grid-cols-[1.1fr_1fr_0.8fr_0.8fr]">
              <div><h2 className="text-xl font-black">{lead.name}</h2><p className="text-sm text-coal/58">{lead.phone}</p><p className="mt-2 font-bold">{lead.car}</p></div>
              <div><p className="text-xs font-bold uppercase text-coal/45">Message</p><p className="mt-1 text-sm leading-6">{lead.message}</p></div>
              <div><p className="font-bold">{lead.source}</p><p className="text-sm text-coal/58">{lead.date}</p><select className="field mt-2 rounded-panel"><option>{lead.status}</option><option>New</option><option>Contacted</option><option>Follow Up</option><option>Closed</option></select></div>
              <div><select className="field rounded-panel"><option>{lead.assignee}</option><option>Owner</option><option>Rina</option><option>Doni</option></select><textarea className="field mt-2 min-h-20 rounded-panel" defaultValue={lead.notes} /><a href={waLink(`Halo ${lead.name}, kami dari Sukses Jaya Mobilindo 2 ingin follow up inquiry ${lead.car}.`)} className="mt-2 inline-flex touch w-full items-center justify-center rounded-panel bg-redbrand px-4 text-sm font-bold text-white">WhatsApp</a></div>
            </div>
          </article>
        )) : <div className="rounded-panel border border-dashed border-ink/20 bg-white p-10 text-center">Belum ada leads.</div>}
      </div>
    </StaffShell>
  );
}
