import { AdminTitle } from "@/components/admin/AdminCards";
import { StaffShell } from "@/components/admin/StaffShell";
import { showroom } from "@/lib/showroom";

const fields = [
  ["Showroom name", showroom.name],
  ["Logo", "/logo.svg"],
  ["WhatsApp number", showroom.phone],
  ["Address", showroom.address],
  ["Opening hours", showroom.openInfo],
  ["Google Maps embed", showroom.mapsEmbed],
  ["Homepage headline", "Showroom Mobil Berkualitas di Pekanbaru"],
  ["Homepage subheadline", "Temukan mobil baru dan bekas berkualitas dengan pilihan cash, kredit, tukar tambah, dan konsultasi langsung bersama tim Sukses Jaya Mobilindo 2."],
  ["Social media links", "Instagram, TikTok, Facebook"],
  ["SEO title", "Sukses Jaya Mobilindo 2 | Showroom Mobil Pekanbaru"],
  ["SEO description", "Showroom mobil baru dan bekas berkualitas di Pekanbaru."]
];

export default function SettingsPage() {
  return (
    <StaffShell>
      <AdminTitle title="Showroom Settings" body="UI pengaturan bisnis, brand, homepage, maps, social media, dan SEO." />
      <div className="rounded-panel border border-ink/10 bg-white p-6 shadow-soft">
        <div className="grid gap-4 md:grid-cols-2">
          {fields.map(([label, value]) => (
            <label key={label} className="font-bold">
              {label}
              <input className="field mt-2 rounded-panel font-normal" defaultValue={value} />
            </label>
          ))}
        </div>
        <button className="touch mt-6 rounded-panel bg-redbrand px-5 py-3 font-black text-white">Save Settings</button>
      </div>
    </StaffShell>
  );
}
