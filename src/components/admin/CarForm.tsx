import Image from "next/image";
import { cars } from "@/lib/cars";

const fields = [
  "Car name", "Brand", "Model", "Variant", "Category/body type", "Year", "Price", "Mileage", "Transmission", "Fuel type", "Color", "Plate area", "Tax status", "Ownership/document status", "WhatsApp number"
];

export function CarForm({ mode = "add" }: { mode?: "add" | "edit" }) {
  const car = cars[0];
  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <div className="rounded-panel border border-ink/10 bg-white p-6 shadow-soft">
        <h2 className="text-2xl font-black">{mode === "edit" ? "Edit data mobil" : "Tambah data mobil"}</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {fields.map((field) => <input key={field} className="field rounded-panel" placeholder={field} defaultValue={mode === "edit" && field === "Car name" ? car.name : ""} />)}
        </div>
        <textarea className="field mt-4 min-h-32 rounded-panel" placeholder="Description" defaultValue={mode === "edit" ? car.description : ""} />
        <textarea className="field mt-4 min-h-24 rounded-panel" placeholder="Highlight points" />
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          <select className="field rounded-panel"><option>Status: Available</option><option>Booked</option><option>Sold</option><option>Draft</option></select>
          <label className="flex min-h-11 items-center gap-3 rounded-panel border border-ink/10 px-3 font-bold"><input type="checkbox" defaultChecked={mode === "edit"} /> Is featured</label>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <button className="touch rounded-panel border border-ink/15 px-5 py-3 font-bold">Save as draft</button>
          <button className="touch rounded-panel bg-redbrand px-5 py-3 font-bold text-white">Publish car</button>
          {mode === "edit" && <button className="touch rounded-panel bg-ink px-5 py-3 font-bold text-white">Preview public page</button>}
        </div>
      </div>
      <aside className="rounded-panel border border-ink/10 bg-white p-6 shadow-soft">
        <h2 className="text-xl font-black">Image Management</h2>
        <div className="mt-4 grid gap-3">
          <div className="grid min-h-36 place-items-center rounded-panel border border-dashed border-ink/20 bg-pearl text-center text-sm font-bold text-coal/60">Upload multiple images UI</div>
          {(mode === "edit" ? car.images : car.images.slice(0, 4)).map((image, index) => (
            <div key={`${image.url}-${index}`} className="rounded-panel border border-ink/10 p-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-panel">
                <Image src={image.url} alt={image.alt} fill sizes="320px" className="object-cover" />
              </div>
              <div className="mt-3 grid gap-2">
                <select className="field rounded-panel"><option>{image.category}</option><option>Exterior</option><option>Interior</option><option>Dashboard</option><option>Engine</option><option>Seats</option><option>Trunk</option><option>Document</option></select>
                <input className="field rounded-panel" defaultValue={image.alt} placeholder="Image alt text" />
                <div className="flex gap-2">
                  <button className="touch flex-1 rounded-panel border border-ink/10 text-sm font-bold">Set featured</button>
                  <button className="touch flex-1 rounded-panel border border-ink/10 text-sm font-bold">Reorder</button>
                  <button className="touch flex-1 rounded-panel border border-redbrand/30 text-sm font-bold text-redbrand">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
