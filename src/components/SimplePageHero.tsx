export function SimplePageHero({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <section className="bg-ink py-16 text-white">
      <div className="container-pad">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-gold">{eyebrow}</p>
        <h1 className="page-title mt-4 max-w-4xl font-black">{title}</h1>
        <p className="mt-5 max-w-2xl leading-7 text-white/68">{body}</p>
      </div>
    </section>
  );
}
