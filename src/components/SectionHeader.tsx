export function SectionHeader({
  eyebrow,
  title,
  body
}: {
  eyebrow?: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="mx-auto mb-9 max-w-3xl text-center">
      {eyebrow && <p className="text-xs font-black uppercase tracking-[0.2em] text-redbrand">{eyebrow}</p>}
      <h2 className="mt-3 text-3xl font-black leading-tight text-ink md:text-5xl">{title}</h2>
      {body && <p className="mt-4 text-base leading-7 text-coal/68">{body}</p>}
    </div>
  );
}
