/**
 * Dependency-free SVG charts. Pure server components — no client JS.
 */

/** Smooth area chart from a series of numeric values. */
export function AreaChart({
  values,
  labels,
  height = 160,
  stroke = "#013684",
  fill = "rgba(1,54,132,0.10)",
}: {
  values: number[];
  labels: string[];
  height?: number;
  stroke?: string;
  fill?: string;
}) {
  const width = 560;
  const pad = 8;
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const stepX = (width - pad * 2) / (values.length - 1);

  const pts = values.map((v, i) => {
    const x = pad + i * stepX;
    const y = pad + (1 - (v - min) / range) * (height - pad * 2);
    return [x, y] as const;
  });

  const line = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ");
  const area = `${line} L${pts[pts.length - 1][0]},${height} L${pts[0][0]},${height} Z`;

  return (
    <div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        preserveAspectRatio="none"
        role="img"
        aria-label="Portfolio value trend"
      >
        <path d={area} fill={fill} />
        <path d={line} fill="none" stroke={stroke} strokeWidth={2.5} />
        {pts.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={3} fill={stroke} />
        ))}
      </svg>
      <div className="mt-1 flex justify-between text-[11px] text-muted">
        {labels.map((l) => (
          <span key={l}>{l}</span>
        ))}
      </div>
    </div>
  );
}

/** Vertical bar chart (CSS heights). */
export function BarChart({
  data,
  format,
}: {
  data: { label: string; value: number }[];
  format: (n: number) => string;
}) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="flex h-44 items-end gap-2">
      {data.map((d) => (
        <div key={d.label} className="flex flex-1 flex-col items-center gap-1">
          <span className="tabular text-[11px] font-semibold text-ink/70">
            {format(d.value)}
          </span>
          <div
            className="w-full rounded-t bg-gradient-to-t from-navy to-[#0066a6]"
            style={{ height: `${Math.max(6, (d.value / max) * 100)}%` }}
          />
          <span className="text-[11px] text-muted">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

/** Donut chart from segments. */
export function Donut({
  segments,
}: {
  segments: { label: string; value: number; color: string }[];
}) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  const r = 60;
  const c = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div className="flex items-center gap-6">
      <svg viewBox="0 0 160 160" className="h-40 w-40 -rotate-90">
        {segments.map((s) => {
          const frac = s.value / total;
          const dash = frac * c;
          const seg = (
            <circle
              key={s.label}
              cx={80}
              cy={80}
              r={r}
              fill="none"
              stroke={s.color}
              strokeWidth={20}
              strokeDasharray={`${dash} ${c - dash}`}
              strokeDashoffset={-offset}
            />
          );
          offset += dash;
          return seg;
        })}
      </svg>
      <ul className="space-y-2 text-sm">
        {segments.map((s) => (
          <li key={s.label} className="flex items-center gap-2">
            <span
              className="inline-block h-3 w-3 rounded-sm"
              style={{ background: s.color }}
            />
            <span className="text-ink/80">{s.label}</span>
            <span className="tabular ml-1 font-semibold text-ink">
              {Math.round((s.value / total) * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
