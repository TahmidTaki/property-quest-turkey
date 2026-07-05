import { investorStats } from "@/lib/content/investorGuide";

export function HeroStats() {
  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {investorStats.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur"
        >
          <div className="text-3xl font-bold text-gold">
            {item.value}
          </div>

          <div className="mt-2 text-sm font-semibold text-white">
            {item.label}
          </div>

          <p className="mt-2 text-xs leading-6 text-white/70">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}