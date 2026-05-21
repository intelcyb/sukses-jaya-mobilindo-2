import { AdminTitle } from "@/components/admin/AdminCards";
import { StaffShell } from "@/components/admin/StaffShell";
import { cars } from "@/lib/cars";

export default function AiToolsPage() {
  return (
    <StaffShell>
      <AdminTitle title="AI Caption & Description Tools" body="UI generator mock untuk deskripsi mobil, caption Instagram, broadcast WhatsApp, dan SEO meta." />
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-panel border border-ink/10 bg-white p-6 shadow-soft">
          <div className="grid gap-3">
            <select className="field rounded-panel">{cars.map((car) => <option key={car.id}>{car.name} {car.year}</option>)}</select>
            <textarea className="field min-h-32 rounded-panel" placeholder="Input key specs" defaultValue="Kilometer rendah, interior bersih, pajak hidup, siap pakai." />
            <select className="field rounded-panel"><option>Premium</option><option>Friendly</option><option>Sales-focused</option><option>Short</option><option>Detailed</option></select>
            <div className="grid gap-2 sm:grid-cols-2">
              {["Car description", "Instagram caption", "WhatsApp broadcast text", "SEO meta description"].map((item) => <button key={item} className="touch rounded-panel bg-ink px-4 py-3 text-sm font-bold text-white">Generate {item}</button>)}
            </div>
          </div>
        </div>
        <div className="rounded-panel border border-ink/10 bg-white p-6 shadow-soft">
          <h2 className="text-2xl font-black">Output Preview</h2>
          <div className="mt-5 rounded-panel bg-pearl p-5 leading-7 text-coal/74">
            Toyota Fortuner VRZ 2021 ini hadir untuk Anda yang mencari SUV diesel premium dengan tampilan gagah, kabin nyaman, dan performa tangguh. Unit siap dicek di Sukses Jaya Mobilindo 2 Pekanbaru. Konsultasikan opsi cash, kredit, atau tukar tambah bersama tim kami.
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <button className="touch rounded-panel border border-ink/10 px-5 py-3 font-bold">Copy</button>
            <button className="touch rounded-panel bg-redbrand px-5 py-3 font-bold text-white">Apply to car description</button>
          </div>
        </div>
      </div>
    </StaffShell>
  );
}
