import Link from "next/link";
import { AdminTitle } from "@/components/admin/AdminCards";
import { StaffShell } from "@/components/admin/StaffShell";
import { StatusBadge } from "@/components/CarCard";
import { cars } from "@/lib/cars";
import { formatKm, formatRupiah } from "@/lib/showroom";

export default function StaffMobilPage() {
  return (
    <StaffShell>
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <AdminTitle title="Vehicle Inventory CMS" body="Kelola unit, status, featured, gambar, dan preview halaman publik." />
        <Link href="/staff/mobil/tambah" className="touch rounded-panel bg-redbrand px-5 py-3 text-sm font-black text-white">Add Car</Link>
      </div>
      <div className="mb-4 grid gap-3 rounded-panel border border-ink/10 bg-white p-4 shadow-soft md:grid-cols-5">
        <input className="field rounded-panel md:col-span-2" placeholder="Search inventory" />
        <select className="field rounded-panel"><option>Status</option><option>Available</option><option>Booked</option><option>Sold</option></select>
        <select className="field rounded-panel"><option>Brand</option><option>Toyota</option><option>Honda</option></select>
        <select className="field rounded-panel"><option>Category</option><option>SUV</option><option>MPV</option></select>
      </div>
      <div className="overflow-hidden rounded-panel border border-ink/10 bg-white shadow-soft">
        <div className="grid min-w-[980px] grid-cols-[1.5fr_0.8fr_0.7fr_0.7fr_1fr_1.4fr] gap-4 border-b border-ink/10 p-4 text-xs font-black uppercase tracking-[0.12em] text-coal/48">
          <span>Unit</span><span>Harga</span><span>KM</span><span>Status</span><span>Bulk/Featured</span><span>Actions</span>
        </div>
        {cars.map((car) => (
          <div key={car.id} className="grid min-w-[980px] grid-cols-[1.5fr_0.8fr_0.7fr_0.7fr_1fr_1.4fr] items-center gap-4 border-b border-ink/10 p-4 text-sm">
            <div><b>{car.name}</b><p className="text-coal/52">{car.brand} {car.model} {car.year}</p></div>
            <b>{formatRupiah(car.price)}</b>
            <span>{formatKm(car.mileage)}</span>
            <StatusBadge status={car.status} />
            <label className="flex gap-2 font-bold"><input type="checkbox" defaultChecked={car.isFeatured} /> Mark as featured</label>
            <div className="flex flex-wrap gap-2">
              <Link href="/staff/mobil/edit" className="rounded-panel border border-ink/10 px-3 py-2 font-bold">Edit</Link>
              <button className="rounded-panel border border-redbrand/30 px-3 py-2 font-bold text-redbrand">Delete</button>
              <Link href={`/mobil/${car.slug}`} className="rounded-panel bg-ink px-3 py-2 font-bold text-white">Preview</Link>
            </div>
          </div>
        ))}
      </div>
    </StaffShell>
  );
}
