export function PageHero({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="bg-gradient-to-br from-navy to-ink px-5 py-16 text-center text-white sm:px-8 sm:py-20">
      <div className="container-x">
        {eyebrow && (
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-gold">
            {eyebrow}
          </p>
        )}
        <h1 className="mx-auto max-w-3xl text-4xl sm:text-5xl">{title}</h1>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-white/80">{subtitle}</p>
        )}
      </div>
    </section>
  );
}
