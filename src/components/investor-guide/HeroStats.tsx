import { investorStats } from "@/lib/content/investorGuide";

export function HeroStats() {
  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {investorStats.map((item) => (
        <div
          key={item.label}
          className="
            rounded-2xl
            border border-line
            bg-gradient-to-b from-white to-slate-50
            p-6
            text-center
            shadow-xl
            backdrop-blur
            dark:border-white/10
            dark:from-white/10
            dark:to-white/[0.03]
          "
        >
          <div className="text-3xl font-bold text-gold">
            {item.value}
          </div>

          <div className="mt-2 text-sm font-semibold text-ink dark:text-white">
            {item.label}
          </div>

          <p className="mt-2 text-xs leading-6 text-slate-600 dark:text-white/70">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
}