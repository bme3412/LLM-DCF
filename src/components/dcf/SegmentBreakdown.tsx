import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Segment } from "@/types";
import { formatCurrency } from "@/lib/utils/formatters";
import {
  Minus,
  Plus,
  Activity,
  ChevronDown,
  ChevronRight,
  RefreshCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedNumber } from "@/components/ui/animated-number";
import { cn } from "@/lib/utils";
import { transcriptInsights } from "@/lib/data/transcripts/msft-transcript-data";
import { Slider } from "@/components/ui/slider";

interface Props {
  segments: Segment[];
  componentRates: { [key: string]: number };
  onRateChange: (componentName: string, newRate: number) => void;
  className?: string;
}

export function SegmentBreakdown({
  segments,
  componentRates,
  onRateChange,
  className,
}: Props) {
  const [open, setOpen] = useState(() =>
    Object.fromEntries(segments.map((s, idx) => [s.name, idx === 0]))
  );

  const handleAdjust = (name: string, currentRate: number, delta: number) => {
    const newRate = Math.round((currentRate + delta) * 1000) / 1000;
    onRateChange(name, newRate);
  };

  const applySegmentDelta = (segment: Segment, delta: number) => {
    segment.components.forEach((comp) => {
      const currentRate = componentRates[comp.name] ?? comp.growthRate;
      handleAdjust(comp.name, currentRate, delta);
    });
  };

  const resetSegment = (segment: Segment) => {
    segment.components.forEach((comp) => onRateChange(comp.name, comp.growthRate));
  };

  return (
    <div className={cn("grid gap-4", className || "grid-cols-1 lg:grid-cols-3")}>
      {segments.map((segment) => {
        const currentRev = segment.components.reduce((sum, c) => sum + c.revenue, 0);
        const projectedRev = segment.components.reduce((sum, c) => {
          const rate = componentRates[c.name] ?? c.growthRate;
          return sum + c.revenue * (1 + rate);
        }, 0);
        const impliedGrowth = (projectedRev - currentRev) / currentRev;
        const segmentInsightBlocks = transcriptInsights.filter(
          (insight) => insight.segment === segment.name
        );

        return (
          <div
            key={segment.name}
            className="glass-panel p-4 flex flex-col relative overflow-hidden group"
          >
            {/* Decorative background */}
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Activity className="w-20 h-20" />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={() =>
                    setOpen((prev) => ({ ...prev, [segment.name]: !prev[segment.name] }))
                  }
                  className="flex items-center gap-2 text-left flex-1"
                >
                  {open[segment.name] ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                      {segment.percentOfTotal}% of rev
                    </p>
                    <h3 className="text-lg font-serif">{segment.name}</h3>
                  </div>
                </button>
                <Badge variant="secondary" className="rounded-full px-2 py-1">
                  FY25 {formatCurrency(segment.fy2025Revenue)}
                </Badge>
              </div>

              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-muted-foreground uppercase tracking-widest">
                  Implied CAGR
                </span>
                <span
                  className={cn(
                    "text-xl font-mono font-semibold",
                    impliedGrowth >= 0 ? "text-profit" : "text-loss"
                  )}
                >
                  {impliedGrowth > 0 ? "+" : ""}
                  <AnimatedNumber
                    value={impliedGrowth * 100}
                    formatter={(v) => `${v.toFixed(1)}%`}
                    highlightColor={impliedGrowth >= 0 ? "text-profit" : "text-loss"}
                  />
                </span>
              </div>

              <div className="flex items-center justify-between mt-3 gap-2 text-xs">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 px-2 text-xs"
                    onClick={() => applySegmentDelta(segment, 0.01)}
                  >
                    +100 bps
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-7 px-2 text-xs"
                    onClick={() => applySegmentDelta(segment, -0.01)}
                  >
                    -100 bps
                  </Button>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 text-xs text-muted-foreground"
                  onClick={() => resetSegment(segment)}
                >
                  <RefreshCcw className="h-3 w-3 mr-1" />
                  Reset
                </Button>
              </div>
              <div className="mt-2 text-xs text-muted-foreground">
                Adjust each component below to flex the segment outlook.
              </div>
            </div>

            {open[segment.name] && (
              <div className="relative z-10 mt-4 space-y-5">
                <div className="text-[10px] uppercase tracking-[0.4em] text-muted-foreground font-semibold">
                  Components
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {segment.components.map((comp) => {
                    const rate = componentRates[comp.name] ?? comp.growthRate;
                    const componentInsight = segmentInsightBlocks.find(
                      (insight) => insight.component === comp.name
                    );

                    return (
                      <div
                        key={comp.name}
                        className="rounded-xl border border-border/80 bg-white/80 p-4 shadow-sm transition hover:shadow-md"
                      >
                        <div className="flex items-start justify-between text-xs text-muted-foreground mb-2">
                          <div>
                            <p className="text-sm font-semibold text-foreground">{comp.name}</p>
                            <p>FY25 revenue {formatCurrency(comp.revenue)}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-base font-mono text-foreground">
                              {(rate * 100).toFixed(1)}%
                            </p>
                            <p className="text-[10px] uppercase tracking-[0.3em]">
                              {rate === comp.growthRate
                                ? "Base"
                                : `${rate > comp.growthRate ? "+" : ""}${((rate - comp.growthRate) * 100).toFixed(
                                    1
                                  )} pts`}
                            </p>
                          </div>
                        </div>

                        <Slider
                          value={[rate * 100]}
                          min={-5}
                          max={50}
                          step={0.5}
                          onValueChange={(vals) => onRateChange(comp.name, vals[0] / 100)}
                          className="my-3"
                        />

                        <div className="flex items-center justify-between gap-2 text-xs">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 px-2 text-xs"
                            onClick={() => handleAdjust(comp.name, rate, -0.01)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 px-2 text-xs"
                            onClick={() => handleAdjust(comp.name, rate, 0.01)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-xs text-muted-foreground"
                            onClick={() => onRateChange(comp.name, comp.growthRate)}
                          >
                            Reset
                          </Button>
                        </div>

                        {componentInsight && (
                          <div className="mt-3 rounded-lg bg-slate-50/90 p-2 text-[11px] leading-relaxed text-slate-600">
                            <p>
                              {componentInsight.summary.length > 160
                                ? `${componentInsight.summary.slice(0, 160)}…`
                                : componentInsight.summary}
                            </p>
                            {componentInsight.metrics[0] && (
                              <div className="mt-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                                <span>{componentInsight.metrics[0].label}</span>
                                <span className="font-mono text-xs text-foreground">
                                  {componentInsight.metrics[0].value}
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}

    </div>
  );
}
