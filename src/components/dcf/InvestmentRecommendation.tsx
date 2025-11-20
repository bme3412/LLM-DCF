import { Recommendation } from "@/types";
import { cn } from "@/lib/utils";
import {
  CheckCircle2,
  XCircle,
  Target,
  TrendingUp,
  ArrowRightLeft,
  Info,
} from "lucide-react";
import { ReactNode } from "react";

interface Props {
  rec: Recommendation;
  currentPrice: number;
}

const ratingPalette: Record<
  Recommendation["rating"],
  { bg: string; text: string; label: string }
> = {
  BUY: {
    bg: "bg-profit/15 border-profit/30 text-profit",
    text: "text-profit",
    label: "BUY",
  },
  OUTPERFORM: {
    bg: "bg-emerald-100 border-emerald-200 text-emerald-700",
    text: "text-emerald-700",
    label: "OUTPERFORM",
  },
  HOLD: {
    bg: "bg-blue-100 border-blue-200 text-blue-600",
    text: "text-blue-600",
    label: "HOLD",
  },
  SELL: {
    bg: "bg-loss/15 border-loss/30 text-loss",
    text: "text-loss",
    label: "SELL",
  },
};

export function InvestmentRecommendation({ rec, currentPrice }: Props) {
  const palette = ratingPalette[rec.rating];
  const entryLow = rec.suggestedEntry[0];
  const entryHigh = rec.suggestedEntry[1];
  const entryLowDiff = ((entryLow / currentPrice) - 1) * 100;
  const entryHighDiff = ((entryHigh / currentPrice) - 1) * 100;

  return (
    <div className="glass-panel h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-6 border-b border-border/80 bg-white/60">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Investment Recommendation
          </p>
          <h3 className="text-2xl font-serif">Thesis & risk assessment</h3>
        </div>
        <div
          className={cn(
            "inline-flex items-center gap-3 px-5 py-2 rounded-full border font-semibold text-sm tracking-wide shadow-sm",
            palette.bg
          )}
        >
          <span className="text-xs uppercase text-muted-foreground">
            Rating
          </span>
          <span className="text-base">{palette.label}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 border-b border-border/80">
        {/* Metric blocks */}
        <MetricBlock
          icon={<Target className="h-4 w-4" />}
          label="Target Price"
          value={`$${rec.targetPrice}`}
          sub="12-month price objective"
        />
        <MetricBlock
          icon={<TrendingUp className="h-4 w-4" />}
          label="Upside vs Market"
          value={`${rec.upside > 0 ? "+" : ""}${(rec.upside * 100).toFixed(
            1
          )}%`}
          valueClass={rec.upside > 0 ? "text-profit" : "text-loss"}
          sub={`Current price $${currentPrice}`}
        />
        <MetricBlock
          icon={<ArrowRightLeft className="h-4 w-4" />}
          label="Suggested Entry"
          value={`$${entryLow} – $${entryHigh}`}
          sub={`Represents ${entryLowDiff.toFixed(0)}% to ${entryHighDiff.toFixed(
            0
          )}% vs current price`}
        />
      </div>

      {/* Thesis */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
        <CatalystList
          title="Bull Case Catalysts"
          color="text-profit"
          bullets={rec.catalysts.positive}
          icon={<CheckCircle2 className="h-4 w-4" />}
        />
        <CatalystList
          title="Bear Risks"
          color="text-loss"
          bullets={rec.catalysts.negative}
          icon={<XCircle className="h-4 w-4" />}
        />
      </div>

      <div className="p-4 border-t border-border/70 bg-blue-50/70 flex gap-3 text-xs text-slate-600">
        <Info className="h-4 w-4 text-blue-500 flex-shrink-0" />
        <p className="leading-relaxed">
          This automated valuation is for informational purposes only and does
          not constitute financial advice. Outputs depend on user-defined
          assumptions and may differ materially from future market performance.
        </p>
      </div>
    </div>
  );
}

function MetricBlock({
  icon,
  label,
  value,
  sub,
  valueClass,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  sub?: string;
  valueClass?: string;
}) {
  return (
    <div className="p-4 border-b border-border/30 lg:border-b-0 lg:border-r last:border-r-0 bg-white/60">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-semibold">
          {icon}
          {label}
        </div>
        <span className={cn("text-2xl font-mono font-semibold", valueClass)}>
          {value}
        </span>
      </div>
      {sub && (
        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{sub}</p>
      )}
    </div>
  );
}

function CatalystList({
  title,
  color,
  bullets,
  icon,
}: {
  title: string;
  color: string;
  bullets: string[];
  icon: ReactNode;
}) {
  return (
    <div className="space-y-4">
      <div
        className={cn(
          "flex items-center gap-2 border-b pb-3 font-serif text-lg",
          color
        )}
      >
        {icon}
        {title}
      </div>
      <ul className="space-y-3">
        {bullets.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 text-sm text-slate-600 leading-relaxed"
          >
            <span
              className={cn(
                "mt-2 h-1.5 w-1.5 rounded-full flex-shrink-0",
                color === "text-profit"
                  ? "bg-profit/50"
                  : color === "text-loss"
                  ? "bg-loss/50"
                  : "bg-slate-300"
              )}
            />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
