"use client";

import { useMemo, useState } from "react";
import { SlidersHorizontal, RotateCcw } from "lucide-react";
import { CarCard } from "@/components/CarCard";
import { brands, bodyTypes, cars } from "@/lib/cars";

export function CatalogClient() {
  const [query, setQuery] = useState("");
  const [brand, setBrand] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [status, setStatus] = useState("");
  const [transmission, setTransmission] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [featured, setFeatured] = useState(false);
  const [sort, setSort] = useState("newest");

  const filtered = useMemo(() => {
    return cars
      .filter((car) => [car.name, car.brand, car.model, car.variant].join(" ").toLowerCase().includes(query.toLowerCase()))
      .filter((car) => !brand || car.brand === brand)
      .filter((car) => !bodyType || car.bodyType === bodyType)
      .filter((car) => !status || car.status === status)
      .filter((car) => !transmission || car.transmission === transmission)
      .filter((car) => !fuelType || car.fuelType === fuelType)
      .filter((car) => !featured || car.isFeatured)
      .sort((a, b) => {
        if (sort === "highest") return b.price - a.price;
        if (sort === "lowest") return a.price - b.price;
        if (sort === "mileage") return a.mileage - b.mileage;
        return b.year - a.year;
      });
  }, [query, brand, bodyType, status, transmission, fuelType, featured, sort]);

  const reset = () => {
    setQuery("");
    setBrand("");
    setBodyType("");
    setStatus("");
    setTransmission("");
    setFuelType("");
    setFeatured(false);
    setSort("newest");
  };

  return (
    <div className="container-pad grid gap-6 py-10 lg:grid-cols-[310px_1fr]">
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="rounded-panel border border-ink/10 bg-white p-5 shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="flex items-center gap-2 font-black"><SlidersHorizontal size={18} /> Filter</h2>
            <button onClick={reset} className="touch rounded-panel px-3 text-sm font-bold text-redbrand"><RotateCcw size={15} className="inline" /> Reset</button>
          </div>
          <div className="mt-5 grid gap-3">
            <input value={query} onChange={(e) => setQuery(e.target.value)} className="field rounded-panel" placeholder="Cari nama, model, varian" />
            <select value={brand} onChange={(e) => setBrand(e.target.value)} className="field rounded-panel"><option value="">Semua brand</option>{brands.map((item) => <option key={item}>{item}</option>)}</select>
            <input className="field rounded-panel" placeholder="Model" />
            <select value={bodyType} onChange={(e) => setBodyType(e.target.value)} className="field rounded-panel"><option value="">Semua kategori</option>{bodyTypes.map((item) => <option key={item}>{item}</option>)}</select>
            <select className="field rounded-panel"><option>Semua tahun</option><option>2022 ke atas</option><option>2020 ke atas</option></select>
            <select className="field rounded-panel"><option>Semua harga</option><option>&lt; Rp 250 Juta</option><option>Rp 250-500 Juta</option><option>&gt; Rp 500 Juta</option></select>
            <select value={transmission} onChange={(e) => setTransmission(e.target.value)} className="field rounded-panel"><option value="">Semua transmisi</option><option>AT</option><option>CVT</option><option>MT</option></select>
            <select value={fuelType} onChange={(e) => setFuelType(e.target.value)} className="field rounded-panel"><option value="">Semua bahan bakar</option><option>Bensin</option><option>Diesel</option><option>Hybrid</option></select>
            <select className="field rounded-panel"><option>Semua kilometer</option><option>&lt; 30.000 km</option><option>&lt; 50.000 km</option></select>
            <select value={status} onChange={(e) => setStatus(e.target.value)} className="field rounded-panel"><option value="">Semua status</option><option>Available</option><option>Booked</option><option>Sold</option></select>
            <label className="flex min-h-11 items-center gap-3 rounded-panel border border-ink/10 px-3 text-sm font-bold">
              <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} /> Featured cars
            </label>
          </div>
        </div>
      </aside>
      <section>
        <div className="mb-5 flex flex-col justify-between gap-3 rounded-panel border border-ink/10 bg-white p-4 shadow-soft sm:flex-row sm:items-center">
          <p className="font-bold">{filtered.length} unit ditemukan</p>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="field rounded-panel sm:w-60">
            <option value="newest">Terbaru</option>
            <option value="highest">Harga tertinggi</option>
            <option value="lowest">Harga terendah</option>
            <option value="mileage">Kilometer terendah</option>
          </select>
        </div>
        {filtered.length ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((car) => <CarCard key={car.id} car={car} />)}
          </div>
        ) : (
          <div className="grid min-h-[360px] place-items-center rounded-panel border border-dashed border-ink/20 bg-white p-8 text-center">
            <div><h3 className="text-2xl font-black">Belum ada unit yang cocok</h3><p className="mt-2 text-coal/62">Coba ubah filter atau hubungi tim kami untuk rekomendasi personal.</p></div>
          </div>
        )}
      </section>
    </div>
  );
}
