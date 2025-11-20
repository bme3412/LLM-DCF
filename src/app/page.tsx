'use client';

import { useState, useEffect } from 'react';
import { SegmentBreakdown } from '@/components/dcf/SegmentBreakdown';
import { RevenueProjections } from '@/components/dcf/RevenueProjections';
import { DCFCalculator } from '@/components/dcf/DCFCalculator';
import { SensitivityAnalysis } from '@/components/dcf/SensitivityAnalysis';
import { InvestmentRecommendation } from '@/components/dcf/InvestmentRecommendation';

import { segments, baseCaseDCF, marketData, recommendation } from '@/lib/data/msft-data';
import { transcriptInsights } from '@/lib/data/transcripts/msft-transcript-data';
import { DCFModel } from '@/types';
import { motion } from 'framer-motion';
import { recalculateDCFModel } from '@/lib/utils/dcf-calculations';
import { AnimatedNumber } from '@/components/ui/animated-number';

export default function Dashboard() {
  // Initial growth rates map (empty by default, uses base rates from data)
  const [componentRates, setComponentRates] = useState<{ [key: string]: number }>({});
  const [wacc, setWacc] = useState<number>(baseCaseDCF.wacc);
  const [terminalGrowth, setTerminalGrowth] = useState<number>(baseCaseDCF.terminalGrowth);

  const [activeModel, setActiveModel] = useState<DCFModel>(baseCaseDCF);
  const [anthropicSummary, setAnthropicSummary] = useState<string>(
    "Generating updated DCF summary..."
  );
  const [summaryLoading, setSummaryLoading] = useState(false);

  const componentInsightsMap = transcriptInsights.reduce<Record<string, string>>(
    (map, insight) => {
      map[insight.component] = insight.summary;
      return map;
    },
    {}
  );

  const flexHighlights = segments
    .flatMap((segment) =>
      segment.components.map((comp) => {
        const currentRate = componentRates[comp.name] ?? comp.growthRate;
        const delta = currentRate - comp.growthRate;
        return {
          segment: segment.name,
          component: comp.name,
          base: comp.growthRate,
          rate: currentRate,
          delta,
          summary: componentInsightsMap[comp.name],
        };
      })
    )
    .filter((item) => Math.abs(item.delta) >= 0.002)
    .sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta))
    .slice(0, 4);

  // Recalculate model whenever growth rates OR discount rates change
  useEffect(() => {
    const newModel = recalculateDCFModel(
      segments, 
      componentRates, 
      wacc, 
      terminalGrowth, 
      baseCaseDCF
    );
    setActiveModel(newModel);
  }, [componentRates, wacc, terminalGrowth]);

  const handleRateChange = (componentName: string, newRate: number) => {
    setComponentRates(prev => ({
      ...prev,
      [componentName]: newRate
    }));
  };

  useEffect(() => {
    const controller = new AbortController();
    async function fetchSummary() {
      setSummaryLoading(true);
      try {
        const segmentSnapshots = segments.map((segment) => {
          const fy25Revenue = segment.components.reduce(
            (sum, comp) => sum + comp.revenue,
            0
          );
          const components = segment.components.map((comp) => {
            const appliedGrowth = componentRates[comp.name] ?? comp.growthRate;
            const deltaFromBase = appliedGrowth - comp.growthRate;
            return {
              name: comp.name,
              baseRevenue: comp.revenue,
              baseGrowth: comp.growthRate,
              appliedGrowth,
              deltaFromBase,
              transcriptSummary: componentInsightsMap[comp.name] ?? "",
            };
          });
          const projected = components.reduce(
            (sum, comp) => sum + comp.baseRevenue * (1 + comp.appliedGrowth),
            0
          );
          const impliedGrowth =
            fy25Revenue > 0 ? (projected - fy25Revenue) / fy25Revenue : 0;
          return {
            name: segment.name,
            percentOfTotal: segment.percentOfTotal,
            fy25Revenue,
            impliedGrowth,
            components,
          };
        });

        const driverHighlights = segmentSnapshots
          .flatMap((segment) =>
            segment.components.map((comp) => ({
              segment: segment.name,
              component: comp.name,
              baseRevenue: comp.baseRevenue,
              appliedGrowth: comp.appliedGrowth,
              deltaFromBase: comp.deltaFromBase,
              revenueContribution: comp.baseRevenue * (1 + comp.appliedGrowth),
              transcriptSummary: comp.transcriptSummary,
            }))
          )
          .sort((a, b) => b.revenueContribution - a.revenueContribution)
          .slice(0, 5);

        setAnthropicSummary("");
        const res = await fetch("/api/anthropic-summary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fairValue: activeModel.fairValuePerShare,
            currentPrice: marketData.currentPrice,
            enterpriseValue: activeModel.enterpriseValue,
            wacc,
            terminalGrowth,
            segmentSnapshots,
            driverHighlights,
          }),
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Failed to fetch summary");

        if (!res.body) {
          throw new Error("Empty response body");
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let aggregate = "";

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          aggregate += chunk;
          setAnthropicSummary(aggregate);
        }

        aggregate += decoder.decode();

        if (!aggregate) {
          setAnthropicSummary("No commentary returned from AI service.");
        }
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setAnthropicSummary(
            "Unable to refresh summary. Please adjust an assumption to retry."
          );
        }
      } finally {
        setSummaryLoading(false);
      }
    }
    fetchSummary();
    return () => controller.abort();
  }, [
    activeModel.fairValuePerShare,
    activeModel.enterpriseValue,
    componentRates,
    wacc,
    terminalGrowth,
  ]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col h-screen overflow-hidden">
      {/* Sticky Header */}
      <header className="flex-none z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
             <div className="h-6 w-6 bg-primary rounded-sm grid place-items-center text-primary-foreground font-bold text-xs">M</div>
             <span className="font-semibold tracking-tight text-sm">MSFT<span className="text-muted-foreground ml-1 font-normal">/ DCF Model v1.0</span></span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex flex-col items-end leading-none">
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Fair Value</span>
              <span className="font-mono font-bold text-primary text-lg">
                $<AnimatedNumber value={activeModel.fairValuePerShare} highlightColor="text-primary" />
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Two-Column Layout */}
      <main className="flex-1 container mx-auto px-4 py-6 grid grid-cols-1 xl:grid-cols-12 gap-6 min-h-0">
        
        {/* Left Panel: Inputs (Scrollable) */}
        <div className="xl:col-span-4 flex flex-col gap-6 overflow-y-auto pr-2 pb-20 custom-scrollbar">
            <div className="flex items-baseline justify-between border-b border-border pb-4 sticky top-0 bg-background z-10 pt-2">
                <div>
                    <h2 className="text-2xl font-serif font-light">Assumptions</h2>
                    <p className="text-sm text-muted-foreground">Adjust component growth drivers</p>
                </div>
            </div>
            
            <SegmentBreakdown 
                segments={segments} 
                componentRates={componentRates} 
                onRateChange={handleRateChange}
                className="grid-cols-1" 
            />
        </div>

        {/* Right Panel: Outputs (Scrollable) */}
        <div className="xl:col-span-8 flex flex-col gap-8 overflow-y-auto pb-20 custom-scrollbar">
             <div className="flex flex-col gap-4 border-b border-border pb-4 sticky top-0 bg-background z-10 pt-2">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Valuation Model</p>
                        <h2 className="text-3xl font-serif font-light">Microsoft Corporation (MSFT)</h2>
                        <p className="text-sm text-muted-foreground">Real-time financial projections and AI-written summary</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs text-muted-foreground uppercase tracking-widest">Enterprise Value</p>
                        <p className="text-xl font-mono font-light">
                            $<AnimatedNumber value={activeModel.enterpriseValue / 1000} formatter={(v) => v.toFixed(2)} highlightColor="text-foreground" />T
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                            Fair Value ${activeModel.fairValuePerShare} | Upside {( (activeModel.fairValuePerShare / marketData.currentPrice -1)*100).toFixed(1)}%
                        </p>
                    </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                    {summaryLoading ? "Refreshing AI summary..." : anthropicSummary}
                </p>
                {flexHighlights.length > 0 && (
                  <div className="mt-3 border-t border-border/70 pt-3">
                    <p className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
                      Key flexed drivers
                    </p>
                    <div className="mt-2 flex flex-wrap gap-3">
                      {flexHighlights.map((item) => (
                        <div
                          key={`${item.component}-${item.segment}`}
                          className="rounded-xl border border-border/70 bg-white/60 px-3 py-2 text-xs text-slate-700 shadow-sm"
                        >
                          <p className="font-semibold text-foreground">
                            {item.component} ({item.segment})
                          </p>
                          <p className="font-mono text-sm text-primary">
                            {(item.rate * 100).toFixed(1)}% ({item.delta > 0 ? "+" : ""}{(item.delta * 100).toFixed(1)} pts)
                          </p>
                          {item.summary && (
                            <p className="mt-1 text-[11px] text-muted-foreground leading-snug">
                              {item.summary.length > 120
                                ? `${item.summary.slice(0, 120)}…`
                                : item.summary}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
            </div>

            <div className="space-y-8">
                <DCFCalculator 
                    model={activeModel} 
                    wacc={wacc}
                    terminalGrowth={terminalGrowth}
                    onWaccChange={setWacc}
                    onTerminalGrowthChange={setTerminalGrowth}
                />
                
                <div className="space-y-6">
                  <RevenueProjections data={activeModel.projections} />
                  <div className="flex flex-col gap-6">
                    <SensitivityAnalysis model={activeModel} />
                    <InvestmentRecommendation
                      rec={recommendation}
                      currentPrice={marketData.currentPrice}
                    />
                  </div>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
