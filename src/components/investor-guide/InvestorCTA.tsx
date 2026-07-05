import Link from "next/link";

export function InvestorCTA() {
  return (
    <section className="bg-gradient-to-br from-navy to-ink py-24 text-white">
      <div className="container-x text-center">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-gold">
          Start Your Investment Journey
        </p>

        <h2 className="mx-auto max-w-3xl text-4xl">
          Find the right property and secure your future in Turkey
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-white/75">
          From first consultation to title deed transfer,
          citizenship applications, and long-term property
          management — Property Quest Turkey supports every step.
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/contact"
            className="btn btn-gold"
          >
            Free Consultation
          </Link>

          <Link
            href="/projects"
            className="btn border border-white/20 bg-white/5 text-white hover:bg-white/10"
          >
            Browse Properties
          </Link>

          <Link
            href="/citizenship"
            className="btn border border-gold text-gold hover:bg-gold hover:text-navy"
          >
            Citizenship Program
          </Link>
        </div>
      </div>
    </section>
  );
}