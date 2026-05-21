import { Search } from "lucide-react";
import { brands, bodyTypes } from "@/lib/cars";
import { Button } from "@/components/Button";

export function QuickSearch() {
  return (
    <section className="container-pad -mt-10 relative z-20">
      <div className="panel rounded-panel p-4 md:p-6">
        <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-7">
          <input className="field rounded-panel lg:col-span-2" placeholder="Cari Fortuner, Brio, Alphard..." />
          <select className="field rounded-panel" defaultValue=""><option value="">Brand</option>{brands.map((b) => <option key={b}>{b}</option>)}</select>
          <select className="field rounded-panel" defaultValue=""><option value="">Kategori</option>{bodyTypes.map((b) => <option key={b}>{b}</option>)}</select>
          <select className="field rounded-panel" defaultValue=""><option value="">Harga</option><option>&lt; Rp 250 Juta</option><option>Rp 250-500 Juta</option><option>&gt; Rp 500 Juta</option></select>
          <select className="field rounded-panel" defaultValue=""><option value="">Tahun</option><option>2022+</option><option>2020+</option><option>2019+</option></select>
          <select className="field rounded-panel" defaultValue=""><option value="">Transmisi</option><option>AT</option><option>CVT</option><option>MT</option></select>
        </div>
        <div className="mt-4 flex justify-end">
          <Button href="/katalog" className="w-full md:w-auto"><Search size={17} className="mr-2" /> Cari Mobil</Button>
        </div>
      </div>
    </section>
  );
}
