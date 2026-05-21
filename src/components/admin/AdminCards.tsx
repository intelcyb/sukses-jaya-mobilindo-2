export function StatCard({ label, value, note }: { label: string; value: string; note?: string }) {
  return (
    <div className="rounded-panel border border-ink/10 bg-white p-5 shadow-soft">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-coal/45">{label}</p>
      <p className="mt-3 text-3xl font-black">{value}</p>
      {note && <p className="mt-2 text-sm text-coal/58">{note}</p>}
    </div>
  );
}

export function AdminTitle({ title, body }: { title: string; body: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-black md:text-5xl">{title}</h1>
      <p className="mt-2 max-w-2xl text-coal/62">{body}</p>
    </div>
  );
}
